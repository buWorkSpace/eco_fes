// 회원가입

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Header from "../components/Header";
import proto from "../assets/data/proto.json";

import eye from "../assets/icons/eye.png"; // 비번 표시 아이콘

import box from '../assets/icons/box.png';   // 체크박스 아이콘
import check from '../assets/icons/check.png';

import kakaoicon from "../assets/icons/kakaoicon.png";
import googleicon from "../assets/icons/googleicon.png";
import navericon from "../assets/icons/navericon.png";
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


  // 회원가입 처리 (프로토 + 로컬 병합 후 중복 체크)
  const handleSignup = (e) => {
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

    // 기존 사용자 리스트: proto.user + localStorage('users')
    const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const baseUsers = Array.isArray(proto?.user) ? proto.user : [];
    const allUsers = [...baseUsers, ...localUsers];

    // 중복 검사: 아이디/전화번호 중복 불가
    // const dupId = allUsers.some((u) => u.id === form.id);
    // if (dupId) return setMsg("이미 사용 중인 아이디입니다.");

    // const phoneDigits = form.phone.replace(/\D/g, "");
    // const dupPhone = allUsers.some((u) => (u.phone || "").replace(/\D/g, "") === phoneDigits);
    // if (dupPhone) return setMsg("이미 등록된 전화번호입니다.");

    // 신규 사용자 레코드 생성 (임시 recog_id)
    const newUser = {
      recog_id: Date.now(), // 간단한 임시 키
      id: form.id,
      ps: form.ps,
      nic: form.nic,
      phone: form.phone,
    };

    // 로컬 사용자 배열에 추가 저장h
    const nextLocal = [...localUsers, newUser];
    localStorage.setItem("users", JSON.stringify(nextLocal));

    // 자동 로그인 처리 및 이동
    localStorage.setItem("authUser", JSON.stringify({
      recog_id: newUser.recog_id,
      id: newUser.id,
      nic: newUser.nic,
      token: "MOCK_TOKEN"
    }));

    navigate("/signup-complete");
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
                <img src={box} alt="박스" className="box-img"/>
                
                <img src={check} alt="체크" className={`check-img ${form.terms ? "visible" : ""}`}/>
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