/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.application.hotel.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 *
 * @author Bane
 */
public class UserRequestDto {
    @NotNull(message = "Username is required!")
    @Size(min = 4, max = 10, message = "Username must be 4-10 characters long!")
    private String username;
    @NotNull(message = "Username is required!")
    @Size(min = 4, max = 10, message = "Username must be 4-10 characters long!")
    private String password;
    public UserRequestDto() {
    }

    public UserRequestDto(@NotNull(message = "Username is required!") String username, @NotNull(message = "Username is required!") String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
