package com.stock_exchange.stock_exchange.auth.utilities;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtility jwtUtility;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        boolean isAuthorized = false;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("auth_token".equals(cookie.getName())) {
                    String token = cookie.getValue();
                    if (token == null || token.isEmpty()) {
                        if (request.getRequestURI().contains("/api/v1/auth/")) {
                            filterChain.doFilter(request, response);
                            return;
                        } else {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.getWriter().write("Unauthorized");
                            response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
                            response.setHeader("Access-Control-Allow-Credentials", "true");
                            return;
                        }
                    }
                    String username = jwtUtility.extractUsername(token);
                    if (username != null && jwtUtility.isTokenValid(token, username)) {
                        PreAuthenticatedAuthenticationToken authentication =
                                new PreAuthenticatedAuthenticationToken(username, null, null);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
