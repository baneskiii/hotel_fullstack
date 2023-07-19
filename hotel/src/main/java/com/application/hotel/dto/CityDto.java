/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.application.hotel.dto;

import jakarta.validation.constraints.NotNull;

/**
 *
 * @author Bane
 */
public class CityDto implements ApplicationDto {

    private Long id;

    private int zipcode;


    private String name;

    public CityDto() {
    }

    public CityDto(@NotNull(message = "Id is required!") Long id, @NotNull(message = "Zipcode is required!") int zipcode, @NotNull(message = "Name is required!") String name) {
        this.id = id;
        this.zipcode = zipcode;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getZipcode() {
        return zipcode;
    }

    public void setZipcode(int zipcode) {
        this.zipcode = zipcode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
