package com.application.hotel.mapper;

import com.application.hotel.dto.GuestDto;
import com.application.hotel.model.Guest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GuestMapper {

    @Mapping(source = "city", target = "cityDto")
    GuestDto entityToDto(Guest guest);

    @Mapping(source = "cityDto", target = "city")
    Guest dtoToEntity(GuestDto guestDto);

}
