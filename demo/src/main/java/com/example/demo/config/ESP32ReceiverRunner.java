package com.example.demo.config;

import com.example.demo.service.ESP32ReceiverService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;



@Component
public class ESP32ReceiverRunner {

    @Autowired
    private ESP32ReceiverService esp32ReceiverService;

    @PostConstruct
    public void init() {
        // 启动 TCP 服务
        System.out.println("Starting ESP32 Receiver...");
        esp32ReceiverService.startReceiver();
    }
}
    