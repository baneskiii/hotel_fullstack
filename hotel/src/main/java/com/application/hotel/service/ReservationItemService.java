package com.application.hotel.service;

import com.application.hotel.dto.ReservationItemDto;
import com.application.hotel.exception.NotFoundException;

import java.util.List;

public interface ReservationItemService {

    List<ReservationItemDto> getReservationItemsByReservationId(Long id);

}
