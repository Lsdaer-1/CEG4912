package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.io.*;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

@Service
public class ESP32ReceiverService {

    private final int SERVER_PORT = 23456; // 定义服务端监听的端口号

    public void startReceiver() {
        new Thread(() -> {
            try (ServerSocket serverSocket = new ServerSocket(SERVER_PORT, 50, InetAddress.getByName("0.0.0.0"));) {
                System.out.println("Listening for connections on port " + SERVER_PORT + "...");

                while (true) {
                    Socket clientSocket = serverSocket.accept(); // 接受 ESP32 的连接

                    new Thread(()->handleClientConnection(clientSocket)).start();
//                    handleImage(clientSocket);

                    // 读取 ESP32 发来的消息
//                    try (BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()))) {
//                        String message;
//                        while ((message = reader.readLine()) != null) {
//                            System.out.println("Received message from ESP32: " + message);
//                        }
//                    }

                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    }
    private void handleImage(Socket clientSocket) {
        try (InputStream inputStream = clientSocket.getInputStream()) {

            // 读取文件大小（假设 ESP32 首先发送文件大小，长度为 16 字节）
            byte[] sizeBuffer = new byte[16];
            int sizeLength = inputStream.read(sizeBuffer); // 读取文件大小
            String sizeString = new String(sizeBuffer, 0, sizeLength).trim();
            int fileSize = Integer.parseInt(sizeString); // 将文件大小解析为整数
            System.out.println("Receiving image of size: " + fileSize + " bytes");

            // 创建保存图片的文件
            File outputFile = new File("received_image.jpg");
            try (FileOutputStream fileOutputStream = new FileOutputStream(outputFile)) {
                byte[] buffer = new byte[1024];
                int bytesRead;
                int totalBytesRead = 0;

                // 循环读取图片数据并写入文件
                while (totalBytesRead < fileSize && (bytesRead = inputStream.read(buffer)) != -1) {
                    fileOutputStream.write(buffer, 0, bytesRead);
                    totalBytesRead += bytesRead;
                }

                System.out.println("Image received and saved as: " + outputFile.getAbsolutePath());
                System.out.println("Total bytes read: " + totalBytesRead);

                // 校验文件是否完整
                if (totalBytesRead == fileSize) {
                    System.out.println("Image received successfully!");
                } else {
                    System.out.println("Image size mismatch! Expected: " + fileSize + ", Received: " + totalBytesRead);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private void handleClientConnection(Socket clientSocket) {
        try {
            // 设置读取超时时间（防止客户端断开时挂起）
//            clientSocket.setSoTimeout(30000); // 30秒超时
            InputStream inputStream = clientSocket.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

            // 使用 BufferedReader 读取文字信息
            String message;
            while ((message = reader.readLine()) != null) {
                    System.out.println("Received message from ESP32: " + message);
            }
            System.out.println("Client disconnected.");
        } catch (java.net.SocketTimeoutException e) {
            System.err.println("Connection timed out: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Connection error: " + e.getMessage());
        } finally {
            // 确保释放资源
            try {
                clientSocket.close();
                System.out.println("Connection closed");
            } catch (IOException ex) {
                System.err.println("Failed to close client socket: " + ex.getMessage());
            }
        }
    }
}
