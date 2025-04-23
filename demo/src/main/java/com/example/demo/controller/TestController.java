package com.example.demo.controller;

import com.example.demo.entity.Pickups;
import com.example.demo.repository.PickupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TestController {
    @Autowired
    private PickupRepository pickupRepository;

    @GetMapping("/test")
    public List<Pickups> getAllPickups() {
        return pickupRepository.findAll();
    }
}
