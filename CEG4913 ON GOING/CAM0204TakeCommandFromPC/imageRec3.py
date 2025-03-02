import socket
import time
import os
import io
from PIL import Image
import requests
from gradio_client import Client, handle_file


def crop_image(image_data, crop_box):
    """
    使用 Pillow 对图像进行裁剪
    :param image_data: 原始图像的二进制数据
    :param crop_box: 裁剪框 (left, upper, right, lower)
    :return: 裁剪后的图像对象
    """
    image = Image.open(io.BytesIO(image_data))
    print("Original image size:", image.size)
    cropped_image = image.crop(crop_box)
    print("Cropped image size:", cropped_image.size)
    return cropped_image


def interactive_client(esp_ip, esp_port):
    # 初始化 socket 并连接 ESP32
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        s.connect((esp_ip, esp_port))
        print("ESP32 connected successfully {}:{}".format(esp_ip, esp_port))
    except Exception as e:
        print("Fail to connect:", e)
        return

    while True:
        cmd = input("(1 take the shot, 0 disconnect): ").strip()
        if cmd not in ['1', '0']:
            print("Please enter 1 to take a shot or 0 to disconnect.")
            continue

        try:
            s.sendall(cmd.encode())
        except Exception as e:
            print("Send error:", e)
            break

        if cmd == '1':
            # 读取图片头部信息（例如 "IMAGE_LENGTH:12345\n"）
            header = b""
            while b'\n' not in header:
                try:
                    chunk = s.recv(1)
                except Exception as e:
                    print("Receive error:", e)
                    break
                if not chunk:
                    print("Connection closed while receiving header.")
                    return
                header += chunk
            header_line = header.decode().strip()
            print("Header line:", header_line)

            # 判断是否为图片长度信息
            if header_line.startswith("IMAGE_LENGTH:"):
                try:
                    img_length = int(header_line.split(":")[1])
                except Exception as e:
                    print("Failed to parse image length:", e)
                    continue
                print("Expected image size:", img_length)

                # 根据图片长度接收图片数据
                image_data = bytearray()
                remaining = img_length
                while remaining > 0:
                    try:
                        data = s.recv(remaining)
                    except Exception as e:
                        print("Error receiving image data:", e)
                        break
                    if not data:
                        print("No data received.")
                        break
                    image_data.extend(data)
                    remaining -= len(data)

                if len(image_data) == img_length:
                    # 裁剪图像（请根据需要修改裁剪框参数）
                    crop_box = (100, 0, 220, 240)
                    cropped_image = crop_image(image_data, crop_box)

                    # 保存裁剪后的图像（请修改保存路径）
                    save_path = r"D:\CEG4913CAPSTONE\CEG4913 ONGOING!updated\ServerSide_python"
                    if not os.path.exists(save_path):
                        os.makedirs(save_path)
                    filename = f"captured_image_{int(time.time())}.jpg"
                    full_filename = os.path.join(save_path, filename)
                    cropped_image.save(full_filename, format="JPEG")
                    print("Cropped image saved as:", full_filename)

                    # 调用 OCR 识别
                    ocr_result = ocr_recognition(full_filename)
                    print("OCR 识别结果：", ocr_result)

                    # 如果需要将结果发送到后端，请取消下一行注释
                    send_to_backend(ocr_result)
                else:
                    print("Uncompleted transmission; received: {} bytes, expected: {} bytes".format(len(image_data),
                                                                                                    img_length))
            else:
                print("Wrong header:", header_line)
        elif cmd == '0':
            print("Command sent, disconnecting...")
            break

    s.close()
    print("Disconnected")


def ocr_recognition(image_path):
    """
    调用 Hugging Face PARSeq-OCR 模型识别图片文字
    """
    client = Client("baudm/PARSeq-OCR")
    try:
        result = client.predict(
            model_name="parseq",  # 可用模型: "parseq", "parseq_tiny", 等
            image=handle_file(image_path),
            api_name="/App"
        )
        return result[0]
    except Exception as e:
        print(f"发生错误：{e}")
        return "OCR 识别失败"


def send_to_backend(text):
    """
    将识别出的文字发送到后端
    """
    url = "https://dab8-184-147-56-40.ngrok-free.app/esp32/receive-ESP32CAM"  # 替换为你的 ngrok URL
    payload = {"recognized_text": text}
    headers = {"Content-Type": "application/json"}
    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            print("文字数据已成功发送到后端：", text)
        else:
            print("发送失败，状态码：", response.status_code)
    except Exception as e:
        print("发送到后端时出错：", e)


if __name__ == "__main__":
    # 请根据实际情况设置 ESP32 的 IP 地址和端口号
    ESP32_IP = "172.20.10.3"  # ESP32 的 IP 地址
    ESP32_PORT = 333  # ESP32 的端口号
    interactive_client(ESP32_IP, ESP32_PORT)
