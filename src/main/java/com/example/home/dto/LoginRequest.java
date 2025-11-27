package com.example.home.dto;

import lombok.Data;
import java.util.List;

@Data
public class LoginRequest {
    private List<UserDto> user;

    @Data
    public static class UserDto {
        private String id;
        private String ps;
    }
}
