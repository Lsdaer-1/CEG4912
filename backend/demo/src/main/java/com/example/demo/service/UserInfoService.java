package com.example.demo.service;

import com.example.demo.entity.UserInfo;
import com.example.demo.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserInfoService {

    @Autowired
    private UserInfoRepository userInfoRepository;

    public UserInfo saveUser(UserInfo userInfo) {
        return userInfoRepository.save(userInfo);
    }

    public List<UserInfo> getAllUsers() {
        return userInfoRepository.findAll();
    }

    public Optional<UserInfo> getUserByEmail(String email){
        return userInfoRepository.findById(email);
    }

    public void deleteUserByEmail(String email){
        userInfoRepository.deleteById(email);
    }

    public UserInfo updateUser(String email, UserInfo updatedUserInfo) {
        Optional<UserInfo> existingUser = userInfoRepository.findById(email);
        if (existingUser.isPresent()) {
            UserInfo user = existingUser.get();
            user.setName(updatedUserInfo.getName());
            user.setPassword(updatedUserInfo.getPassword());
            return userInfoRepository.save(user);
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }
}
