package com.application.hotel.controller;

import com.application.hotel.dto.RatingDto;
import com.application.hotel.exception.NotFoundException;
import com.application.hotel.service.RatingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ratings")
@CrossOrigin("*")
public class RatingController {
    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    public ResponseEntity<Object> createRating(@Valid @RequestBody RatingDto ratingDto) {
        try {
            RatingDto rating = ratingService.createRating(ratingDto);
            return new ResponseEntity<>(rating, HttpStatus.CREATED);
        } catch (NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
}
