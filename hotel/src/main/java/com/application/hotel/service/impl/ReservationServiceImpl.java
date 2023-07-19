package com.application.hotel.service.impl;

import com.application.hotel.dto.ReservationDto;
import com.application.hotel.dto.ReservationItemDto;
import com.application.hotel.dto.RoomDto;
import com.application.hotel.exception.NotFoundException;
import com.application.hotel.mapper.ReservationItemMapper;
import com.application.hotel.mapper.ReservationMapper;
import com.application.hotel.model.*;
import com.application.hotel.repository.GuestRepository;
import com.application.hotel.repository.ReservationItemRepository;
import com.application.hotel.repository.ReservationRepository;
import com.application.hotel.repository.RoomRepository;
import com.application.hotel.service.ReservationService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final GuestRepository guestRepository;
    private final RoomRepository roomRepository;
    private final ReservationItemRepository reservationItemRepository;
    private final ReservationMapper reservationMapper;
    private final ReservationItemMapper reservationItemMapper;

    public ReservationServiceImpl(ReservationRepository reservationRepository, GuestRepository guestRepository, RoomRepository roomRepository, ReservationItemRepository reservationItemRepository, ReservationMapper reservationMapper, ReservationItemMapper reservationItemMapper) {
        this.reservationRepository = reservationRepository;
        this.guestRepository = guestRepository;
        this.roomRepository = roomRepository;
        this.reservationItemRepository = reservationItemRepository;
        this.reservationMapper = reservationMapper;
        this.reservationItemMapper = reservationItemMapper;
    }

    @Override
    public List<ReservationDto> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAllOrderByDateFrom();
        return reservations.stream().map((reservation) -> reservationMapper.entityToDto(reservation))
                .collect(Collectors.toList());
    }

    @Override
    public ReservationDto getReservationById(Long id) throws NotFoundException {
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        if (!reservationOptional.isPresent()) {
            throw new NotFoundException("Reservation with ID " + id + " not found");
        }
        List<ReservationItemDto> reservationItemDtos = reservationItemRepository.findAllByReservationId(id)
                .stream().map((item) -> reservationItemMapper.entityToDto(item))
                .collect(Collectors.toList());
        ReservationDto reservation = reservationMapper.entityToDto(reservationOptional.get());
        reservation.setReservationItemsDtos(reservationItemDtos);

        return reservation;
    }

    @Override
    public List<ReservationDto> getReservationsByDateFrom(LocalDate dateFrom) {
        List<Reservation> reservations = reservationRepository.findByDateFrom(dateFrom);
        return reservations.stream().map((reservation) -> reservationMapper.entityToDto(reservation))
                .collect(Collectors.toList());
    }

    @Override
    public ReservationDto createReservation(ReservationDto reservationDto) throws RuntimeException {

        for(ReservationItemDto item : reservationDto.getReservationItemsDtos()){
            Room room = roomRepository.findById(item.getRoomDto().getId())
                    .orElseThrow(() -> new NotFoundException("Room with ID " + item.getRoomDto().getId() + " not found"));
            boolean exceeds = trackGuests(reservationDto, room);
            if(exceeds) {
                throw new RuntimeException("Number of beds exceeded");
            }
        }

        Guest guest = guestRepository.findById(reservationDto.getGuestDto().getId())
                .orElseThrow(() -> new NotFoundException("Guest with ID " + reservationDto.getGuestDto().getId() + " not found"));
        Reservation reservation = reservationMapper.dtoToEntity(reservationDto);
        reservation.setGuest(guest);

        Reservation savedReservation = reservationRepository.save(reservation);

        for (ReservationItemDto item : reservationDto.getReservationItemsDtos()) {
            Guest guestItem = guestRepository.findById(item.getGuestDto().getId())
                    .orElseThrow(() -> new NotFoundException("Guest with ID " + item.getGuestDto().getId() + " not found"));

            Room room = roomRepository.findById(item.getRoomDto().getId())
                    .orElseThrow(() -> new NotFoundException("Room with ID " + item.getRoomDto().getId() + " not found"));
            room.setStatus(true);
            roomRepository.save(room);
            ReservationItem reservationItem = reservationItemMapper.dtoToEntity(item);
            Long id = reservationRepository.findMaxId();
            reservationItem.setId(new ReservationItemId(id, reservationItem.getItemNumber()));
            reservationItem.setReservation(new Reservation());
            reservationItem.getReservation().setId(id);
            reservationItem.setGuest(guestItem);
            reservationItem.setRoom(room);
            reservationItemRepository.save(reservationItem);
        }

        return reservationMapper.entityToDto(savedReservation);
    }


    @Override
    public ReservationDto updateReservation(Long id, ReservationDto reservationDto) throws RuntimeException {

        for(ReservationItemDto item : reservationDto.getReservationItemsDtos()){
            Room room = roomRepository.findById(item.getRoomDto().getId())
                    .orElseThrow(() -> new NotFoundException("Room with ID " + item.getRoomDto().getId() + " not found"));
            boolean exceeds = trackGuests(reservationDto, room);
            if(exceeds) {
                throw new RuntimeException("Number of beds exceeded");
            }
        }

        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        if (!reservationOptional.isPresent()) {
            throw new NotFoundException("Reservation with ID " + id + " not found");
        }

        Reservation reservation = reservationOptional.get();
        Guest guest = guestRepository.findById(reservationDto.getGuestDto().getId())
                .orElseThrow(() -> new NotFoundException("Guest with ID " + reservationDto.getGuestDto().getId() + " not found"));
        reservation.setId(id);
        reservation.setDateFrom(reservationDto.getDateFrom());
        reservation.setDateTo(reservationDto.getDateTo());
        reservation.setGuest(guest);

        Reservation savedReservation = reservationRepository.save(reservation);

        List<ReservationItem> itemsInDatabase = reservationItemRepository.findAllByReservationId(id);
        for (ReservationItem i : itemsInDatabase) {
            Room room = i.getRoom();
            room.setStatus(false);
            roomRepository.save(room);
        }

        for (ReservationItemDto itemDto : reservationDto.getReservationItemsDtos()) {
            Optional<ReservationItem> reservationItemOptional = reservationItemRepository.findById(new ReservationItemId(id, itemDto.getItemNumber()));
            if (!reservationItemOptional.isPresent()) {
                throw new NotFoundException("Reservation item with reservation ID " + id + " and item number " + itemDto.getItemNumber() + " not found");
            }

            ReservationItem item = reservationItemOptional.get();
            Guest guestItem = guestRepository.findById(itemDto.getGuestDto().getId())
                    .orElseThrow(() -> new NotFoundException("Guest with ID " + itemDto.getGuestDto().getId() + " not found"));
            Room roomItem = roomRepository.findById(itemDto.getRoomDto().getId())
                    .orElseThrow(() -> new NotFoundException("Room with ID " + itemDto.getRoomDto().getId() + " not found"));
            roomItem.setStatus(true);
            roomRepository.save(roomItem);

            item.setId(new ReservationItemId(id, itemDto.getItemNumber()));
            item.setReservation(reservation);
            item.setItemNumber(itemDto.getItemNumber());
            item.setGuest(guestItem);
            item.setRoom(roomItem);
            reservationItemRepository.save(item);
        }


        return reservationMapper.entityToDto(savedReservation);
    }

    @Override
    public void deleteReservation(Long id) throws NotFoundException {
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        if (!reservationOptional.isPresent()) {
            throw new NotFoundException("Reservation with ID " + id + " not found");
        }
        List<ReservationItem> reservationItems = reservationItemRepository.findAllByReservationId(id);
        for (ReservationItem item : reservationItems) {
            Room room = item.getRoom();
            room.setStatus(false);
            roomRepository.save(room);
            reservationItemRepository.delete(item);
        }
        reservationRepository.delete(reservationOptional.get());
    }

    public boolean trackGuests(ReservationDto reservationDto, Room room){
        int totalGuests = 0;
        boolean exceeds = false;

        for(ReservationItemDto item : reservationDto.getReservationItemsDtos()){
            RoomDto roomDto = item.getRoomDto();
            if(roomDto.getId() == room.getId()){
                totalGuests++;
            }
        }

        if(totalGuests > room.getRoomType().getBeds()){
            exceeds = true;
        }
        return exceeds;
    }

}
