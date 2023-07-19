package com.application.hotel.service.impl;

import com.application.hotel.dto.RoomTypeDto;
import com.application.hotel.mapper.RoomTypeMapper;
import com.application.hotel.model.RoomType;
import com.application.hotel.repository.RoomTypeRepository;
import com.application.hotel.service.RoomTypeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomTypeServiceImpl implements RoomTypeService {
    private final RoomTypeRepository roomTypeRepository;
    private final RoomTypeMapper roomTypeMapper;

    public RoomTypeServiceImpl(RoomTypeRepository roomTypeRepository, RoomTypeMapper roomTypeMapper) {
        this.roomTypeRepository = roomTypeRepository;
        this.roomTypeMapper = roomTypeMapper;
    }

    @Override
    public List<RoomTypeDto> getAllRoomTypes() {
        List<RoomType> roomTypes = roomTypeRepository.findAll();
        return roomTypes.stream().map((roomType) -> roomTypeMapper.entityToDto(roomType))
                .collect(Collectors.toList());
    }
}
