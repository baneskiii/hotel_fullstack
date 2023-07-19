/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.application.hotel.service;

import com.application.hotel.dto.CityDto;

import java.util.List;

/**
 *
 * @author Bane
 */
public interface CityService {

    CityDto createCity(CityDto city);

    List<CityDto> getAllCities();
}
