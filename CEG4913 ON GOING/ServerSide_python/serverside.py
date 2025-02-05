from flask import Flask, request
import time

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image/jpeg' in request.content_type:
        image_data = request.data
        filename = f"img_{int(time.time())}.jpg"
        with open(filename, 'wb') as f:
            f.write(image_data)
        return f"Saved as {filename}", 200
    else:
        return "Invalid content type", 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
