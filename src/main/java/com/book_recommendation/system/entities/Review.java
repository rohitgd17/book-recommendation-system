package com.book_recommendation.system.entities;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Book book;

    private int rating;
    private String reviewText;
    private LocalDateTime dateCreated;

    // Getters and Setters
}
