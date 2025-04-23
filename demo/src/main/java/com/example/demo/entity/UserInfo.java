package com.example.demo.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.lang.reflect.Array;
import java.util.List;


@Getter
@Setter
@Document(collection = "users")
public class UserInfo {

    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    @OneToMany(cascade = CascadeType.ALL)
    private Array borrowedBooks;


}
