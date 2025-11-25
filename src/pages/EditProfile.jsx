//프로필 수정하기
// 엔드포인트 정해서 추가해야함
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
import Header from "../components/Header";
import MyPageBannerImage from "../assets/images/mypage_banner.png"; 
import eye from "../assets/icons/eye.png"; 
import cameraIcon from "../assets/icons/camera.png"; 

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 초기 데이터 (백엔드 연동 전 더미 데이터)
  const [userInfo, setUserInfo] = useState({
    nickname: "민주님",
    phone: "010-1234-5678",
    id: "minju1234", // 아이디 필드 추가
    profileImage: "/assets/images/sample-profile.jpg", 
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [previewImage, setPreviewImage] = useState(userInfo.profileImage);

  // 비밀번호 보이기/숨기기 상태
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  // 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleSave = () => {
    // 저장 로직 (API 연동)
    console.log("저장:", { ...userInfo, password });
    alert("정보가 수정되었습니다.");
    navigate("/mypage");
  };

  return (
    <>
      <Header />
      <div className="mypage-container">
        
        {/* 배너 영역 */}
        <div className="mypage-banner-area">
          <img 
            src={MyPageBannerImage} 
            alt="배너" 
            className="mypage-banner-image" 
          />
          {/* 텍스트 위치: 홈 > 마이페이지 > 내정보 수정 */}
          <p className="banner-text-position banner-subtitle">홈 &gt; 마이페이지 &gt; 내정보 수정</p>
        </div>

        {/* 수정 폼 카드 섹션 */}
        <div className="edit-profile-wrapper">
          <div className="edit-card">
            
            {/* 프로필 이미지 */}
            <div className="profile-image-container">
              <div className="image-wrapper" onClick={() => fileInputRef.current.click()}>
                <img src={previewImage} alt="프로필" className="profile-img" />
              </div>
              {/* 카메라 아이콘 */}
              <div className="camera-icon-wrapper" onClick={() => fileInputRef.current.click()}>
                 <img src={cameraIcon} alt="사진 변경" className="camera-icon" />
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*"
                style={{ display: "none" }} 
              />
            </div>

            {/* 닉네임 표시 */}
            <h2 className="user-nickname-title">{userInfo.nickname}</h2>

            {/* 입력 폼 */}
            <div className="edit-form">
              
              <div className="input-row">
                <label>닉네임</label>
                <input 
                  type="text" 
                  name="nickname"
                  value={userInfo.nickname} 
                  onChange={handleChange} 
                  className="input-field"
                />
              </div>

              <div className="input-row">
                <label>전화번호</label>
                <input 
                  type="text" 
                  name="phone"
                  value={userInfo.phone} 
                  onChange={handleChange} 
                  className="input-field"
                />
              </div>

              <div className="input-row">
                <label>아이디</label>
                <input 
                  type="text" 
                  name="id"
                  value={userInfo.id} 
                  readOnly // 아이디는 보통 수정 불가 (필요시 제거)
                  className="input-field readonly"
                />
              </div>

              <div className="input-row">
                <label>비밀번호</label>
                <div className="password-wrapper">
                  <input 
                    type={showPw ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                  />
                  <img 
                    src={eye} 
                    alt="보기" 
                    className="eye-icon"
                    onClick={() => setShowPw(!showPw)} 
                  />
                </div>
              </div>

              <div className="input-row">
                <label>비밀번호 확인</label>
                <div className="password-wrapper">
                  <input 
                    type={showConfirmPw ? "text" : "password"} 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                  />
                  <img 
                    src={eye} 
                    alt="보기" 
                    className="eye-icon"
                    onClick={() => setShowConfirmPw(!showConfirmPw)} 
                  />
                </div>
              </div>

              {/* 저장 버튼 */}
              <button className="save-full-btn" onClick={handleSave}>
                저장하기
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;