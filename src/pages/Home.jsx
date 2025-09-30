//메인화면
import React from "react";
import "./Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import banner from "../assets/images/home_banner.png";
import ArrowRightIcon from "../assets/icons/arrow-right.png";
import { useNavigate } from "react-router-dom";



const Home = () => {
        const navigate = useNavigate();

  return (
    <>
      <Header />

      {/* 배너 */}
      <section className="banner">
        <img
          src={banner}
          alt="메인 배너"
          className="banner-img"
        />

        <div className="banner-text">
          <h1>함께 나누는 축제,</h1>
          <h1>Eco Festa.</h1>
          <p>
            환경을 생각하는 천안권 축제 음식 나눔 플랫폼 에코페스타<br />
            남은 음식을 나누고 새로운 기쁨을 만들어보세요!
          </p>
          <button onClick={() => navigate("/Signup")} className="sign-go">회원가입 하러가기 
              <img src={ArrowRightIcon} alt="화살표 아이콘" className="arrow-icon" />
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};


export default Home;
