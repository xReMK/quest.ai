package com.quest_ai.server.model;

public class QueryRequest {
    private String prompt;

    // Default constructor (required for JSON deserialization)
    public QueryRequest() {
    }

    // Getter and setter
    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }
}
