/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.application.hotel.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Bane
 */
public class ReservationDto implements ApplicationDto {
    private Long id;
    @NotNull(message = "Date from is required!")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateFrom;
    @NotNull(message = "Date to is required!")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateTo;
    @NotNull(message = "Guest is required!")
    private GuestDto guestDto;
    @NotNull(message = "Reservation items are required!")
    private List<ReservationItemDto> reservationItemsDtos;

    public ReservationDto() {
        reservationItemsDtos = new ArrayList<>();
    }

    public ReservationDto(Long id, @NotNull(message = "Date from is required!") LocalDate dateFrom, @NotNull(message = "Date to is required!") LocalDate dateTo, @NotNull(message = "Guest is required!") GuestDto guestDto, @NotNull(message = "Reservation items are required!") List<ReservationItemDto> reservationItemsDtos) {
        this.id = id;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.guestDto = guestDto;
        this.reservationItemsDtos = reservationItemsDtos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public void setDateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
    }

    public GuestDto getGuestDto() {
        return guestDto;
    }

    public void setGuestDto(GuestDto guestDto) {
        this.guestDto = guestDto;
    }

    public List<ReservationItemDto> getReservationItemsDtos() {
        return reservationItemsDtos;
    }

    public void setReservationItemsDtos(List<ReservationItemDto> reservationItemsDtos) {
        this.reservationItemsDtos = reservationItemsDtos;
    }
}
