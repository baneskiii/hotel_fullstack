package com.application.hotel.service.impl;

import com.application.hotel.dto.GuestDto;
import com.application.hotel.exception.NotFoundException;
import com.application.hotel.mapper.GuestMapper;
import com.application.hotel.model.City;
import com.application.hotel.model.Guest;
import com.application.hotel.repository.CityRepository;
import com.application.hotel.repository.GuestRepository;
import com.application.hotel.service.GuestService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GuestServiceImpl implements GuestService {

    private final GuestRepository guestRepository;
    private final CityRepository cityRepository;
    private final GuestMapper guestMapper;

    public GuestServiceImpl(GuestRepository guestRepository, CityRepository cityRepository, GuestMapper guestMapper) {
        this.guestRepository = guestRepository;
        this.cityRepository = cityRepository;
        this.guestMapper = guestMapper;
    }


    @Override
    public List<GuestDto> getAllGuests() {
        List<Guest> guests = guestRepository.findAllOrderByFirstName();
        return guests.stream().map((guest) -> guestMapper.entityToDto(guest))
                .collect(Collectors.toList());
    }

    @Override
    public GuestDto getGuestById(Long id) throws NotFoundException {
        Optional<Guest> guest = guestRepository.findById(id);
        if (!guest.isPresent()) {
            throw new NotFoundException("Guest with ID " + id + " not found");
        }
        return guestMapper.entityToDto(guest.get());
    }

    @Override
    public List<GuestDto> getGuestsByFirstNameAndLastName(String firstName, String lastName){
        List<Guest> guests = guestRepository.findByFirstNameAndLastName(firstName, lastName);
        return guests.stream().map((guest) -> guestMapper.entityToDto(guest))
                .collect(Collectors.toList());
    }

    @Override
    public GuestDto createGuest(GuestDto guestDto) throws NotFoundException {
        City city = cityRepository.findById(guestDto.getCityDto().getId())
                .orElseThrow(() -> new NotFoundException("City with ID " + guestDto.getCityDto().getId() + " not found"));

        Guest guest = guestMapper.dtoToEntity(guestDto);
        guest.setCity(city);

        return guestMapper.entityToDto(guestRepository.save(guest));

    }

    @Override
    public GuestDto updateGuest(Long id, GuestDto guestDto) throws NotFoundException {
        Optional<Guest> guestOptional = guestRepository.findById(id);
        if (!guestOptional.isPresent()) {
            throw new NotFoundException("Guest with ID " + id + " not found");
        }

        Guest guest = guestOptional.get();
        City city = cityRepository.findById(guestDto.getCityDto().getId())
                .orElseThrow(() -> new NotFoundException("City with ID " + guestDto.getCityDto().getId() + " not found"));
        guest.setId(id);
        guest.setFirstName(guestDto.getFirstName());
        guest.setLastName(guestDto.getLastName());
        guest.setBirthdate(guestDto.getBirthdate());
        guest.setCity(city);
        return guestMapper.entityToDto(guestRepository.save(guest));
    }

    @Override
    public void deleteGuest(Long id) throws NotFoundException {
        Optional<Guest> guestOptional = guestRepository.findById(id);
        if (!guestOptional.isPresent()) {
            throw new NotFoundException("Guest with ID " + id + " not found");
        }
        guestRepository.delete(guestOptional.get());
    }
}
