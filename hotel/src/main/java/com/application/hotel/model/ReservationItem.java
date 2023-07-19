/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.application.hotel.model;

import jakarta.persistence.*;

/**
 *
 * @author Bane
 */
@Entity
@Table(name = "reservationitem")
public class ReservationItem implements ApplicationEntity {

    @EmbeddedId
    private ReservationItemId id;
    @MapsId("reservationId")
    @ManyToOne(fetch = FetchType.LAZY)
    private Reservation reservation;
    @Column(insertable = false, updatable = false)
    private Long itemNumber;
    @ManyToOne(fetch = FetchType.LAZY)
    private Guest guest;
    @ManyToOne(fetch = FetchType.LAZY)
    private Room room;

    public ReservationItem() {
    }

    public ReservationItem(ReservationItemId id, Reservation reservation, Long itemNumber, Guest guest, Room room) {
        this.id = id;
        this.reservation = reservation;
        this.itemNumber = itemNumber;
        this.guest = guest;
        this.room = room;
    }

    public ReservationItemId getId() {
        return id;
    }

    public void setId(ReservationItemId id) {
        this.id = id;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public Long getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(Long itemNumber) {
        this.itemNumber = itemNumber;
    }

    public Guest getGuest() {
        return guest;
    }

    public void setGuest(Guest guest) {
        this.guest = guest;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
}
