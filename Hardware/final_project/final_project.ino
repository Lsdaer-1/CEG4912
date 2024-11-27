#include "wifi_manager.h"
#include "http_client.h"
#include "motion_control.h"
#include "config.h"


void setup() {
    Serial.begin(115200);
    connectToWiFi();                     // 连接 Wi-Fi
    initializeMotors();                  // 初始化滑轨控制
    Serial.println("Enter book ID to fetch position:");  // 提示用户输入书籍 ID
}

void loop() {
    int book_id = fetchBookID();  // 获取书籍 ID
    // int book_id = 123;                   // 示例书籍 ID
    int row, column;

    // 获取书籍位置
    if (fetchBookPosition(book_id, row, column)) {
        Serial.printf("Moving to Row: %d, Column: %d\n", row, column);
        moveToPosition(row, column);     // 控制滑轨移动
    } else {
        Serial.println("Failed to fetch book position.");
    }

    delay(10000);  // 每 10 秒请求一次
}

// void loop() {
//     if (Serial.available() > 0) {
//         String book_name = Serial.readStringUntil('\n');  // 从串口读取书籍名称
//         book_name.trim();  // 去除前后空格
//         if (book_name.length() > 0) {
//             Serial.printf("Fetching position for book: %s\n", book_name.c_str());

//             int row, column;
//             if (fetchBookPosition(book_name, row, column)) {
//                 Serial.printf("Book '%s' is located at Row: %d, Column: %d\n", book_name.c_str(), row, column);
//                 // 在这里处理滑轨或其他逻辑
//             } else {
//                 Serial.println("Failed to fetch book position.");
//             }
//         } else {
//             Serial.println("Invalid book name. Please try again.");
//         }

//         Serial.println("Enter book name to fetch position:");
//     }

//     delay(100);  // 延时以减少 CPU 占用
// }
