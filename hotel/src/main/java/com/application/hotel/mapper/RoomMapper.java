package com.application.hotel.mapper;

import com.application.hotel.dto.RoomDto;
import com.application.hotel.model.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomMapper {

    @Mapping(source = "roomType", target = "roomTypeDto")
    RoomDto entityToDto(Room room);

    @Mapping(source = "roomTypeDto", target = "roomType")
    Room dtoToEntity(RoomDto roomDto);

}
