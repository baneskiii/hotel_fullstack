package com.application.hotel.service;

import com.application.hotel.dto.RatingDto;
import com.application.hotel.exception.NotFoundException;

public interface RatingService {

    public RatingDto createRating(RatingDto ratingDto) throws NotFoundException;

}
