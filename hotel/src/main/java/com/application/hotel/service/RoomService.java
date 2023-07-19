package com.application.hotel.service;

import com.application.hotel.dto.RoomDto;
import com.application.hotel.exception.NotFoundException;

import java.util.List;

public interface RoomService {
    public List<RoomDto> getAllRooms();

    public RoomDto getRoomById(Long id) throws NotFoundException;

    public List<RoomDto> getRoomsByFloor(int floor);

    public RoomDto createRoom(RoomDto roomDto) throws NotFoundException;

    public RoomDto updateRoom(Long id, RoomDto roomDto) throws NotFoundException;

    public void deleteRoom(Long id) throws NotFoundException;
}
