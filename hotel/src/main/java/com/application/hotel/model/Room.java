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
@Table(name = "room")
public class Room implements ApplicationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int floor;
    private boolean status;
    
    @ManyToOne(fetch = FetchType.LAZY)
    private RoomType roomType;

    public Room() {
    }

    public Room(Long id, int floor, boolean status, RoomType roomType) {
        this.id = id;
        this.floor = floor;
        this.status = status;
        this.roomType = roomType;
    }

    public RoomType getRoomType() {
        return roomType;
    }

    public void setRoomType(RoomType roomType) {
        this.roomType = roomType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getFloor() {
        return floor;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 47 * hash + Objects.hashCode(this.id);
        hash = 47 * hash + this.floor;
        hash = 47 * hash + (this.status ? 1 : 0);
        hash = 47 * hash + Objects.hashCode(this.roomType);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Room other = (Room) obj;
        if (this.floor != other.floor) {
            return false;
        }
        if (this.status != other.status) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return Objects.equals(this.roomType, other.roomType);
    }

    @Override
    public String toString() {
        return "RoomEntity{" + "id=" + id + ", floor=" + floor + ", status=" + status + ", roomType=" + roomType + '}';
    }
    
    
    
}
