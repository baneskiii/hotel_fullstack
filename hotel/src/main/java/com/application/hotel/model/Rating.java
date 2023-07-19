/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.application.hotel.model;

import jakarta.persistence.*;

import java.util.Objects;

/**
 *
 * @author Bane
 */
@Entity
@Table(name = "rating")
public class Rating implements ApplicationEntity{

    @EmbeddedId
    private RatingId id;
    @MapsId("guestId")
    @ManyToOne(fetch = FetchType.LAZY)
    private Guest guest;
    @MapsId("roomId")
    @ManyToOne(fetch = FetchType.LAZY)
    private Room room;
    private int rating;

    public Rating() {
    }

    public Rating(RatingId id, Guest guest, Room room, int rating) {
        this.id = id;
        this.guest = guest;
        this.room = room;
        this.rating = rating;
    }

    public RatingId getId() {
        return id;
    }

    public void setId(RatingId id) {
        this.id = id;
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

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
