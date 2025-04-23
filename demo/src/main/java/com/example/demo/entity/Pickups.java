package com.example.demo.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "pickups") // 指定集合名称
public class Pickups {

    @Id
    private String id;

    private String title;

    private String status;

    private List<String> location;

    private int __v;
}
