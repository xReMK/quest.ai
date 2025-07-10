package com.quest_ai.server.dto;

public class AuthResponse {
    private String token;
    public AuthResponse(String token) { this.token = token; }
    // getter

    public String getToken() {
        return token;
    }
}
