/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.application.hotel.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

/**
 *
 * @author Bane
 */
public class GuestDto implements ApplicationDto{

    private Long id;
    @NotNull(message = "First name is required!")
    @Size(min = 2, max = 15, message = "First name must be 2-15 characters long!")
    private String firstName;
    @NotNull(message = "Last name is required!")
    @Size(min = 2, max = 15, message = "Last name must be 2-15 characters long!")
    private String lastName;
    @NotNull(message = "Birthdate is required!")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate birthdate;
    @NotNull(message = "City is required!")
    private CityDto cityDto;

    public GuestDto() {
    }

    public GuestDto(Long id, @NotNull(message = "First name is required!") String firstName, @NotNull(message = "Last name is required!") String lastName, @NotNull(message = "Birthdate is required!") LocalDate birthdate, @NotNull(message = "City is required!") CityDto cityDto) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.cityDto = cityDto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public CityDto getCityDto() {
        return cityDto;
    }

    public void setCityDto(CityDto cityDto) {
        this.cityDto = cityDto;
    }
}
