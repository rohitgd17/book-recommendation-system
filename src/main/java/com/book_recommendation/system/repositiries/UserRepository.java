package com.book_recommendation.system.repositiries;

import org.springframework.data.jpa.repository.JpaRepository;
import com.book_recommendation.system.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // Custom query method to find a user by email
}
