package com.application.hotel.mapper;

import com.application.hotel.dto.CityDto;
import com.application.hotel.model.City;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CityMapper {
    CityDto entityToDto(City city);

    City dtoToEntity(CityDto cityDto);

}
