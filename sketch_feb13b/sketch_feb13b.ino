#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <Arduino.h>
#include <WebServer.h>

// ============ 引脚定义 ============
// LED1：用于层数检测，每检测到一层闪烁一次（LED_ROW_PIN）
#define SENSOR_PIN        34  // 模拟传感器输入（例如红外、超声波传感器）
#define LED_ROW_PIN       32  //A LED1：层数检测指示灯
#define LED_COL_PIN       12  // LED2：书本检测指示灯
#define LED_COMPLETE_PIN  27  // LED3：完成（书本找到了）指示灯


// ============ 阈值与网络设置 ============
#define DIST_THRESHOLD    1000  // 当模拟读数低于此值时认为检测到物体
const char* ssid = "iPhone 14";
const char* password = "1234567890";
// 请根据实际情况修改后端地址
const char* serverUrl = "https://esp32main-tony.ngrok.io/esp32/receive-esp32";

// ============ 全局变量 ============
// WiFi 与 HTTP 客户端
WiFiClientSecure wifiClient;
HTTPClient httpClient;
WebServer server(8080);

// 状态变量
int currentLayer = 0;   // 当前检测到的层数
int targetLayer = 0;    // 目标层数（由后端或串口设置）
bool isLayerSet = false;       // 是否已成功设置目标层数
bool isLayerComplete = false;   // 是否达到目标层数

// 书本检测相关
// waitingForBookResponse 为 true 时，表示当前正等待后端或串口返回 Boolean 值
// bookResponse 的值表示后端返回的结果（true：找到了书本；false：未找到书本）
bool waitingForBookResponse = false;
bool bookResponse = false;

// ---------------- 函数声明 ----------------
void handleCommand();
void setupWiFi();
void waitForTargetLayerInput();
void checkLayer();
void handleBookDetection();
void blinkLED(int pin);
void lightCompleteLED();
void resetState();


// =================== setup ===================
void setup() {
  Serial.begin(115200);
  pinMode(SENSOR_PIN, INPUT);
  pinMode(LED_ROW_PIN, OUTPUT);
  pinMode(LED_COL_PIN, OUTPUT);
  pinMode(LED_COMPLETE_PIN, OUTPUT);
  digitalWrite(LED_COMPLETE_PIN, LOW);

  setupWiFi();

  // 启动 HTTP 服务器，注册接口 /receive-command
  server.on("/receive-command", HTTP_POST, handleCommand);
  server.begin();
  Serial.println("[SERVER STARTED] on port 8080");

  wifiClient.setInsecure();

  // 首先等待目标层数输入（后端或串口输入）
  waitForTargetLayerInput();
}


// =================== loop ===================
void loop() {
  // 处理 HTTP 请求
  server.handleClient();

  // 处于层数检测阶段
  if (!isLayerComplete) {
    checkLayer();
  }
  // 层数达到后进入书本检测阶段
  else {
    handleBookDetection();
  }
}


// ------------------ 层数检测 ------------------
// 每检测到一次（传感器读数低于handleBookDetection阈值），增加当前层数并闪烁 LED1
// 当累计层数达到目标层数后，输出提示并进入书本检测阶段
void checkLayer() {
  if (analogRead(SENSOR_PIN) < DIST_THRESHOLD) {
    currentLayer++;
    blinkLED(LED_ROW_PIN);
    Serial.printf("层数检测：当前层数 = %d\n", currentLayer);
    delay(200);  // 防止过于频繁触发
    if (currentLayer >= targetLayer) {
      isLayerComplete = true;
      Serial.printf("层数到达：当前层数 = %d\n", currentLayer);
      delay(1000); // 延时1秒后开始书本检测
    }
  }
}


// ------------------ 书本检测 ------------------
// 每检测到一本书（传感器读数低于阈值）时，闪烁 LED2，
// 向后端发送一个 true 通知，然后进入等待状态，直到从后端或串口收到 Boolean 值。
//
// 等待期间如果再次检测到书本则忽略，直到等待结束。
// 如果收到 true，则表示书本找到了，点亮 LED3 2 秒后重置状态；
// 如果收到 false，则退出等待状态，继续检测下一本书。
void handleBookDetection() {
  // 如果未处于等待状态，则检测书本
  if (!waitingForBookResponse) {
    if (analogRead(SENSOR_PIN) < DIST_THRESHOLD) {
      // 检测到一本书
      blinkLED(LED_COL_PIN);
      Serial.println("检测到一本书，发送通知给后端...");

      // 向后端发送通知（HTTP POST）
      if (WiFi.status() == WL_CONNECTED) {
        httpClient.begin(wifiClient, serverUrl);
        httpClient.addHeader("Content-Type", "text/plain");

        // 准备要发送的 JSON payload
        String payload = "true";
        // ① 打印发送给后端的内容
        Serial.printf("发送给后端的payload: %s\n", payload.c_str());

        int httpResponseCode = httpClient.POST(payload);
        Serial.printf("HTTP 响应码: %d\n", httpResponseCode);

        if (httpResponseCode > 0) {
          String response = httpClient.getString();
          Serial.println("后端响应: " + response);
          if(response.equalsIgnoreCase("true")){
            bookResponse = true;
          }else{
            bookResponse = false;
          }
        }
        httpClient.end();
      } else {
        Serial.println("WiFi 连接失败！");
      }

      // 进入等待状态：等待后端或串口返回 Boolean 值
      waitingForBookResponse = true;

      server.handleClient();
      // ② 打印提示，表示正在等待后端返回布尔值
      Serial.println("等待后端返回boolean...");

      // 等待期间不断处理 HTTP 请求与串口输入
      while (waitingForBookResponse) {
        server.handleClient();

        // 检查串口输入
        if (Serial.available() > 0) {
          String input = Serial.readStringUntil('\n');
          input.trim();
          if (input.equalsIgnoreCase("true")) {
            bookResponse = true;
            waitingForBookResponse = false;
          } else if (input.equalsIgnoreCase("false")) {
            bookResponse = false;
            waitingForBookResponse = false;
          }
        }

        delay(100);
      }

      // 根据返回结果判断下一步
      if (bookResponse) {
        Serial.println("书本找到了");
        lightCompleteLED();
        resetState();
      } else {
        Serial.println("后端返回 false，继续检测下一本书...");
        // 此时重置等待标志，等待下一个检测事件
        waitingForBookResponse = false;
        delay(500);  // 短暂延时防止重复触发
      }
    }
  }
  // 如果已经处于等待状态，则忽略传感器触发
  delay(100);
}



// ------------------ LED 控制函数 ------------------
// LED 闪烁 500ms
void blinkLED(int pin) {
  digitalWrite(pin, HIGH);
  delay(500);
  digitalWrite(pin, LOW);
}

// LED3 点亮 2 秒（表示书本找到了）
void lightCompleteLED() {
  digitalWrite(LED_COMPLETE_PIN, HIGH);
  delay(2000);
  digitalWrite(LED_COMPLETE_PIN, LOW);
}


// ------------------ 重置状态 ------------------
// 清零层数、书本计数，并重新等待目标层数输入，进入下一轮循环
void resetState() {
  Serial.println("重置状态，准备下一轮检测...");
  currentLayer = 0;
  targetLayer = 0;
  isLayerSet = false;
  isLayerComplete = false;
  waitingForBookResponse = false;
  bookResponse = false;
  
  waitForTargetLayerInput();
}


// ------------------ 等待目标层数输入 ------------------
// 阻塞等待，通过后端 API 或串口输入一个1~4的数字来设定目标层数
void waitForTargetLayerInput() {
  Serial.println("等待目标层数输入（1~4），可通过后端API或串口输入...");
  while (!isLayerSet) {
    server.handleClient();
    if (Serial.available() > 0) {
      int input = Serial.parseInt();
      if (input >= 1 && input <= 4) {
        targetLayer = input;
        isLayerSet = true;
        Serial.printf("目标层数设置为：%d\n", targetLayer);
      } else {
        Serial.println("输入无效，请输入1~4之间的数字。");
      }
    }
    delay(100);
  }
}


// ------------------ HTTP 接口处理 ------------------
// 接口 /receive-command 用于接收后端输入：
// 1. 如果处于书本等待状态，则只接受 "true"/"false"（表示书本是否找到）；
// 2. 否则接受数字 1~4 来设置目标层数。
void handleCommand() {
  if (!server.hasArg("plain")) {
    server.send(400, "text/plain", "Error: No data received");
    return;
  }
  String payload = server.arg("plain");
  payload.trim();
  
  // 如果输入为 "true" 或 "false"
  if (payload.equalsIgnoreCase("true") || payload.equalsIgnoreCase("false")) {
    if (waitingForBookResponse) {
      bookResponse = payload.equalsIgnoreCase("true");
      waitingForBookResponse = false;
      server.send(200, "text/plain", "Book response received");
      return;
    } else {
      // 当前不处于等待状态，则直接忽略
      server.send(200, "text/plain", "Not waiting for book response");
      return;
    }
  }
  
  // 否则认为是数字（目标层数输入）
  int num = payload.toInt();
  if (num >= 1 && num <= 4) {
    if (!waitingForBookResponse) {
      targetLayer = num;
      isLayerSet = true;
      server.send(200, "text/plain", "Target layer set");
      Serial.printf("[HTTP] 目标层数设置为：%d\n", targetLayer);
    } else {
      server.send(400, "text/plain", "Ignoring numeric input while waiting for book response");
    }
    return;
  }
  
  server.send(400, "text/plain", "Invalid input");
}


// ------------------ WiFi 连接 ------------------
void setupWiFi() {
  WiFi.begin(ssid, password);
  Serial.println("连接 WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }
  Serial.println("WiFi 连接成功！");
  Serial.print("IP地址: ");
  Serial.println(WiFi.localIP().toString());
}
