//헤더, 네비바
import React from "react";
import "./Header.css";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
    
        <header className="header">
        {/* 로고 영역 */}
        <div className="header-logo">
            <button onClick={() => navigate("/home")} className="logo-button">
                <img src={logo} alt="EcoFesta 로고" className="logo-img" />
            </button>
        </div>

        {/* 내비게이션 메뉴 */}
        <nav className="nav">
            <button onClick={() => navigate("/items/register")}>물품 등록</button>
            <button onClick={() => navigate("/items")}>나눔 받기</button>
            <button onClick={() => navigate("/mypage/items")}>마이페이지</button>
       </nav>
        
        {/* 회원가입/로그인 버튼 */}
        <div className="auth">
            <button onClick={() => navigate("/Signup")} className="sign">회원가입</button>
            <button onClick={() => navigate("/Login")} className="login">로그인</button>
        </div>
        </header>
  );

};

export default Header;
