package com.book_recommendation.system.entities;

import jakarta.persistence.*;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String genre;

    @Column(length = 1000)
    private String description;

    private double rating;
    private String coverImageUrl;

    // Constructor initializing all fields
    public Book(Long id, String title, String author, String genre, String description, double rating, String coverImageUrl) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.description = description;
        this.rating = rating;
        this.coverImageUrl = coverImageUrl;
    }

    // Default constructor for JPA
    public Book() {
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }
}
