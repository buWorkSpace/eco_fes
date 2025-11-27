package com.example.home;

import com.example.home.dto.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/main/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.getUser() == null || request.getUser().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "user 배열을 전달해주세요"));
        }

        LoginRequest.UserDto dto = request.getUser().get(0);

        if (dto.getId() == null || dto.getPs() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "아이디와 비밀번호를 확인해주세요"));
        }

        User user = userService.login(dto.getId(), dto.getPs());

        if (user != null) {
            return ResponseEntity.ok(user); // 실제 서비스에서는 JWT 반환
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(Map.of("message", "로그인 실패: 아이디 또는 비밀번호 확인"));
        }
    }
}
