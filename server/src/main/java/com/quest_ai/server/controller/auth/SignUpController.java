/*
package com.quest_ai.server.controller.auth;

import com.quest_ai.server.dto.AuthRequest;
import com.quest_ai.server.dto.AuthResponse;
import com.quest_ai.server.dto.UserDTO;
import com.quest_ai.server.service.auth.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class SignUpController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO){
        try{
            String token = userService.registerUser(userDTO);
            System.out.println("token : "+token);
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (RuntimeException exception){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO userDTO){
        String token = userService.loginUser(userDTO);
        return ResponseEntity.ok(new AuthResponse(token));
    }
}


























*/
