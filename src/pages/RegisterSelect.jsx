//물품등록 방식 선택 페이지 (물품등록)

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterSelect.css";
import Header from "../components/Header";

import back from "../assets/images/login-back.png"; // 그라데이션 배경
import back3 from "../assets/images/back3.png"; // 물품등록 데코 배경

import recipt from "../assets/images/recipt.png"; //영수증 등록
import pen from "../assets/images/pen.png"; //수기 등록


const RegisterSelect = () => {
    const navigate = useNavigate();
  
  return (
    <>
    <Header />

    <div className="login-background">
        {/* 배경 두 장 */}
        <img src={back} alt="gradient bg" className="bg-gradient" />
        <img src={back3} alt="decor bg" className="bg-decor" />

    <div className="register-select">
      <h2>물품 등록하기</h2>

      <div className="popup-container">
        <div className="popup-left">
          <p>영수증을 업로드하면, <br />
          자동으로 물품을 등록해 드려요.</p>
          <img
            src={recipt}
            alt="영수증 등록"
            className="recipt-img"
          />
          <button
              type="button"
              className="recipt-go-btn"
              // 영수증 등록 페이지 만들고 경로 변경해야함 (현재 메인페이지로 연결 됨)
              onClick={() => navigate("/")}
            >
              영수증으로 등록
            </button>
        </div>

        <div className="popup-right">
          <p>물품 정보를 하나씩 직접 <br />
          입력해 주세요.</p>
           <img
            src={pen}
            alt="수기 등록"
            className="pen-img"
          />
          <button
              type="button"
              className="pen-go-btn"
              // 수기 등록 페이지 만들고 경로 변경해야함!
              onClick={() => navigate("/")}
            >
              수기로 등록
            </button>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default RegisterSelect;