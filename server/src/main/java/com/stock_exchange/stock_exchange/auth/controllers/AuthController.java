package com.stock_exchange.stock_exchange.auth.controllers;

import com.stock_exchange.stock_exchange.User.Services.UserService;
import com.stock_exchange.stock_exchange.User.models.User;
import com.stock_exchange.stock_exchange.auth.utilities.JwtUtility;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private JwtUtility jwtUtility;

    @Autowired
    private UserService userService;

    @PostMapping("/user")
    public ResponseEntity<String> addNewUser(@RequestBody User user) {
        String response = userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("auth_token", null);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60);

        response.addCookie(cookie);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User authRequest, HttpServletResponse response) {
        User user = userService.loadUserByUsername(authRequest.getUsername());
        if (user.getPassword().equals(authRequest.getPassword())) {
            String token = jwtUtility.generateToken(authRequest.getUsername());
            Cookie cookie = new Cookie("auth_token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60);
            cookie.setAttribute("SameSite", "Lax");

            response.addCookie(cookie);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }
}
