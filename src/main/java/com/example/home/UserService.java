package com.example.home;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public User registerUser(String userId, String rawPassword, String nickname, String phone) {
        if (userRepository.existsByUserId(userId)) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }

        User user = User.builder()
                .userId(userId)
                .password(rawPassword) // 나중에 암호화 적용 권장
                .nickname(nickname)
                .phone(phone)
                .build();

        return userRepository.save(user);
    }

    @Transactional
    public User login(String userId, String password) {
        if (userId == null || password == null) {
            return null; // null이면 로그인 실패 처리
        }

        String trimmedId = userId.trim();
        String trimmedPw = password.trim();

        return userRepository.findByUserIdAndPassword(trimmedId, trimmedPw).orElse(null);
    }
}
