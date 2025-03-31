#include <Arduino.h>
#include "esp_camera.h"
#include <WiFi.h>
#include <WiFiClientSecure.h>
#define CAMERA_MODEL_AI_THINKER  // 选择 AI-Thinker 摄像头
#include "camera_pins.h"         // 引入摄像头引脚定义

// -------------------- WiFi 配置 --------------------
const char *ssid = "iPhone 14";
const char *password = "1234567890";

// -------------------- TCP 服务器配置 --------------------
WiFiServer tcpServer(333);  // 监听 333 端口
WiFiClient client;

// -------------------- 连接 WiFi --------------------
void setupWiFi() {
    Serial.println("[WiFi] 连接中...");
    WiFi.begin(ssid, password);
    WiFi.setSleep(false);

    unsigned long startAttemptTime = millis();
    while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 15000) {
        Serial.print(".");
        delay(500);
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("\n[WiFi] 连接成功");
        Serial.print("[WiFi] ESP32 IP: ");
        Serial.println(WiFi.localIP());
    } else {
        Serial.println("[WiFi] 连接失败");
    }
}

// -------------------- 初始化摄像头 --------------------
void setupCamera() {
    camera_config_t config;
    config.ledc_channel = LEDC_CHANNEL_0;
    config.ledc_timer = LEDC_TIMER_0;
    config.pin_d0 = Y2_GPIO_NUM;
    config.pin_d1 = Y3_GPIO_NUM;
    config.pin_d2 = Y4_GPIO_NUM;
    config.pin_d3 = Y5_GPIO_NUM;
    config.pin_d4 = Y6_GPIO_NUM;
    config.pin_d5 = Y7_GPIO_NUM;
    config.pin_d6 = Y8_GPIO_NUM;
    config.pin_d7 = Y9_GPIO_NUM;
    config.pin_xclk = XCLK_GPIO_NUM;
    config.pin_pclk = PCLK_GPIO_NUM;
    config.pin_vsync = VSYNC_GPIO_NUM;
    config.pin_href = HREF_GPIO_NUM;
    config.pin_sccb_sda = SIOD_GPIO_NUM;
    config.pin_sccb_scl = SIOC_GPIO_NUM;
    config.pin_pwdn = PWDN_GPIO_NUM;
    config.pin_reset = RESET_GPIO_NUM;
    config.xclk_freq_hz = 20000000;
    config.pixel_format = PIXFORMAT_JPEG;
    config.frame_size = FRAMESIZE_VGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;

    esp_err_t err = esp_camera_init(&config);
    if (err != ESP_OK) {
        Serial.printf("摄像头初始化失败，错误码: 0x%x\n", err);
        return;
    }
    Serial.println("[摄像头] 初始化成功");
}

// -------------------- 发送图像数据 --------------------
void sendImage(WiFiClient &client) {
    Serial.println("[ESP32] 拍照中...");
    camera_fb_t *fb = esp_camera_fb_get();
    if (!fb) {
        Serial.println("[ESP32] 拍照失败");
        client.println("ERROR");
        return;
    }

    Serial.printf("[ESP32] 拍照完成，图像大小: %d 字节\n", fb->len);
    
    // 发送 "IMAGE_LENGTH:xxxxx\n"
    client.printf("IMAGE_LENGTH:%d\n", fb->len);
    client.write(fb->buf, fb->len);  // 发送图像数据
    esp_camera_fb_return(fb);

    Serial.println("[ESP32] 图像已发送");
}

// -------------------- 主循环 --------------------
void loop() {
    if (!client) {
        client = tcpServer.available();  // 监听新的连接
    }

    if (client && client.connected()) {
        if (client.available()) {
            String command = client.readStringUntil('\n');  // 读取命令
            command.trim();
            Serial.println("[ESP32] 收到指令: " + command);

            if (command == "capture") {
                sendImage(client);
            }
        }
    }
}

// -------------------- setup --------------------
void setup() {
    Serial.begin(115200);
    setupWiFi();
    setupCamera();
    tcpServer.begin();  // 启动 TCP 服务器
    Serial.println("[ESP32] TCP 服务器已启动，等待连接...");
}
