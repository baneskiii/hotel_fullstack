package com.application.hotel.dto;

public class UserResponseDto {

    private String name;
    private String token;

    public UserResponseDto() {
    }

    public UserResponseDto(String name, String token) {
        this.name = name;
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
