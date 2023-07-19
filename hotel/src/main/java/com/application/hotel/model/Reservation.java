/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.application.hotel.model;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Objects;

/**
 *
 * @author Bane
 */
@Entity
@Table(name = "reservation")
public class Reservation implements ApplicationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateFrom;
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateTo;
    @ManyToOne(fetch = FetchType.LAZY)
    private Guest guest;

    public Reservation() {}

    public Reservation(Long id, LocalDate dateFrom, LocalDate dateTo, Guest guest) {
        this.id = id;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.guest = guest;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public void setDateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
    }

    public Guest getGuest() {
        return guest;
    }

    public void setGuest(Guest guest) {
        this.guest = guest;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 59 * hash + Objects.hashCode(this.id);
        hash = 59 * hash + Objects.hashCode(this.dateFrom);
        hash = 59 * hash + Objects.hashCode(this.dateTo);
        hash = 59 * hash + Objects.hashCode(this.guest);
        return hash;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Reservation that = (Reservation) o;

        if (!Objects.equals(id, that.id)) return false;
        if (!Objects.equals(dateFrom, that.dateFrom)) return false;
        if (!Objects.equals(dateTo, that.dateTo)) return false;
        return Objects.equals(guest, that.guest);
    }

    @Override
    public String toString() {
        return "ReservationEntity{" + "id=" + id + ", dateFrom=" + dateFrom + ", dateTo=" + dateTo + ", guest=" + guest + '}';
    }
    

    
}
