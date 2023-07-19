/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.application.hotel.dto;


import com.application.hotel.model.Guest;
import com.application.hotel.model.Room;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 *
 * @author Bane
 */
public class RatingDto implements ApplicationDto {
    @NotNull(message = "Guest is required!")
    private GuestDto guestDto;
    @NotNull(message = "Room is required!")
    private RoomDto roomDto;
    @Min(value = 1, message = "Rating must be 1 or greater then 1!")
    @Max(value = 5, message = "Rating must be 5 or less then 5!")
    @NotNull(message = "Rating is required!")
    private int rating;

    public RatingDto() {
    }

    public RatingDto(GuestDto guestDto, RoomDto roomDto, @NotNull(message = "Rating is required!") int rating) {
        this.guestDto = guestDto;
        this.roomDto = roomDto;
        this.rating = rating;
    }

    public GuestDto getGuestDto() {
        return guestDto;
    }

    public void setGuestDto(GuestDto guestDto) {
        this.guestDto = guestDto;
    }

    public RoomDto getRoomDto() {
        return roomDto;
    }

    public void setRoomDto(RoomDto roomDto) {
        this.roomDto = roomDto;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
