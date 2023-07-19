package com.application.hotel.repository;

import com.application.hotel.model.ReservationItem;
import com.application.hotel.model.ReservationItemId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationItemRepository extends JpaRepository<ReservationItem, ReservationItemId> {

    List<ReservationItem> findAllByReservationId(Long reservationId);
}
