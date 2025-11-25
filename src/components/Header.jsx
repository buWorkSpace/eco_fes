//헤더, 네비바
import React from "react";
import "./Header.css";
import logo from "../assets/images/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleNavClick = (path) => {
        navigate(path);
    };

    return (
    
        <header className="header">

        <div className="header-logo">
            <button onClick={() => navigate("/")} className="logo-button">
                <img src={logo} alt="EcoFesta 로고" className="logo-img" />
            </button>
        </div>

        <nav className="nav">
            <button 
                onClick={() => handleNavClick("/register-select")} 
                className={pathname === "/register-select" ? "active" : ""}
            >
                물품 등록
            </button>
            <button 
                onClick={() => handleNavClick("/items")} 
                className={pathname === "/ItemList" ? "active" : ""}
            >
                나눔 받기
            </button>
            <button 
                onClick={() => handleNavClick("/mypage")} 
                className={pathname === "/mypage" ? "active" : ""}
            >
                마이페이지
            </button>
       </nav>
        
        <div className="auth">
            <button onClick={() => navigate("/Signup")} className="sign">회원가입</button>
            <button onClick={() => navigate("/Login")} className="login">로그인</button>
        </div>
        </header>
  );

};

export default Header;
