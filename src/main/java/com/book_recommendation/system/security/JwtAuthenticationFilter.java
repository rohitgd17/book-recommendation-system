//package com.book_recommendation.system.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//import java.io.IOException;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import io.jsonwebtoken.ExpiredJwtException;
//import io.jsonwebtoken.MalformedJwtException;
//
//@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//    private Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @Autowired
//    private UserDetailsService userDetailsService; // Fetch user details
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain) throws ServletException, IOException {
//
//        String authHeader = request.getHeader("Authorization");
//        logger.info("Header: {}", authHeader);
//
//        String email = null;
//        String jwt = null;
//
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            jwt = authHeader.substring(7); // Extract token from header
//            try {
//                email = jwtUtil.extractUsername(jwt); // Extract username (email)
//            } catch (IllegalArgumentException e) {
//                logger.error("Illegal argument while fetching username from token", e);
//            } catch (ExpiredJwtException e) {
//                logger.error("JWT token is expired", e);
//            } catch (MalformedJwtException e) {
//                logger.error("Malformed JWT token", e);
//            } catch (Exception e) {
//                logger.error("An error occurred while processing the JWT token", e);
//            }
//        } else {
//            logger.warn("Invalid or missing Authorization header");
//        }
//
//        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
//
//            if (jwtUtil.validateToken(jwt, userDetails.getUsername())) { // Validate token
//                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//                        userDetails, null, userDetails.getAuthorities());
//                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(authToken);
//                logger.info("User authenticated successfully: {}", email);
//            } else {
//                logger.info("JWT validation failed for user: {}", email);
//            }
//        }
//
//        filterChain.doFilter(request, response); // Continue the filter chain
//    }
//}


package com.book_recommendation.system.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService; // Fetch user details

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        System.out.println("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
        if (authHeader != null) {
//            String jwt = authHeader.substring(7); // Extract token from header
        	String jwt = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
            String email = jwtUtil.extractUsername(jwt); // Extract username (email)

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                
                if (jwtUtil.validateToken(jwt, userDetails.getUsername())) { // Validate token
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }

        filterChain.doFilter(request, response); // Continue the filter chain
    }
    
}
