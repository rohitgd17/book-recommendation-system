package com.book_recommendation.system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.book_recommendation.system.dto.AuthResponse;
import com.book_recommendation.system.entities.User;
import com.book_recommendation.system.repositiries.UserRepository;
import com.book_recommendation.system.security.JwtUtil;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtService;

    
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }
   @PostMapping("/login")
   public ResponseEntity<?> loginUser(@RequestBody User loginRequest)
   {
	   
	   Optional<User>userOptinal=userRepository.findByEmail(loginRequest.getEmail());
	   
	   if(userOptinal.isPresent())
	   {
		   User user=userOptinal.get();
		   if(passwordEncoder.matches(loginRequest.getPassword(),user.getPassword())) {
			   String token=jwtService.generateToken(user.getEmail());
			   
			   return ResponseEntity.ok(new AuthResponse(token));
		   }
	   }
	   
	   
	   
	   
	   return ResponseEntity.status(401).body(Map.of("Message","Invalid mail or password"));
   }
}
