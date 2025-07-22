/*
package com.quest_ai.server.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    byte[] keyBytes = Decoders.BASE64.decode("eaasfdfedgefgfe9");
    SecretKey secretKey= Jwts.SIG.HS512.key().build();
    long jwtExpirationMs=86400000;

*/
/*    // Read secret and expiration from application.properties
    public JwtTokenProvider(
            @Value("${security.jwt.token.secret-key:your-very-secure-secret-key-of-appropriate-length-and-randomness}") String secret,
            @Value("${security.jwt.token.expire-length:86400000}") long validityInMilliseconds
    ) {
        // For HS512, the key must be at least 64 bytes (512 bits)
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.secretKey =
        this.jwtExpirationMs = validityInMilliseconds;
    }*//*


    // Generate JWT token for a given username
    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .subject(username)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    // Extract username from JWT token
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    }

    // Validate the JWT token
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            throw new AuthenticationCredentialsNotFoundException("Invalid JWT signature or token format.");
        } catch (ExpiredJwtException e) {
            throw new AuthenticationCredentialsNotFoundException("Expired JWT token.");
        } catch (UnsupportedJwtException e) {
            throw new AuthenticationCredentialsNotFoundException("Unsupported JWT token.");
        } catch (IllegalArgumentException e) {
            throw new AuthenticationCredentialsNotFoundException("JWT token compact of handler are invalid.");
        }
    }
}

*/
