/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.application.hotel.service.impl;



import com.application.hotel.dto.CityDto;
import com.application.hotel.mapper.CityMapper;
import com.application.hotel.model.City;
import com.application.hotel.repository.CityRepository;
import com.application.hotel.service.CityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 *
 * @author Bane
 */
@Service
public class CityServiceImpl implements CityService {

    private final CityRepository cityRepository;
    private final CityMapper cityMapper;

    public CityServiceImpl(CityRepository cityRepository, CityMapper cityMapper) {
        this.cityRepository = cityRepository;
        this.cityMapper = cityMapper;
    }

    @Override
    public List<CityDto> getAllCities() {
        List<City> cities = cityRepository.findAll();
        return cities.stream().map((city) -> cityMapper.entityToDto(city))
                .collect(Collectors.toList());
    }

    @Override
    public CityDto createCity(CityDto cityDto) {
        City city = cityMapper.dtoToEntity(cityDto);
        return cityMapper.entityToDto(cityRepository.save(city));
    }

}
