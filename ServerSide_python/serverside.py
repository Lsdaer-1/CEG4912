import json

from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")  # 允许跨域 WebSocket 连接

command_state = "false"

@app.route('/receive-cam', methods=['POST'])
def receive_cam():
    """ 处理外部 POST 请求，修改 command_state 状态 """
    global command_state
    data = request.data.decode("utf-8").strip().lower()
    print(f"✅ Flask 收到数据: {repr(data)}")

    if data == "true":
        command_state = "true"
        print("📸 触发拍照")
        socketio.emit("command", {"command": "true"})    # ✅ 通过 WebSocket 发送命令
    else:
        command_state = "false"

    return jsonify({"status": "ok", "command": command_state}), 200

@app.route('/get-command', methods=['GET'])
def get_command():
    """ 允许查询当前命令状态（备用 API） """
    global command_state
    return jsonify({"status": "ok", "command": command_state}), 200

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8081, debug=True)
