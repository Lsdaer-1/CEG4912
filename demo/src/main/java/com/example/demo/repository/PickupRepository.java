package com.example.demo.repository;

import com.example.demo.entity.Pickups;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PickupRepository extends MongoRepository<Pickups, String> {
    // 可以自定义查询，比如：List<Pickup> findByStatus(String status);
}
