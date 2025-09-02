package com.quest_ai.server.aiControllers;

import com.quest_ai.server.model.QueryRequest;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.ollama.api.OllamaModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class OllamaController {

    private OllamaChatModel chatModel;

    public OllamaController(OllamaChatModel chatModel){
        this.chatModel=chatModel;
    }

    @PostMapping("/query")
    public ResponseEntity<String> getAnswer(@RequestBody QueryRequest request){
        String query = request.getPrompt();
        System.out.println("Received prompt: " + query);
        String response = chatModel.call(query);
        return ResponseEntity.ok(response);
    }
}
