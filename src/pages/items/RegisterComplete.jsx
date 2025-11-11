// 등록완료 안내 페이지
import React from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterComplete.css";
import Header from "../../components/Header";

import back1 from "../../assets/images/back1.png";   // 그라데이션 배경
import signupOk from "../../assets/images/register-complete.png"; //회원가입 완료 이미지(새싹)

const RegisterComplete = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="login-background">
        {/* 배경 이미지 */}
        <img src={back1} alt="" className="back1" />

        {/* 완료 팝업 */}
        <div className="signup-complete-popup">
          <h2>등록완료</h2>
          <p>당신의 작은 나눔이 <br />
          큰 기쁨이 됩니다!
          </p>
          <img
            src={signupOk}
            alt="등록완료 일러스트"
            className="signup-complete-img"
          />
          <div className="complete-actions">
            <button
              type="button"
              className="complete-btn ghost"
              onClick={() => navigate("/")}
            >
              메인화면으로 가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterComplete;