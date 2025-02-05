import socket

def interactive_client(esp_ip, esp_port):
    #socket init
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        s.connect((esp_ip, esp_port))
        print("ESP32 connected successfully{}:{}".format(esp_ip, esp_port))
    except Exception as e:
        print("fail to connect:", e)
        return

    while True:
        cmd = input("(1 take the shot, 0 disconnect): ").strip()
        if cmd not in ['1', '0']:
            print("dude, 1 or 0")
            continue

        try:
            s.sendall(cmd.encode())
        except Exception as e:
            print(e)
            break

        if cmd == '1':
            header = b""
            while b'\n' not in header:
                try:
                    chunk = s.recv(1)
                except Exception as e:
                    print( e)
                    break
                if not chunk:
                    print("连接在接收头部时被关闭")
                    return
                header += chunk
            header_line = header.decode().strip()
            print("header line:", header_line)
            if header_line.startswith("IMAGE_LENGTH:"):
                try:
                    img_length = int(header_line.split(":")[1])
                except Exception as e:
                    print("解析图片长度失败:", e)
                    continue
                print("expected size:", img_length)
                # 根据图片长度接收图片二进制数据
                image_data = bytearray()
                remaining = img_length
                while remaining > 0:
                    try:
                        data = s.recv(remaining)
                    except Exception as e:
                        print(e)
                        break
                    if not data:
                        print("no data")
                        break
                    image_data.extend(data)
                    remaining -= len(data)
                if len(image_data) == img_length:
                    filename = "captured_image.jpg"
                    with open(filename, "wb") as f:
                        f.write(image_data)
                    print("image saved as:", filename)
                else:
                    print("uncompleted transmission; received: {} bytes，expected {} bytes".format(len(image_data), img_length))
            else:
                print("wrong header:", header_line)
        elif cmd == '0':
            print("command sent, disconnecting...")
            break

    s.close()
    print("disconnected")

if __name__ == "__main__":
    ESP32_IP = "10.0.0.51"
    ESP32_PORT = 333
    interactive_client(ESP32_IP, ESP32_PORT)
