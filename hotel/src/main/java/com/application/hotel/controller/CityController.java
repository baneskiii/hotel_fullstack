/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.application.hotel.controller;

import com.application.hotel.dto.CityDto;
import com.application.hotel.service.CityService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *
 * @author Bane
 */
@RestController
@RequestMapping("/cities")
@CrossOrigin("*")
public class CityController {

    private final CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping()
    public ResponseEntity<List<CityDto>> getAllCities() {
        List<CityDto> cities = cityService.getAllCities();
        return ResponseEntity.ok(cities);
    }


    @PostMapping()
    public ResponseEntity<CityDto> createCity(@Valid @RequestBody CityDto cityDto){
        CityDto city = cityService.createCity(cityDto);
        return new ResponseEntity<>(city, HttpStatus.CREATED);
    }
}
