package com.quest_ai.server.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        String token = null;
        String username = null;
        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            username = jwtTokenProvider.getUsernameFromToken(token);
        }
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtTokenProvider.validateToken(token)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
/*

JwtAuthenticationFilter is a Spring Security filter that intercepts every HTTP request to the backend. Its job is to:

Extract the JWT token from the request's Authorization header.

Validate the token.

Set the authenticated user in the Spring Security context if the token is valid.

This allows your application to recognize which user is making the request, based on the JWT, for all protected routes.

2. Workflow with Example
Step-by-step:
Client Request Example

The client sends an HTTP request with an Authorization header containing the JWT:
The client sends an HTTP request with an Authorization header containing the JWT:

text
GET /api/user/profile HTTP/1.1
Host: example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
Filter Intercepts the Request

The filter is invoked before the request reaches your controller.

It checks for the Authorization header.

If the header starts with "Bearer ", it extracts the token.

Token Processing

The filter uses JwtTokenProvider.getUsernameFromToken(token) to extract the username from the JWT.

If a username is found and the user is not already authenticated, it loads the user's details from the database (via CustomUserDetailsService).

It then validates the token with jwtTokenProvider.validateToken(token).

Authentication

If the token is valid, it creates a UsernamePasswordAuthenticationToken and sets it in the SecurityContextHolder.

This tells Spring Security that the user is authenticated for this request.

Continue the Filter Chain

The filter then calls filterChain.doFilter(request, response); to pass control to the next filter or the controller.

3. What is the format of the request?
HTTP Header Example:

text
Authorization: Bearer <JWT_TOKEN>
Sample cURL:

bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6..." https://example.com/api/user/profile
4. How is the request processed in this file?
Extracts the JWT from the Authorization header.

Parses the username from the JWT.

Checks if the user is already authenticated.

Loads user details from the database.

Validates the JWT.

Sets the authentication in the security context.

5. What response is sent back?
The filter itself does not send a response.

If the JWT is valid, the request continues to the controller, which generates the response.

If the JWT is invalid or missing, the filter does not set the authentication, and downstream filters or security handlers (like an AuthenticationEntryPoint) will send a 401 Unauthorized response.

6. How does the filter work? Where does control go after this?
The filter runs once per request (since it extends OncePerRequestFilter).

If authentication is successful, the request proceeds to the next filter, and eventually to the controller.

If authentication is not set (token missing/invalid), the request continues, but security checks later may block access.

7. When is this file/class invoked?
Automatically invoked by Spring Security for every incoming HTTP request, as part of the security filter chain.

It is registered as a bean via @Component.

8. Summary Table
Step	What Happens
1. Client sends request	With Authorization: Bearer <token> header
2. Filter intercepts	Extracts and validates JWT
3. User authenticated	If valid, sets authentication in SecurityContextHolder
4. Filter chain continues	Passes request to next filter/controller
5. Response sent	Controller sends response if authenticated, else 401 Unauthorized elsewhere
9. Diagram
text
Client
  |
  v
[JwtAuthenticationFilter] --(valid token)--> [SecurityContext updated] --> [Controller]
  |                                              |
  |                                              v
  --(invalid/missing token)------------------> [Spring Security: 401 Unauthorized]
In summary:
This filter authenticates users for every request using JWT.

It doesn't generate a response itself, but sets up the security context for the rest of the application.

If authentication fails, Spring Security will handle the error response (usually 401 Unauthorized).

If you want to see the code's flow for a specific request or error scenario, let me know!

explain the following in more detail "If the token is valid, it creates a UsernamePasswordAuthenticationToken and sets it in the SecurityContextHolder."
explain the following in more detail "If the token is valid, it creates a UsernamePasswordAuthenticationToken and sets it in the SecurityContextHolder."
Absolutely! Let’s break down this critical step in Spring Security JWT authentication:

What does this mean?
"If the token is valid, it creates a UsernamePasswordAuthenticationToken and sets it in the SecurityContextHolder."

1. UsernamePasswordAuthenticationToken
This is a standard Spring Security object representing an authenticated user.

It holds:

The principal (the UserDetails object, which contains username, password, roles, etc.)

The credentials (usually null after authentication, since we don't need the password anymore)

The authorities (the user's roles/permissions)

2. SecurityContextHolder
This is a thread-local container that holds security information for the current request.

When you set an Authentication object here, Spring Security treats the user as authenticated for this request (and any code downstream can access the user's identity and roles).

Detailed Workflow in Your Filter
a. Token Extraction and Validation
The filter pulls the JWT from the Authorization header.

It parses the username from the token.

It checks if there is already an authenticated user in the SecurityContextHolder.

It loads user details from the database (or another source).

It validates the token (checks signature, expiration, etc).

b. Creating the Authentication Object
java
UsernamePasswordAuthenticationToken authToken =
    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
userDetails: The loaded user info (username, roles, etc).

null: No password needed, as authentication is via JWT.

userDetails.getAuthorities(): The user's roles/permissions.

c. Setting Authentication Details
java
authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
Attaches extra details about the request (like IP, session ID) to the authentication object.

d. Storing in SecurityContextHolder
java
SecurityContextHolder.getContext().setAuthentication(authToken);
This registers the user as authenticated for the rest of the request's lifecycle.

Any part of your code (controllers, services, etc.) can now use:

java
Authentication auth = SecurityContextHolder.getContext().getAuthentication();
to get the current user's details.

Why is this important?
Spring Security uses the SecurityContextHolder to check if a user is authenticated and what authorities they have.

By setting the UsernamePasswordAuthenticationToken there, you enable all downstream code (controllers, services, etc.) to trust that the user is authenticated and to know their roles.

Example: End-to-End
Client Request

text
GET /api/user/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
Filter extracts and validates JWT

Finds username in JWT: "alice"

Loads UserDetails for "alice"

Validates JWT (signature, expiration, etc.)

Creates Authentication Token

java
UsernamePasswordAuthenticationToken(authenticatedUser, null, [ROLE_USER])
Sets in SecurityContextHolder

Now, SecurityContextHolder knows the request is from "alice".

Controller Access

Any controller can now use:

java
@AuthenticationPrincipal UserDetails user
or

java
Authentication auth = SecurityContextHolder.getContext().getAuthentication();
And get "alice"’s info and roles.

Summary Table
Step	What Happens
JWT validated	User identity proven
UsernamePasswordAuthenticationToken	Created with user info and roles
Set in SecurityContextHolder	Spring Security treats request as authenticated
Controller/Service access	Can get user info/roles from security context
In short:
This step is what tells Spring Security, "This request is from a real, authenticated user. Trust the JWT, and let the user access protected resources according to their roles."
 */

