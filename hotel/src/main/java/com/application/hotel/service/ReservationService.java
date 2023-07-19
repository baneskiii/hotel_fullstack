package com.application.hotel.service;

import com.application.hotel.dto.ReservationDto;
import com.application.hotel.exception.NotFoundException;

import java.time.LocalDate;
import java.util.List;

public interface ReservationService {

    public List<ReservationDto> getAllReservations();

    public ReservationDto getReservationById(Long id) throws NotFoundException;

    public List<ReservationDto> getReservationsByDateFrom(LocalDate dateFrom);

    public ReservationDto createReservation(ReservationDto reservationDto) throws RuntimeException;

    public ReservationDto updateReservation(Long id, ReservationDto reservationDto) throws RuntimeException;

    public void deleteReservation(Long id) throws NotFoundException;

}
