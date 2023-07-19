package com.application.hotel.controller;

import com.application.hotel.dto.RoomDto;
import com.application.hotel.exception.NotFoundException;
import com.application.hotel.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@CrossOrigin("*")
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<Object> getAllRooms(){
        List<RoomDto> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getRoomById(@PathVariable Long id){
        try{
            RoomDto room = roomService.getRoomById(id);
            return ResponseEntity.ok(room);
        } catch (NotFoundException ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @GetMapping("/byFloor")
    public ResponseEntity<Object> getRoomsByFloor(@RequestParam int floor){
        List<RoomDto> rooms = roomService.getRoomsByFloor(floor);
        return ResponseEntity.ok(rooms);
    }

    @PostMapping
    public ResponseEntity<Object> createRoom(@Valid @RequestBody RoomDto roomDto){
        try {
            RoomDto room = roomService.createRoom(roomDto);
            return new ResponseEntity<>(room, HttpStatus.CREATED);
        } catch (NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateRoom(@PathVariable Long id, @Valid @RequestBody RoomDto roomDto){
        try {
            RoomDto room = roomService.updateRoom(id, roomDto);
            return ResponseEntity.ok(room);
        } catch (NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteRoom(@PathVariable Long id) {
        try {
            roomService.deleteRoom(id);
            return ResponseEntity.status(200).body("Room with ID " + id + " successfully deleted");
        } catch (NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
}
