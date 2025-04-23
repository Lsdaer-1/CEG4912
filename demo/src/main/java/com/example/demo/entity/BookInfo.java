package com.example.demo.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@Document(collection= "books")
public class BookInfo {
    @Id
    private String id;
    private String name;
    private int publishedYear;
    private int copiesAvailable;
    private String author;

}
