package com.application.hotel.service.impl;

import com.application.hotel.dto.ReservationItemDto;
import com.application.hotel.exception.NotFoundException;
import com.application.hotel.mapper.ReservationItemMapper;
import com.application.hotel.model.*;
import com.application.hotel.repository.GuestRepository;
import com.application.hotel.repository.ReservationItemRepository;
import com.application.hotel.repository.ReservationRepository;
import com.application.hotel.repository.RoomRepository;
import com.application.hotel.service.ReservationItemService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationItemServiceImpl implements ReservationItemService {
    private final ReservationItemRepository reservationItemRepository;
    private final ReservationRepository reservationRepository;
    private final GuestRepository guestRepository;
    private final RoomRepository roomRepository;
    private final ReservationItemMapper reservationItemMapper;

    public ReservationItemServiceImpl(ReservationItemRepository reservationItemRepository, ReservationRepository reservationRepository, GuestRepository guestRepository, RoomRepository roomRepository, ReservationItemMapper reservationItemMapper) {
        this.reservationItemRepository = reservationItemRepository;
        this.reservationRepository = reservationRepository;
        this.guestRepository = guestRepository;
        this.roomRepository = roomRepository;
        this.reservationItemMapper = reservationItemMapper;
    }

    @Override
    public List<ReservationItemDto> getReservationItemsByReservationId(Long id) {
        List<ReservationItem> reservationItems = reservationItemRepository.findAllByReservationId(id);
        return reservationItems.stream().map((item) -> reservationItemMapper.entityToDto(item))
                .collect(Collectors.toList());
    }
}
