package com.application.hotel.controller;

import com.application.hotel.dto.UserRequestDto;
import com.application.hotel.dto.UserResponseDto;
import com.application.hotel.service.auth.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UserRequestDto userRequestDto){
        UserResponseDto userResponseDto = authService.login(userRequestDto.getUsername(), userRequestDto.getPassword());
        if(userResponseDto.getName().equals("")){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with username " + userRequestDto.getUsername() + " not found");
        }
        return ResponseEntity.ok(userResponseDto);
    }

}
