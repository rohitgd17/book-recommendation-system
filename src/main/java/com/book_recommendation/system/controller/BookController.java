package com.book_recommendation.system.controller;
import java.security.Principal;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.book_recommendation.system.entities.Book;
import com.book_recommendation.system.entities.User;
import com.book_recommendation.system.repositiries.UserRepository;
import com.book_recommendation.system.service.CustomUserDetailsService;
import com.book_recommendation.system.service.GoogleBooksService;

@RestController
@RequestMapping("/api/books")
public class BookController {
	
	private User user;
	private UserRepository userRepository;
	private CustomUserDetailsService userService;
	
	@Autowired
    private GoogleBooksService googleBooksService;

    @GetMapping("/fetch")
    public String fetchBooks(@RequestParam String genre, @RequestParam String apiKey) {
    	System.out.println("fetchBooks endpoint hit");
        return googleBooksService.getBooksByGenre(genre, apiKey);
    }
	
    
	@GetMapping()
	public ResponseEntity<List<Book>> getAllBooks()
	{
		List<Book> books = List.of(
			    new Book(1L, "The Alchemist", "Paulo Coelho", "Fiction", "A novel about a young shepherd's journey to find treasure.", 4.7, "https://example.com/alchemist.jpg"),
			    new Book(2L, "1984", "George Orwell", "Dystopian", "A novel about a totalitarian regime that uses surveillance to control its citizens.", 4.8, "https://example.com/1984.jpg"),
			    new Book(3L, "To Kill a Mockingbird", "Harper Lee", "Classic", "A novel about racial injustice in the Deep South.", 4.9, "https://example.com/mockingbird.jpg")
			);

		System.out.println("Books List: " + books); 
		System.out.println("zzzzzzzzzzzzzzz"); 
		return ResponseEntity.ok(books);
	}
	
	@GetMapping("/fav_genere")
	public ResponseEntity<Set<String>> getFavoriteGenres(Principal principal)
	{
		try {
			String email=principal.getName();
			Set<String> favoriteGenres=userService.getFavoriteGenres(email);
			return ResponseEntity.ok(favoriteGenres);
		}
		catch(Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptySet());
		}
	}
	
}
