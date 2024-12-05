package com.book_recommendation.system.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.*;
import java.util.function.Function;
import java.util.Base64;

@Component
public class JwtUtil {

    // Base64 encoded secret key
    private final String SECRET_KEY = "dAkrPByZSKsKZ1NRpgJHYYmvXM4tfhAG2cvALRzhQPs=";
    
    
    // Method to generate the JWT
    public String generateToken(String username) {
    	System.out.println("xxxxxxxxxxxxxxxxxxxxxxxxx");
        SecretKey key = new SecretKeySpec(Base64.getDecoder().decode(SECRET_KEY), SignatureAlgorithm.HS256.getJcaName());

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))  // 10 hours
                .signWith(key)  // Use the SecretKey
                .compact();
    }

    // Validate the token
    public Boolean validateToken(String token, String username) {
        String extractedUsername = extractUsername(token);
        System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        System.out.println(extractedUsername);
        return (username.equals(extractedUsername) && !isTokenExpired(token));
    }

    // Extract username from token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Check if token is expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extract expiration date from token
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Extract claims
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Parse all claims using the new API
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Base64.getDecoder().decode(SECRET_KEY))  // Decode the SECRET_KEY string to get the key
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

	public boolean validateToken(String jwtToken, UserDetails userDetails) {
		// TODO Auto-generated method stub
		return false;
	}
}
