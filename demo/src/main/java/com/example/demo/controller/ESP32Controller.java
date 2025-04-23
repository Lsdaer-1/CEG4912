package com.example.demo.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

@Service
public class ESP32Controller {


    private final String ESP32_URL = "https://dab8-184-147-56-40.ngrok-free.app/esp32/receive-esp32"; // 这里填 ESP32 通过 ngrok 获取的公网 URL
    private final String ESP32 = "https://7cc6-161-216-164-132.ngrok-free.app/receive-command";
    private final String ESP32CAM = "https://6336-2605-b100-d3d-252a-3d6e-5f9c-97e6-6683.ngrok-free.app/receive-cam" ;


    public String sendESP32(@RequestBody String number) {

        try {
            // 创建 HTTP 客户端
            RestTemplate restTemplate = new RestTemplate();

            // 设置请求头
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_PLAIN);

            // 设置请求体（发送的数字）
            number=number.trim();
            System.out.println("Received number from sensor: " + number);
            System.out.println("Sending request to ESP32 via ngrok: " + ESP32);

            // 发送 POST 请求
            HttpEntity<String> request = new HttpEntity<>(number, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(ESP32, request, String.class);

            return "Sent command: " + number + ", ESP32 Response: " + response.getBody();
        } catch (ResourceAccessException e) {  // 服务器无法连接 ESP32
            return "ESP32 not reachable: " + e.getMessage();
        } catch (HttpClientErrorException e) { // ESP32 返回 400 Bad Request
            return "ESP32 rejected request: " + e.getStatusCode() + " - " + e.getResponseBodyAsString();
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to send command: " + number;
        }
    }
    public String sendESP32CAM(@RequestBody String value){
        try {
            // 创建 HTTP 客户端
            RestTemplate restTemplate = new RestTemplate();

            // 设置请求头
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_PLAIN);

            // 设置请求体（发送的数字）
            value=value.trim();
            System.out.println("Received value: " + value);
            System.out.println("Sending request to ESP32CAM via ngrok: " + ESP32CAM);

            // 发送 POST 请求
            HttpEntity<String> request = new HttpEntity<>(value, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(ESP32CAM, request, String.class);

            return "Sent command: " + value + ", ESP32 Response: " + response.getBody();
        } catch (ResourceAccessException e) {  // 服务器无法连接 ESP32
            return "ESP32 not reachable: " + e.getMessage();
        } catch (HttpClientErrorException e) { // ESP32 返回 400 Bad Request
            return "ESP32 rejected request: " + e.getStatusCode() + " - " + e.getResponseBodyAsString();
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to send command: " + value;
        }
    }




}



