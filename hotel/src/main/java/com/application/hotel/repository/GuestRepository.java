package com.application.hotel.repository;

import com.application.hotel.model.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Long> {
    @Query("SELECT g FROM Guest g ORDER BY g.firstName ASC")
    List<Guest> findAllOrderByFirstName();
    List<Guest> findByFirstNameAndLastName(String firstName, String lastName);
}
