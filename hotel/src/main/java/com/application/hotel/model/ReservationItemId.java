package com.application.hotel.model;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ReservationItemId implements Serializable {
    private Long reservationId;
    private Long itemNumber;

    public ReservationItemId() {
    }

    public ReservationItemId(Long reservationId, Long itemNumber) {
        this.reservationId = reservationId;
        this.itemNumber = itemNumber;
    }

    public Long getReservationId() {
        return reservationId;
    }

    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }

    public Long getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(Long itemNumber) {
        this.itemNumber = itemNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ReservationItemId)) return false;
        ReservationItemId that = (ReservationItemId) o;
        return Objects.equals(getReservationId(), that.getReservationId()) &&
                Objects.equals(getItemNumber(), that.getItemNumber());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getReservationId(), getItemNumber());
    }

}
