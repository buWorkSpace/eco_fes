package com.example.home;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")  // MySQL 테이블 이름
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @Column(name = "recog_id")
    private Long recogId;   // JSON의 recog_id

    @Column(name = "user_id", nullable = false, length = 50, unique = true)
    private String userId;  // JSON의 id

    @Column(name = "ps", nullable = false, length = 100)
    private String password; // JSON의 ps

    @Column(name = "nic", nullable = false, length = 50)
    private String nickname; // JSON의 nic
}
