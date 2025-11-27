package com.example.home;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user") // 기존 DB에 맞춰 바꾸세요 (혹은 "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    // 프론트에서 recog_id 안 보낸다면 서버에서 자동 생성 PK 사용
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq")
    private Long userSeq;

    // 로그인 아이디
    @Column(name = "id", nullable = false, length = 100, unique = true)
    private String userId;      // repository에서 existsByUserId 를 위해 이 이름으로 둠

    @Column(name = "ps", nullable = false, length = 255)
    private String password;

    @Column(name = "nic", nullable = false, length = 100)
    private String nickname;

    @Column(name = "recog_id")
    private Long recogId; // optional: 기존에 사용하던 필드가 필요하면 유지

    @Column(name = "phone", length = 20)
    private String phone;
}
