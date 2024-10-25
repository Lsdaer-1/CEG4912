package com.example.demo.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@Document(collation = "bookInfo")
public class BookInfo {
    @Id
    private String bookName;
    private String bookDetail;
    private String borrowDate;

}
