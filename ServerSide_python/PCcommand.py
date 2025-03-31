import socket
import requests
import io
import socketio
from PIL import Image
from gradio_client import Client, handle_file
import time
import os
import urllib3
import json

# 关闭 SSL 证书警告（仅用于测试）
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# ========== 服务器信息 ==========
ESP32_IP = "172.20.10.3"
ESP32_PORT = 333
FLASK_SOCKET_URL = "http://172.20.10.2:8081"  # WebSocket 服务器地址
BACKEND_SENDRESULT_URL = "https://esp32cam-tony.ngrok.io/esp32/receive-ESP32CAM"

# ========== 图片保存路径 ==========
SAVE_PATH = "D:/ESP32_Images"
os.makedirs(SAVE_PATH, exist_ok=True)

# ========== 连接 Flask-SocketIO ==========
sio = socketio.Client()

@sio.event
def connect():
    print("🔗 WebSocket 连接成功，等待指令...")

@sio.event
def disconnect():
    print("🔌 WebSocket 断开，正在尝试重连...")
    time.sleep(5)
    sio.connect(FLASK_SOCKET_URL)

@sio.on("command")
def on_command(data):
    """ 处理 WebSocket 指令 """
    print(f"🔹 收到 WebSocket 指令: {data}")

    try:
        if isinstance(data, bytes):
            data = data.decode("utf-8")  # 🔹 确保数据是字符串
            print(f"🔹 WebSocket 收到原始消息: {data}")  # 调试信息

        if isinstance(data, str):
            try:
                data = json.loads(data)  # 只有字符串需要 JSON 解析
            except json.JSONDecodeError:
                print(f"⚠️ 无法解析 JSON，原始数据: {data}")
                return

        if isinstance(data, dict):  # 直接是字典，不需要解析
            if "command" in data and data["command"] == "true":
                print("✅ 收到拍照指令，执行拍照流程...")
                image_path = capture_image()
                if image_path:
                    cropped_path = crop_image(image_path)
                    ocr_result = ocr_recognition(cropped_path) if cropped_path else "OCR 识别失败"
                    send_ocr_result(ocr_result)
                print("✅ 拍照完成，等待下一个指令...")

        if "command" in data and data["command"] == "true":
            print("✅ 收到拍照指令，执行拍照流程...")
            image_path = capture_image()
            if image_path:
                cropped_path = crop_image(image_path)
                ocr_result = ocr_recognition(cropped_path) if cropped_path else "OCR 识别失败"
                send_ocr_result(ocr_result)
            print("✅ 拍照完成，等待下一个指令...")

    except json.JSONDecodeError as e:
        print(f"❌ JSON 解析失败: {e}, 数据: {repr(data)}")
    except Exception as e:
        print(f"❌ 处理 WebSocket 消息时出错: {e}, 数据: {repr(data)}")


# ===================== ESP32 连接 =====================
def connect_esp32():
    """ 连接 ESP32 TCP 服务器 """
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(10)
        sock.connect((ESP32_IP, ESP32_PORT))
        print(f"✅ 成功连接 ESP32 {ESP32_IP}:{ESP32_PORT}")
        return sock
    except Exception as e:
        print(f"❌ 连接 ESP32 失败: {e}")
        return None


# ===================== 发送 OCR 结果 =====================
def send_ocr_result(text):
    """ 发送 OCR 识别结果到后端 """
    headers = {"Content-Type": "text/plain"}
    try:
        response = requests.post(BACKEND_SENDRESULT_URL, data=text, headers=headers, timeout=5, verify=False)
        if response.status_code == 200:
            print("✅ 文字数据已成功发送到后端:", text)
        else:
            print(f"❌ 发送失败，状态码: {response.status_code}, 响应内容: {response.text}")
    except Exception as e:
        print(f"❌ 发送到后端时出错: {e}")


# ===================== 图像处理 & OCR =====================
def capture_image():
    """ 触发 ESP32 拍照并保存图像 """
    sock = connect_esp32()
    if not sock:
        return None

    try:
        sock.sendall(b"capture\n")
        header = sock.recv(32).decode().strip()
        if not header.startswith("IMAGE_LENGTH:"):
            return None

        img_length = int(header.split(":")[1])
        image_data = bytearray()
        while len(image_data) < img_length:
            chunk = sock.recv(img_length - len(image_data))
            if not chunk:
                print("❌ 图片数据接收失败")
                return None
            image_data.extend(chunk)

        timestamp = int(time.time())
        image_path = os.path.join(SAVE_PATH, f"captured_{timestamp}.jpg")

        try:
            Image.open(io.BytesIO(image_data)).save(image_path, "JPEG")
            print(f"📸 图像已保存: {image_path}")
            return image_path
        except Exception as e:
            print(f"❌ 保存图像失败: {e}")
            return None
    finally:
        sock.close()


def crop_image(image_path, crop_box=(100, 0, 220, 240)):
    """ 裁剪图像并保存 """
    try:
        image = Image.open(image_path)
        cropped_image = image.crop(crop_box)
        cropped_path = image_path.replace(".jpg", "_cropped.jpg")
        cropped_image.save(cropped_path)

        print(f"✅ 裁剪成功，图片已保存: {cropped_path}")
        return cropped_path
    except Exception as e:
        print(f"❌ 裁剪图像失败: {e}")
        return None


def ocr_recognition(image_path):
    """ 调用 Hugging Face PARSeq-OCR 识别文字 """
    try:
        client = Client("baudm/PARSeq-OCR")
        result = client.predict(model_name="parseq", image=handle_file(image_path), api_name="/App")
        return result[0] if result else "OCR 识别失败"
    except Exception as e:
        print(f"❌ OCR 识别失败: {e}")
        return "OCR 识别失败"


# ===================== 主要逻辑 =====================
def main():
    """ 连接 WebSocket 并监听指令 """
    try:
        sio.connect(FLASK_SOCKET_URL)
        sio.wait()
    except Exception as e:
        print(f"❌ 连接 WebSocket 失败: {e}")
        time.sleep(5)
        main()  # 失败后自动重连


if __name__ == "__main__":
    main()
