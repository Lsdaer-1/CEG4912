package com.example.demo.controller;

import com.example.demo.entity.Pickups;
import com.example.demo.repository.PickupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/esp32") // 定义统一的路径前缀
public class ESP32ApiController {
    private String bookName;

    @Autowired
    private ESP32Controller esp32Controller; // 注入原有的 ESP32Controller
    @Autowired
    private PickupRepository pickupRepository;
    @Autowired
    private RestTemplate restTemplate;



    @PostMapping(value = "/send-ESP32", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public String sendESP32(@RequestBody Map<String, String> payload) {
        String bookTitle=payload.get("bookTitle");
        bookName=bookTitle;
        String number = null;
        String number2 =null;
        String command=null;
        List<Pickups> pickupsList = pickupRepository.findAll();
        System.out.println("从数据库获取到 pickups 的 location：");
        for(Pickups pickup:pickupsList){
            if (pickup.getTitle().equalsIgnoreCase(bookName)){ //判断是否是数据库里的书本名字
                number= pickup.getLocation().get(0);
                number2=pickup.getLocation().get(1);
                command=number + "," + number2;
                System.out.println(command);
                System.out.println("Title: " + pickup.getTitle() + ", Location: " + pickup.getLocation());
                break;
            }


        }
        // 调用 ESP32Controller 的 TCP 通信方法，发送两个整数
        return esp32Controller.sendESP32(command);
    }
    @PostMapping("/test-print-pickups")
    public String testPrintPickups(@RequestBody Map<String, String> payload) {
        String bookTitle=payload.get("bookTitle");
        bookName=bookTitle;
        System.out.println(bookName);
        List<Pickups> pickupsList = pickupRepository.findAll();
        System.out.println("从数据库获取到 pickups 的 location：");
        for(Pickups pickup:pickupsList){
            if (pickup.getTitle().equalsIgnoreCase("The Client Retention Handbook for Digital Marketing Agencies: How to Keep Clients on Board Long-Term and Reduce Churn")){ //判断是否是数据库里的书本名字
                String number= pickup.getLocation().get(0);
                System.out.println(number);
            }
//            System.out.println("Title: " + pickup.getTitle() + ", Location: " + pickup.getLocation());
        }

        return "✅ Pickups printed to console!";
    }

    @PostMapping(value = "/send-ESP32CAM", consumes = MediaType.TEXT_PLAIN_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public String sendESP32CAM() {
        String value="true";
        return esp32Controller.sendESP32CAM(value);


    }

    //接收摄像头的信息然后做对比
    @PostMapping(value = "/receive-ESP32CAM", consumes = MediaType.TEXT_PLAIN_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> receiveData(@RequestBody String data) {
        data=data.replaceAll("\\s+", " ").toLowerCase().trim();
        int count=0;
        bookName=bookName.trim();
        System.out.println(data);
        System.out.println(bookName);
        for(int i=0; i<data.length();i++){
            char letter=data.charAt(i);
            if (bookName.toLowerCase().contains(String.valueOf(letter))){
                count++;
            }
        }
        if (count>=5){
            esp32Controller.sendESP32("true");
        }else {
            esp32Controller.sendESP32("false");
        }
        return ResponseEntity.ok("true");
    }

    //接收ESP32的信息并发送信息给摄像头或者ESP32
    @PostMapping(value="/receive-esp32", consumes = MediaType.TEXT_PLAIN_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> receiveESP32(@RequestBody String data) {
        if(data.contains("true")){
            System.out.println("首次触发，调用摄像头");
            restTemplate.postForObject("http://localhost:8080/esp32/send-ESP32CAM", "trigger", String.class);
            System.out.println("Received from ESP32: " + data);
            System.out.println("ESP32 任务完成，自动发送 'true' 确认完成！");
//            esp32Controller.sendESP32("true");
        }else {
            esp32Controller.sendESP32("false");
        }
        return ResponseEntity.ok("Data success");
    }

}
