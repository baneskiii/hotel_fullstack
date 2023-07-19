package com.application.hotel.repository;

import com.application.hotel.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT r FROM Reservation r ORDER BY r.dateFrom ASC")
    List<Reservation> findAllOrderByDateFrom();

    List<Reservation> findByDateFrom(LocalDate dateFrom);
    @Query("SELECT MAX(r.id) FROM Reservation r")
    Long findMaxId();
}
