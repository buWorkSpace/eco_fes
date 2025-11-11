/* 회원가입 완료 페이지 (Popup) */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignupComplete.css";
import Header from "../components/Header";

import back1 from "../assets/images/back1.png";   // 그라데이션 배경
import signupOk from "../assets/images/signup-ok.png"; //회원가입 완료 이미지(새싹)

const SignupComplete = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="login-background">
        {/* 배경 이미지 */}
        <img src={back1} alt="" className="back1" />

        {/* 완료 팝업 */}
        <div className="signup-complete-popup">
          <h2>가입완료</h2>
          <p>가입이 완료되었습니다. <br />
          나눔으로 환경을 지켜보세요!
          </p>
          <img
            src={signupOk}
            alt="회원가입 완료 일러스트"
            className="signup-complete-img"
          />
          <div className="complete-actions">
            <button
              type="button"
              className="complete-btn ghost"
              onClick={() => navigate("/")}
            >
              시작하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupComplete;