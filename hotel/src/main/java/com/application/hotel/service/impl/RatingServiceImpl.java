package com.application.hotel.service.impl;

import com.application.hotel.dto.RatingDto;
import com.application.hotel.exception.NotFoundException;
import com.application.hotel.mapper.RatingMapper;
import com.application.hotel.model.Guest;
import com.application.hotel.model.Rating;
import com.application.hotel.model.RatingId;
import com.application.hotel.model.Room;
import com.application.hotel.repository.GuestRepository;
import com.application.hotel.repository.RatingRepository;
import com.application.hotel.repository.RoomRepository;
import com.application.hotel.service.RatingService;
import org.springframework.stereotype.Service;

@Service
public class RatingServiceImpl implements RatingService {
    private RatingRepository ratingRepository;
    private GuestRepository guestRepository;
    private RoomRepository roomRepository;
    private RatingMapper ratingMapper;

    public RatingServiceImpl(RatingRepository ratingRepository, GuestRepository guestRepository, RoomRepository roomRepository, RatingMapper ratingMapper) {
        this.ratingRepository = ratingRepository;
        this.guestRepository = guestRepository;
        this.roomRepository = roomRepository;
        this.ratingMapper = ratingMapper;
    }

    @Override
    public RatingDto createRating(RatingDto ratingDto) throws NotFoundException {
        Guest guest = guestRepository.findById(ratingDto.getGuestDto().getId())
                .orElseThrow(() -> new NotFoundException("Guest with ID " + ratingDto.getGuestDto().getId() + " not found"));
        Room room = roomRepository.findById(ratingDto.getRoomDto().getId())
                .orElseThrow(() -> new NotFoundException("Room with ID " + ratingDto.getRoomDto().getId() + " not found"));
        Rating rating = ratingMapper.dtoToEntity(ratingDto);
        rating.setId(new RatingId(guest.getId(), room.getId()));
        rating.setGuest(guest);
        rating.setRoom(room);
        return ratingMapper.entityToDto(ratingRepository.save(rating));
    }
}
