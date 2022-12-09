package config.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import config.security.TokenInfo;
import config.security.handlers.ApiAuthFailureHandler;
import config.security.handlers.ApiAuthSuccessHandler;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import models.LoginCredentials;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

import java.util.List;
import java.util.stream.Collectors;

public class JwtAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private String jwtKey;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
                                   String url, String jwtKey) {

        super(url);

        setAuthenticationManager(authenticationManager);
        setAuthenticationSuccessHandler(new ApiAuthSuccessHandler());
        setAuthenticationFailureHandler(new ApiAuthFailureHandler());

        setSecurityContextRepository(new HttpSessionSecurityContextRepository());

        this.jwtKey = jwtKey;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) {

        var objMapper = new ObjectMapper();

        String json;
        LoginCredentials loginCredentials;

        try {
            json = request.getReader().lines().collect(Collectors.joining(""));
            loginCredentials = objMapper.readValue(json, LoginCredentials.class);
        } catch (Exception e) {
            throw new BadCredentialsException("", e);
        }


        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(
                        loginCredentials.getUserName(),
                        loginCredentials.getPassword());

        return getAuthenticationManager().authenticate(token);
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain, Authentication authResult) {

        User user = (User) authResult.getPrincipal();

        List<String> roles = user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        String token = new JwtHelper(jwtKey)
                .encode(new TokenInfo(user.getUsername(), roles));

        response.addHeader("Authorization", "Bearer " + token);
    }
}
