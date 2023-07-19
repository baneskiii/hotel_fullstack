/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.application.hotel.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 *
 * @author Bane
 */
public class RoomDto implements ApplicationDto {
    private Long id;
    @Min(value = 0, message = "Floor must be 0 or greater than 0!")
    @NotNull(message = "Floor is required!")
    private int floor;
    @NotNull(message = "Status is required!")
    private boolean status;
    @NotNull(message = "Room type is required!")
    private RoomTypeDto roomTypeDto;

    public RoomDto() {
    }

    public RoomDto(Long id, @NotNull(message = "Floor is required!") int floor, @NotNull(message = "Status is required!") boolean status, @NotNull(message = "Room type is required!") RoomTypeDto roomTypeDto) {
        this.id = id;
        this.floor = floor;
        this.status = status;
        this.roomTypeDto = roomTypeDto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getFloor() {
        return floor;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public RoomTypeDto getRoomTypeDto() {
        return roomTypeDto;
    }

    public void setRoomTypeDto(RoomTypeDto roomTypeDto) {
        this.roomTypeDto = roomTypeDto;
    }
}
