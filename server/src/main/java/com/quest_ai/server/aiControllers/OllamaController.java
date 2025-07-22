package com.quest_ai.server.aiControllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class OllamaController {

    @PostMapping("/query")
    public ResponseEntity<String> getAnswer(){
        System.out.println("heyy lol");
        return ResponseEntity.ok("Hello World");
    }
}
