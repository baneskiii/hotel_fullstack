package com.application.hotel.mapper;

import com.application.hotel.dto.RatingDto;
import com.application.hotel.model.Rating;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface RatingMapper {
    @Mappings({
            @Mapping(source = "guest", target = "guestDto"),
            @Mapping(source = "room", target = "roomDto"),
    })
    RatingDto entityToDto(Rating rating);
    @Mappings({
            @Mapping(source = "guestDto", target = "guest"),
            @Mapping(source = "roomDto", target = "room"),
    })
    Rating dtoToEntity(RatingDto ratingDto);
}
