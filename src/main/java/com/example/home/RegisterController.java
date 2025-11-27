package com.example.home;

import com.example.home.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/main/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class RegisterController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        List<RegisterRequest.UserDto> list = request.getUser();

        if (list == null || list.isEmpty()) {
            return ResponseEntity.badRequest().body(java.util.Map.of("message", "user 배열을 전달해 주세요."));
        }

        RegisterRequest.UserDto dto = list.get(0);

        if (dto.getId() == null || dto.getPs() == null || dto.getNic() == null) {
            return ResponseEntity.badRequest().body(java.util.Map.of("message", "필수 항목 누락"));
        }

        try {
            // 프론트에서 recog_id가 없으므로 userService.registerUser(String...)
            User saved = userService.registerUser(
                    dto.getId(),
                    dto.getPs(),
                    dto.getNic(),
                    dto.getPhone()
            );

            return ResponseEntity.ok(java.util.Map.of("message", "회원가입 성공", "userSeq", saved.getUserSeq()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("message", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(java.util.Map.of("message", "서버 오류"));
        }
    }
    
}
