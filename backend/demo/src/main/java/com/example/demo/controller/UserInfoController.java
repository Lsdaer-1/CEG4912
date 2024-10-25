package com.example.demo.controller;

import com.example.demo.entity.UserInfo;
import com.example.demo.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserInfoController {
    @Autowired
    private UserInfoService userInfoService;


    @PostMapping("/save")
    public ResponseEntity<UserInfo> saveUser(@RequestBody UserInfo userInfo) {
        UserInfo savedUser = userInfoService.saveUser(userInfo);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<UserInfo>> getAllUsers() {
        List<UserInfo> users = userInfoService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/getUser/{email}")
    public ResponseEntity<UserInfo> getUserByEmail(@PathVariable String email) {
        Optional<UserInfo> user = userInfoService.getUserByEmail(email);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/deleteUser/{email}")
    public ResponseEntity<Void> deleteUserByEmail(@PathVariable String email) {
        userInfoService.deleteUserByEmail(email);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/updateUser/{email}")
    public ResponseEntity<UserInfo> updateUser(@PathVariable String email, @RequestBody UserInfo updatedUserInfo) {
        UserInfo updatedUser = userInfoService.updateUser(email, updatedUserInfo);
        return ResponseEntity.ok(updatedUser);
    }

}
