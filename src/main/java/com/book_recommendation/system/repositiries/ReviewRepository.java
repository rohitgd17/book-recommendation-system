package com.book_recommendation.system.repositiries;
import org.springframework.data.jpa.repository.JpaRepository;

import com.book_recommendation.system.entities.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
