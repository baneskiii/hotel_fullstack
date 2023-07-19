package com.application.hotel.mapper;

import com.application.hotel.dto.RoomTypeDto;
import com.application.hotel.model.RoomType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoomTypeMapper {
    RoomTypeDto entityToDto(RoomType roomType);

    RoomType dtoToEntity(RoomTypeDto roomTypeDto);
}
