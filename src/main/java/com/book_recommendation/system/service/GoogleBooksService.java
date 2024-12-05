package com.book_recommendation.system.service;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.stereotype.Service;

@Service
public class GoogleBooksService {

//    private final String API_URL = "https://www.googleapis.com/books/v1/volumes?q=genre:{genre}&key={API_KEY}";
//
//    public String getBooksByGenre(String genre, String apiKey) {
//        RestTemplate restTemplate = new RestTemplate();
//        return restTemplate.getForObject(API_URL, String.class, genre, apiKey);
//    }
	
	public String getBooksByGenre(String genre, String apiKey) {
	    String url = UriComponentsBuilder.fromHttpUrl("https://www.googleapis.com/books/v1/volumes")
	            .queryParam("q", "genre:" + genre)
	            .queryParam("key", apiKey)
	            .toUriString();

	    RestTemplate restTemplate = new RestTemplate();
	    return restTemplate.getForObject(url, String.class);
	}
	
}
