package com.example.demo.repository;

import com.example.demo.entity.BookInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookInfoRepository extends MongoRepository<BookInfo,String> {
    List<BookInfo> findByName(String name);
}
