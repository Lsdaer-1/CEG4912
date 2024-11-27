#include <HTTPClient.h>
#include "http_client.h"
#include <ArduinoJson.h>

#include "config.h"

int fetchBookID() {
    HTTPClient http;
    String url = "http://example.com/api/get_book_id";  // 替换为你的网站 API URL
    http.begin(url);

    int httpCode = http.GET();  // 发送 HTTP GET 请求
    if (httpCode > 0) {
        if (httpCode == HTTP_CODE_OK) {
            String payload = http.getString();  // 获取 JSON 数据
            Serial.println("Response:");
            Serial.println(payload);

            // 使用 ArduinoJson 解析 JSON 数据
            StaticJsonDocument<200> doc;
            DeserializationError error = deserializeJson(doc, payload);

            if (!error) {
                int book_id = doc["book_id"];  // 提取 JSON 中的 book_id
                http.end();
                return book_id;
            } else {
                Serial.print("JSON Parsing failed: ");
                Serial.println(error.c_str());
            }
        } else {
            Serial.printf("HTTP GET Error: %d\n", httpCode);
        }
    } else {
        Serial.printf("HTTP Request failed: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
    return -1;  // 如果失败，返回 -1
}



bool fetchBookPosition(int book_id, int &row, int &column) {
    String url = String(SERVER_URL) + "/api/get_position?book_id=" + String(book_id);

    HTTPClient http;
    http.begin(url);
    int httpCode = http.GET();

    if (httpCode > 0 && httpCode == HTTP_CODE_OK) {
        String payload = http.getString();
        sscanf(payload.c_str(), "{\"row\":%d,\"column\":%d}", &row, &column);
        http.end();
        return true;
    } else {
        Serial.printf("HTTP Request failed: %s\n", http.errorToString(httpCode).c_str());
        http.end();
        return false;
    }
}


// bool fetchBookPosition(const String& book_name, int &row, int &column) {
//     HTTPClient http;
//     http.begin(SERVER_URL);

//     // 构建 JSON 请求体
//     StaticJsonDocument<200> requestBody;
//     requestBody["book_name"] = book_name;

//     String jsonRequest;
//     serializeJson(requestBody, jsonRequest);

//     http.addHeader("Content-Type", "application/json");  // 设置请求头
//     int httpCode = http.POST(jsonRequest);              // 发送 POST 请求

//     if (httpCode > 0) {
//         Serial.printf("HTTP Response Code: %d\n", httpCode);
//         if (httpCode == HTTP_CODE_OK) {
//             String payload = http.getString();
//             Serial.println("Response:");
//             Serial.println(payload);

//             // 解析 JSON 响应体
//             StaticJsonDocument<200> responseBody;
//             DeserializationError error = deserializeJson(responseBody, payload);

//             if (!error) {
//                 row = responseBody["row"];
//                 column = responseBody["column"];
//                 http.end();
//                 return true;  // 成功获取位置
//             } else {
//                 Serial.print("JSON Parsing failed: ");
//                 Serial.println(error.c_str());
//             }
//         } else {
//             Serial.println("Error: Server did not return HTTP 200");
//         }
//     } else {
//         Serial.printf("HTTP Request failed: %s\n", http.errorToString(httpCode).c_str());
//     }

//     http.end();
//     return false;  // 获取位置失败
// }
