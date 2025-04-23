package com.example.demo.repository;

import com.example.demo.entity.UserInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepository extends MongoRepository<UserInfo,String> {
}
