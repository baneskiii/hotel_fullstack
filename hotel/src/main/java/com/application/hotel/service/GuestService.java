package com.application.hotel.service;

import com.application.hotel.dto.GuestDto;
import com.application.hotel.exception.NotFoundException;

import java.util.List;

public interface GuestService {

    public List<GuestDto> getAllGuests();

    public GuestDto getGuestById(Long id) throws NotFoundException;

    public List<GuestDto> getGuestsByFirstNameAndLastName(String firstName, String lastName);

    public GuestDto createGuest(GuestDto guestDto) throws NotFoundException;

    public GuestDto updateGuest(Long id, GuestDto guestDto) throws NotFoundException;

    public void deleteGuest(Long id) throws NotFoundException;

}
