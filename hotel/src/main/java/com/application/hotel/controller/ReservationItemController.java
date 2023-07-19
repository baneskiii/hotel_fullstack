package com.application.hotel.controller;

import com.application.hotel.dto.ReservationItemDto;
import com.application.hotel.mapper.ReservationMapper;
import com.application.hotel.service.ReservationItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservationItems")
@CrossOrigin("*")
public class ReservationItemController {
    private final ReservationItemService reservationItemService;
    private final ReservationMapper reservationMapper;

    public ReservationItemController(ReservationItemService reservationItemService, ReservationMapper reservationMapper) {
        this.reservationItemService = reservationItemService;
        this.reservationMapper = reservationMapper;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getReservationItemByReservationId(@PathVariable Long id) {
        List<ReservationItemDto> reservationItems = reservationItemService.getReservationItemsByReservationId(id);
        return ResponseEntity.ok(reservationItems);
    }

}
