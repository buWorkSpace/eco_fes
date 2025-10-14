import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "../components/Header";
import proto from "../assets/data/proto.json";

import back from "../assets/images/login-back.png"; //그라데이션
import back2 from "../assets/images/login-back2.png"; //데코레이션
import loginPop from "../assets/images/login-popup.png"; //로그인 팝업 이미지

import eye from "../assets/icons/eye.png"; //비번 보이게 하는 아이콘

import kakaoicon from "../assets/icons/kakaoicon.png"; //연동로그인 아이콘
import googleicon from "../assets/icons/googleicon.png"; //연동로그인 아이콘
import navericon from "../assets/icons/navericon.png"; //연동로그인 아이콘




const Login = () => {

  const [id, setId] = useState("");
  const [ps, setPs] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // 비밀번호 input을 직접 참조하기 위한 ref
  const pwRef = useRef(null);

  // 비밀번호 가시성 토글
  const togglePw = () => {
    if (!pwRef.current) return;
    pwRef.current.type = pwRef.current.type === "password" ? "text" : "password";
  };

  // 프로토타입 JSON으로 임시 로그인 검사
  const handleLogin = (e) => {
    e.preventDefault();
    setMsg("");

    const user = proto.user.find(u => u.id === id && u.ps === ps);

    if (user) {
      localStorage.setItem("authUser", JSON.stringify({
        recog_id: user.recog_id,
        id: user.id,
        nic: user.nic,
        token: "MOCK_TOKEN"
      }));
      navigate("/home");
    } 
  };

  

  return (
    <>
      <Header />
      <div className="login-background">
        {/* 배경 두 장 */}
        <img src={back} alt="gradient bg" className="bg-gradient" />
        <img src={back2} alt="decor bg" className="bg-decor" />

        {/* 로그인 팝업 */}
        <div className="login-popup">
          {/* 왼쪽 절반: 이미지 */}
          <section className="login-popup-left" aria-hidden="true">
            <img src={loginPop} alt="Eco Festa Login Visual" className="brand-image" />
          </section>

          {/* 오른쪽 절반: 로그인 폼 */}
          <section className="login-popup-right">
            <h2>로그인</h2>
            <p>우리는 환경을 생각하는 축제를 만듭니다.</p>

            <div className="login-bottom">
              <form onSubmit={handleLogin}>
                <label htmlFor="login-id">아이디</label>
                <input
                  id="login-id"
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />

                <label htmlFor="login-password">비밀번호</label>
                <div className="password-field">
                  <input
                    id="login-password"
                    type="password"
                    ref={pwRef}
                    value={ps}
                    onChange={(e) => setPs(e.target.value)}
                  />
                  <img
                    src={eye}
                    alt="비밀번호 표시"
                    className="toggle-password"
                    onClick={togglePw}
                  />
                </div>

                <button type="submit" className="login-btn">로그인</button>
              </form>

            {/* 연동로그인 */}
            <div className="social-title">연동 로그인</div>

            <div className="social-buttons">
              <button type="button" className="social-btn-kakao">
                <img src={kakaoicon} alt="카카오 로그인" />
              </button>
              <button type="button" className="social-btn-naver">
                <img src={navericon} alt="네이버 로그인" />
              </button>
              <button type="button" className="social-btn-google">
                <img src={googleicon} alt="구글 로그인" />
              </button>
            </div>

          </div>

          </section>
        </div>
      </div>
    </>
  );
};

export default Login;