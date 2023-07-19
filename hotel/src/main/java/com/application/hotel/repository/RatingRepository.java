package com.application.hotel.repository;

import com.application.hotel.model.Rating;
import com.application.hotel.model.RatingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, RatingId> {
}
