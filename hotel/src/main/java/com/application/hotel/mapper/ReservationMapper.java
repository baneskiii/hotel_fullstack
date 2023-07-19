package com.application.hotel.mapper;

import com.application.hotel.dto.ReservationDto;
import com.application.hotel.model.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ReservationMapper {

    @Mappings({
        @Mapping(source = "guest", target = "guestDto")
    })
    ReservationDto entityToDto(Reservation reservation);

    @Mappings({
        @Mapping(source = "guestDto", target = "guest")
    })
    Reservation dtoToEntity(ReservationDto reservationDto);
}
