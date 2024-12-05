package com.book_recommendation.system.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.book_recommendation.system.security.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity (adjust for production)
            .cors(cors -> cors.configurationSource(request -> {
                var corsConfig = new org.springframework.web.cors.CorsConfiguration();
                corsConfig.addAllowedOrigin("http://localhost:3000"); // Allow React frontend
                corsConfig.addAllowedMethod("*"); // Allow all HTTP methods
                corsConfig.addAllowedHeader("*");
                corsConfig.setAllowCredentials(true);// Allow all headers
                return corsConfig;
            })) // Enable CORS
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/api/books/**").permitAll() // Public access
                .requestMatchers("/api/admin/**").hasRole("ADMIN") // Admin-only endpoints
                .anyRequest().authenticated() // Secure all other endpoints
            )
            .httpBasic(Customizer.withDefaults())
            .formLogin(form -> form.disable())
            .httpBasic().disable(); // Disable default HTTP Basic authentication
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
