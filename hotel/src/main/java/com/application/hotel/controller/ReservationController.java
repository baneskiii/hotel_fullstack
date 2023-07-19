package com.application.hotel.controller;

import com.application.hotel.dto.ReservationDto;
import com.application.hotel.exception.NotFoundException;
import com.application.hotel.service.ReservationItemService;
import com.application.hotel.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/reservations")
@CrossOrigin("*")
public class ReservationController {
    private final ReservationService reservationService;
    private final ReservationItemService reservationItemService;

    public ReservationController(ReservationService reservationService, ReservationItemService reservationItemService) {
        this.reservationService = reservationService;
        this.reservationItemService = reservationItemService;
    }

    @GetMapping
    public ResponseEntity<Object> getAllReservations() {
        List<ReservationDto> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getReservationById(@PathVariable Long id) {
        try {
            ReservationDto reservation = reservationService.getReservationById(id);
            return ResponseEntity.ok(reservation);
        } catch (NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @GetMapping("/byDateFrom")
    public ResponseEntity<Object> getReservationsByDateFrom(@RequestParam String dateFrom){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate date = LocalDate.parse(dateFrom, formatter);
        List<ReservationDto> reservations = reservationService.getReservationsByDateFrom(date);
        return ResponseEntity.ok(reservations);
    }

    @PostMapping
    public ResponseEntity<Object> createReservation(@Valid @RequestBody ReservationDto reservationDto) {
        try {
            ReservationDto reservation = reservationService.createReservation(reservationDto);
            return new ResponseEntity<>(reservation, HttpStatus.CREATED);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateReservation(@PathVariable Long id, @Valid @RequestBody ReservationDto reservationDto) {
        try {
            ReservationDto reservation = reservationService.updateReservation(id, reservationDto);
            return ResponseEntity.ok(reservation);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteReservation(@PathVariable Long id) {
        try {
            reservationService.deleteReservation(id);
            return ResponseEntity.status(200).body("Reservation with ID " + id + " successfully deleted");
        } catch (NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
}
