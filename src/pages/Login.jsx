//로그인

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "../components/Header";

import back1 from "../assets/images/back1.png"
import loginPop from "../assets/images/login-popup.png"; 

import eye from "../assets/icons/eye.png"; 

import kakaoicon from "../assets/icons/kakaoicon.png"; 
import googleicon from "../assets/icons/googleicon.png"; 
import navericon from "../assets/icons/navericon.png"; 

// 백엔드 URL이 확정되면 변경
const API_BASE_URL = "http://localhost:8080"; 
const LOGIN_ENDPOINT = "/api/main/user/login";



const Login = () => {

  const [id, setId] = useState("");
  const [ps, setPs] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const pwRef = useRef(null);

  const togglePw = () => {
    if (!pwRef.current) return;
    pwRef.current.type = pwRef.current.type === "password" ? "text" : "password";
  };

  // 로그인: 백엔드 API 호출 로직
  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const fullUrl = API_BASE_URL + LOGIN_ENDPOINT; 
      
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: [
            {
              recog_id: 1000, 
              id: id,         
              ps: ps          
            }
          ]
        })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authUser", JSON.stringify(data));
        navigate("/");
      } else {
        // 서버에서 응답은 왔으나 로그인 실패 처리된 경우 (400, 401 등)
        setMsg("로그인 실패 (아이디/비밀번호 확인)");
      }
    } catch (err) {
      // 네트워크 연결 실패 또는 서버 다운 등의 경우
      setMsg("서버 연결에 실패했습니다. (URL 및 서버 상태 확인 필요)");
    }
  };

  
  return (
    <>
      <Header />
      <div className="login-background">
        <img src={back1} className="back1" alt="" />

        <div className="login-popup">
          <section className="login-popup-left" aria-hidden="true">
            <img src={loginPop} alt="Eco Festa Login Visual" className="brand-image" />
          </section>

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
              
            <div className="error-message">{msg}</div> {/* 로그인 실패 메시지 표시 */}


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