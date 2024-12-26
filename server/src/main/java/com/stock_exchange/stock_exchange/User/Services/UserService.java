package com.stock_exchange.stock_exchange.User.Services;

import com.stock_exchange.stock_exchange.User.models.User;
import com.stock_exchange.stock_exchange.User.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }

    public String addUser(User user) {
        userRepository.save(user);
        return "User Added Successfully";
    }

}