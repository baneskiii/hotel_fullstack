package com.application.hotel.service.impl;

import com.application.hotel.dto.RoomDto;
import com.application.hotel.exception.NotFoundException;
import com.application.hotel.mapper.RoomMapper;
import com.application.hotel.model.Room;
import com.application.hotel.model.RoomType;
import com.application.hotel.repository.RoomRepository;
import com.application.hotel.repository.RoomTypeRepository;
import com.application.hotel.service.RoomService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final RoomMapper roomMapper;

    public RoomServiceImpl(RoomRepository roomRepository, RoomTypeRepository roomTypeRepository, RoomMapper roomMapper) {
        this.roomRepository = roomRepository;
        this.roomTypeRepository = roomTypeRepository;
        this.roomMapper = roomMapper;
    }


    @Override
    public List<RoomDto> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        return rooms.stream().map((room) -> roomMapper.entityToDto(room))
                .collect(Collectors.toList());
    }

    @Override
    public RoomDto getRoomById(Long id) throws NotFoundException {
        Optional<Room> room = roomRepository.findById(id);
        if(!room.isPresent()){
            throw new NotFoundException("Room with ID " + id + " not found");
        }
        return roomMapper.entityToDto(room.get());
    }

    @Override
    public List<RoomDto> getRoomsByFloor(int floor) {
        List<Room> rooms = roomRepository.findByFloor(floor);
        return rooms.stream().map((room) -> roomMapper.entityToDto(room))
                .collect(Collectors.toList());
    }

    @Override
    public RoomDto createRoom(RoomDto roomDto) throws NotFoundException {
        RoomType roomType = roomTypeRepository.findById(roomDto.getRoomTypeDto().getId())
                .orElseThrow(() -> new NotFoundException("Room type with ID " + roomDto.getRoomTypeDto().getId() + " not found"));

        Room room = roomMapper.dtoToEntity(roomDto);
        room.setRoomType(roomType);
        return roomMapper.entityToDto(roomRepository.save(room));
    }

    @Override
    public RoomDto updateRoom(Long id, RoomDto roomDto) throws NotFoundException {
        Optional<Room> roomOptional = roomRepository.findById(id);
        if(!roomOptional.isPresent()){
            throw new NotFoundException("Room with ID " + id + " not found");
        }
        Room room = roomOptional.get();
        RoomType roomType = roomTypeRepository.findById(roomDto.getRoomTypeDto().getId())
                .orElseThrow(() -> new NotFoundException("Room type with ID " + roomDto.getRoomTypeDto().getId() + " not found"));
        room.setId(id);
        room.setFloor(roomDto.getFloor());
        room.setStatus(roomDto.isStatus());
        room.setRoomType(roomType);
        return roomMapper.entityToDto(roomRepository.save(room));
    }

    @Override
    public void deleteRoom(Long id) throws NotFoundException {
        Optional<Room> roomOptional = roomRepository.findById(id);
        if(!roomOptional.isPresent()){
            throw new NotFoundException("Room with ID " + id + " not found");
        }
        roomRepository.delete(roomOptional.get());
    }
}
