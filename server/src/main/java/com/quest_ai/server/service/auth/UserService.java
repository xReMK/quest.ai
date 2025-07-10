package com.quest_ai.server.service.auth;

import com.quest_ai.server.dto.UserDTO;
import com.quest_ai.server.model.User;
import com.quest_ai.server.repo.UserRepository;
import com.quest_ai.server.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtTokenProvider jwtTokenProvider;

    public String registerUser(UserDTO userDTO){
        if(userRepository.existsByMail(userDTO.getEmail())){
            System.out.println("User already exists!");
            throw new RuntimeException("User already exists");
        }
        User user = new User();
        user.setUserName(userDTO.getUsername());
        user.setMail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        userRepository.save(user);
        return jwtTokenProvider.generateToken(user.getUserName());
    }

    public String loginUser(UserDTO userDTO){
        User user = userRepository.findByUserName(userDTO.getUsername())
                .orElseThrow(()->new UsernameNotFoundException("User not found"));
        if(!passwordEncoder.matches(userDTO.getPassword(),user.getPassword())) throw new BadCredentialsException("Invalid credentials");
        return jwtTokenProvider.generateToken(userDTO.getUsername());
    }
}



























