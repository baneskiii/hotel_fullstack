/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.application.hotel.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

/**
 *
 * @author Bane
 */
public class RoomTypeDto implements ApplicationDto {

    private Long id;
    @Min(value = 1, message = "Number of beds must be 1 or greater than 1!")
    @NotNull(message = "Number of beds is required!")
    private int beds;
    @Positive(message = "Area must be positive!")
    @NotNull(message = "Area is required!")
    private int area;

    public RoomTypeDto() {
    }

    public RoomTypeDto(Long id, @NotNull(message = "Number of beds is required!") int beds, @NotNull(message = "Area is required!") int area) {
        this.id = id;
        this.beds = beds;
        this.area = area;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getBeds() {
        return beds;
    }

    public void setBeds(int beds) {
        this.beds = beds;
    }

    public int getArea() {
        return area;
    }

    public void setArea(int area) {
        this.area = area;
    }
}
