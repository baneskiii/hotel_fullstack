package com.application.hotel.controller;

import com.application.hotel.dto.GuestDto;
import com.application.hotel.exception.NotFoundException;
import com.application.hotel.service.GuestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/guests")
@CrossOrigin("*")
public class GuestController {

    private final GuestService guestService;

    public GuestController(GuestService guestService) {
        this.guestService = guestService;
    }

    @GetMapping
    public ResponseEntity<Object> getAllGuests() {
        List<GuestDto> guests = guestService.getAllGuests();
        return ResponseEntity.ok(guests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getGuestById(@PathVariable Long id) {
        try {
            GuestDto guest = guestService.getGuestById(id);
            return ResponseEntity.ok(guest);
        } catch (NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
    @GetMapping("/byName")
    public ResponseEntity<Object> getGuestsByFirstNameAndLastName(@RequestParam String firstName, @RequestParam String lastName){
        List<GuestDto> guests = guestService.getGuestsByFirstNameAndLastName(firstName, lastName);
        return ResponseEntity.ok(guests);
    }

    @PostMapping
    public ResponseEntity<Object> createGuest(@Valid @RequestBody GuestDto guestDto) {
        try {
            GuestDto guest = guestService.createGuest(guestDto);
            return new ResponseEntity<>(guest, HttpStatus.CREATED);
        } catch (NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateGuest(@PathVariable Long id, @Valid @RequestBody GuestDto guestDto) {
        try {
            GuestDto guest = guestService.updateGuest(id, guestDto);
            return ResponseEntity.ok(guest);
        } catch (NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteGuest(@PathVariable Long id) {
        try {
            guestService.deleteGuest(id);
            return ResponseEntity.status(200).body("Guest with ID " + id + " successfully deleted");
        } catch (NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
}
