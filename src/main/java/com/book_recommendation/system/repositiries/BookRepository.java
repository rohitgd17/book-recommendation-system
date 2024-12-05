package com.book_recommendation.system.repositiries;
import org.springframework.data.jpa.repository.JpaRepository;

import com.book_recommendation.system.entities.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
}
