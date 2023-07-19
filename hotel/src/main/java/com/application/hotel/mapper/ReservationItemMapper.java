package com.application.hotel.mapper;

import com.application.hotel.dto.ReservationItemDto;
import com.application.hotel.model.ReservationItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ReservationItemMapper {
    @Mappings({
            @Mapping(source = "guest", target = "guestDto"),
            @Mapping(source = "room", target = "roomDto")
    })
    ReservationItemDto entityToDto(ReservationItem reservationItem);

    @Mappings({
        @Mapping(source = "guestDto", target = "guest"),
        @Mapping(source = "roomDto", target = "room")
    })
    ReservationItem dtoToEntity(ReservationItemDto reservationItemDto);
}
