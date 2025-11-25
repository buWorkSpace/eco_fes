// pages/MyPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";
import Header from "../components/Header";
import MyPageBannerImage from "../assets/images/mypage_banner.png"; 

// API 통신 기준 URL
const API_BASE_URL = "http://localhost:8080"; 

//백엔드 연결하면 더미 데이터 삭제
const DUMMY_USER_INFO = {
  nickname: "민주님",
  tradeCount: 2,
  visitCount: 101,
  monthsSinceJoin: 6,
  profileImage: "/assets/images/sample-profile.jpg", 
};

const DUMMY_REG_LIST = [
  { id: 1, name: "과일과 샐러드 10인분", status: "등록 물품", timeAgo: "1시간전", location: "백석동", imageUrl: "/assets/images/sample-item-1.jpg" },
  { id: 2, name: "소떡소떡 3개", status: "거래완료", timeAgo: "3시간전", location: "백석동", imageUrl: "/assets/images/sample-item-2.jpg" },
  { id: 3, name: "찐 고구마 2개", status: "거래완료", timeAgo: "4주전", location: "백석동", imageUrl: "/assets/images/sample-item-3.jpg" },
];
// -------------------------------



const MyPage = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [regiList, setRegiList] = useState([]); 

  const ProductItem = ({ item }) => {
    const handleClick = () => {
      navigate(`/product/${item.id}`); 
    };
      
    return (
      <div className="product-item" onClick={handleClick}> 
        <div className="product-image-container">
          <img src={item.imageUrl} alt={item.name} className="product-image" />
          {item.status === "거래완료" && (
            <div className="transaction-complete-overlay">거래완료</div>
          )}
        </div>
        <div className="product-info">
          <p className="product-name">{item.name}</p>
          <div className="product-meta">
            <span className="product-location">{item.location}</span>
            <span>{item.timeAgo}</span>
          </div>
          <p className="product-status-text">{item.status}</p> 
        </div>
      </div>
    );
  };




  //API 엔드포인트 적용
  useEffect(() => {
    const fetchMyPageData = async () => {
      try {
        // 1. 사용자 정보 가져오기 (GET: /api/mypage/user_info)
        const userRes = await fetch(`${API_BASE_URL}/api/mypage/user_info`);
        
        if (userRes.ok) {
            const realUserData = await userRes.json();
            setUserInfo(realUserData); 
        } else {
            console.error("사용자 정보 로드 실패. DUMMY 데이터 사용.");
            setUserInfo(DUMMY_USER_INFO);
        }

        // 2. 등록 물품 목록 가져오기 (GET: /api/mypage/regi_list)
        const regiRes = await fetch(`${API_BASE_URL}/api/mypage/regi_list`);
        if (regiRes.ok) {
            const realRegiData = await regiRes.json();
            setRegiList(realRegiData.obj || realRegiData); 
        } else {
            console.error("등록 물품 목록 로드 실패. DUMMY 데이터 사용.");
            setRegiList(DUMMY_REG_LIST);
        }

      } catch (error) {
        console.error("네트워크 에러 발생:", error);
        // 네트워크 연결 자체에 문제가 있을 경우, 더미 데이터로 대체
        setUserInfo(DUMMY_USER_INFO);
        setRegiList(DUMMY_REG_LIST);
      }
    };

    fetchMyPageData();
  }, []); // 빈 배열: 컴포넌트가 처음 마운트될 때 한 번만 실행


  const handleEditProfile = () => {
    navigate("/edit-profile"); 
  };
  
  if (!userInfo) {
    return (
      <>
        <Header />
        <div className="mypage-container loading">데이터를 로드 중입니다...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="mypage-container">
        
        {/* 배너 영역 */}
        <div className="mypage-banner-area">
          <img 
            src={MyPageBannerImage} 
            alt="마이페이지 배너" 
            className="mypage-banner-image" 
          />
          <p className="banner-text-position banner-subtitle">홈 &gt; 마이페이지</p>
        </div>

        {/* 프로필 및 통계 정보 섹션 */}
        <div className="mypage-profile-section">
          <div className="profile-image-wrapper">
            <img 
              src={userInfo.profileImage} 
              alt="프로필 이미지" 
              className="profile-image" 
            />
          </div>
          <h2 className="profile-nickname">{userInfo.nickname}</h2>
          
          {/* 닉네임 하단 구분선 */}
          <div className="nickname-divider"></div> 
          <div className="profile-stats">
            <span>거래내역 {userInfo.tradeCount}회</span>
            <span>방문수 {userInfo.visitCount}명</span>
            <span>가입한지 {userInfo.monthsSinceJoin}개월</span>
          </div>
        </div>
        
        {/* 물품 목록 섹션 */}
        <div className="mypage-content-section">
          
          <div className="list-label">등록한 물품</div>

          <div className="list-divider"></div>

          {/* 물품 목록 그리드 */}
          <div className="product-list-grid">
            {regiList.length > 0 ? (
              regiList.map((item) => (
                <ProductItem key={item.id} item={item} />
              ))
            ) : (
              <p className="no-items-message">
                등록한 물품이 없습니다.
              </p>
            )}
          </div>
        </div>
        
        {/* 나의 정보 수정하기 버튼 영역 */}
        <div className="mypage-bottom-action-area">
          <button 
            className="edit-profile-btn" 
            onClick={handleEditProfile}
          >
            나의 정보 수정하기
          </button>
        </div>
        
      </div>
    </>
  );
};

export default MyPage;