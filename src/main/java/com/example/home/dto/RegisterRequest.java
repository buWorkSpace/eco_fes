package com.example.home.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {

    @JsonProperty("user")
    private List<UserDto> user;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserDto {
        @JsonProperty("id")
        private String id;

        @JsonProperty("ps")
        private String ps;

        @JsonProperty("nic")
        private String nic;

        @JsonProperty("phone")
        private String phone;
    }
}
