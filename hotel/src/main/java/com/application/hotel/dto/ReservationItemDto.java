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
public class ReservationItemDto {
    private ReservationDto reservationDto;
    @NotNull(message = "Item number is required!")
    private Long itemNumber;
    @NotNull(message = "Guest is required!")
    private GuestDto guestDto;
    @NotNull(message = "Room is required!")
    private RoomDto roomDto;

    public ReservationItemDto() {
    }

    public ReservationItemDto(ReservationDto reservationDto, @NotNull(message = "Item number is required!") Long itemNumber, @NotNull(message = "Guest is required!") GuestDto guestDto, @NotNull(message = "Room is required!") RoomDto roomDto) {
        this.reservationDto = reservationDto;
        this.itemNumber = itemNumber;
        this.guestDto = guestDto;
        this.roomDto = roomDto;
    }

    public ReservationDto getReservationId() {
        return reservationDto;
    }

    public void setReservationId(ReservationDto reservationDto) {
        this.reservationDto = reservationDto;
    }

    public Long getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(Long itemNumber) {
        this.itemNumber = itemNumber;
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
}
