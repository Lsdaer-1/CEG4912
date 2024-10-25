package com.example.demo.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Getter
@Setter
@Document(collation = "userInfo")
public class UserInfo {
    private String name;
    @Id
    private String email;
    private String password;
    @OneToMany(cascade = CascadeType.ALL)
    private List<BookInfo> book;


}
