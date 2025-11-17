// 회원가입

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Header from "../components/Header";

import eye from "../assets/icons/eye.png"; // 비번 표시 아이콘

import box from '../assets/icons/box.png';   // 체크박스 아이콘
import check from '../assets/icons/check.png';

import kakaoicon from "../assets/icons/kakaoicon.png";
import googleicon from "../assets/icons/googleicon.png";
import navericon from "../assets/icons/navericon.png";

// API 주소 변수화: URL 확정 시 이 값만 변경
const API_BASE_URL = "http://localhost:8080"; 
const REGISTER_ENDPOINT = "/api/main/user/register";

const Signup = () => {
  const navigate = useNavigate();

  // 닉네임, 전화번호, 아이디, 비밀번호, 비밀번호 확인
  const [form, setForm] = useState({
    nic: "",
    phone: "",
    id: "",
    ps: "",
    ps2: "",
    terms: false, 
  });

  const [msg, setMsg] = useState("");
  const pwRef = useRef(null);
  const pw2Ref = useRef(null);

  // 전화번호 포맷터 010-0000-0000
  const formatPhone = (v) => {
    const digits = v.replace(/\D/g, "").slice(0, 11);
    if (digits.length < 4) return digits;
    if (digits.length < 8) return `${digits.slice(0,3)}-${digits.slice(3)}`;
    return `${digits.slice(0,3)}-${digits.slice(3,7)}-${digits.slice(7)}`;
  };

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setForm((f) => ({ ...f, phone: formatPhone(value) }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  // 비밀번호 가시성 토글
  const togglePw = (field) => {
    const el = field === "ps2" ? pw2Ref.current : pwRef.current;
    if (!el) return;
    el.type = el.type === "password" ? "text" : "password";
  };


  // 회원가입 처리 (API 호출)
  const handleSignup = async (e) => {
    e.preventDefault();
    setMsg("");

    // 필수값 누락 검사
    const missing = [];
    if (!form.nic.trim()) missing.push("닉네임");
    if (!form.phone.trim()) missing.push("전화번호");
    if (!form.id.trim()) missing.push("아이디");
    if (!form.ps.trim()) missing.push("비밀번호");
    if (!form.ps2.trim()) missing.push("비밀번호 확인");

    if (missing.length > 0) {
      setMsg(`${missing[0]}을(를) 입력해 주세요.`);
      return;
    }

    // 비밀번호 일치 검사
    if (form.ps !== form.ps2) {
      setMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 이용약관 동의 여부
    if (!form.terms) {
      setMsg("이용약관에 동의해 주세요.");
      return;
    }

    // API 요청 payload (명세서 구조 준수)
    const payload = {
      user: [
        {
          recog_id: 1000,
          id: form.id,
          ps: form.ps,
          nic: form.nic,
          // 전화번호(phone) 필요하면 추가
        }
      ]
    };

    try {
      const fullUrl = API_BASE_URL + REGISTER_ENDPOINT; 
      
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        navigate("/signup-complete");
      } else {
        const errorData = await response.json();
        setMsg(errorData.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      setMsg("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Header />
      <div className="login-background">

        {/* 회원가입 팝업 */}
        <div className="signup-popup">
            <h2>회원가입</h2>
            <p>회원정보를 입력해주세요.</p>

          <div className="signup-bottom">
            <form onSubmit={handleSignup}>
              <label htmlFor="signup-nic">닉네임</label>
              <input
                id="signup-nic"
                name="nic"
                type="text"
                value={form.nic}
                onChange={handleChange}
              />

              <label htmlFor="signup-phone">전화번호</label>
              <input
                id="signup-phone"
                name="phone"
                type="text"
                inputMode="numeric"
                maxLength={13}
                value={form.phone}
                onChange={handleChange}
              />

              <label htmlFor="signup-id">아이디</label>
              <input
                id="signup-id"
                name="id"
                type="text"
                value={form.id}
                onChange={handleChange}
              />

              <label htmlFor="signup-ps">비밀번호</label>
              <div className="password-field">
                <input
                  id="signup-ps"
                  name="ps"
                  type="password"
                  ref={pwRef}
                  value={form.ps}
                  onChange={handleChange}
                />
                <img
                  src={eye}
                  alt="비밀번호 표시"
                  className="toggle-password"
                  onClick={() => togglePw("ps")}
                />
              </div>

              <label htmlFor="signup-ps2">비밀번호 확인</label>
              <div className="password-field2">

              <input
                id="signup-ps2"
                name="ps2"
                type="password"
                ref={pw2Ref}
                value={form.ps2}
                onChange={handleChange}
              />
                <img
                  src={eye}
                  alt="비밀번호 표시"
                  className="toggle-password2"
                  onClick={() => togglePw("ps2")}
                />
                </div>

              {msg && <div className="form-msg">{msg}</div>}

             <div className="terms" onClick={() => setForm({ ...form, terms: !form.terms })}>
              <div className="checkbox">
                <img src={box} alt="이용약관 동의 체크박스" className="box-img"/>
                
                <img src={check} alt="체크 표시" className={`check-img ${form.terms ? "visible" : ""}`}/>
              </div>
              <span>이용약관에 동의합니다.</span>
            </div>

              <button type="submit" className="signup-btn">가입하기</button>
            </form>



            {/* 연동 회원가입 */}
            <div className="sign-social-title">연동 회원가입</div>
            <div className="sign-social-buttons">
              <button type="button" className="sign-social-btn-kakao">
                <img src={kakaoicon} alt="카카오 회원가입" />
              </button>
              <button type="button" className="sign-social-btn-naver">
                <img src={navericon} alt="네이버 회원가입" />
              </button>
              <button type="button" className="sign-social-btn-google">
                <img src={googleicon} alt="구글 회원가입" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;