// src/pages/EditProfile.jsx

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
import Header from "../components/Header";
import MyPageBannerImage from "../assets/images/mypage_banner.png"; 
import eye from "../assets/icons/eye.png"; 
import cameraIcon from "../assets/icons/camera.png"; 

// API 통신 기준 URL
const API_BASE_URL = "http://localhost:8080"; 

const PROFILE_UPDATE_ENDPOINT = "/api/mypage/user_update"; 

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [userInfo, setUserInfo] = useState({
    nic: "",
    phone: "",
    id: "",
    profileImage: "/assets/images/sample-profile.jpg", // 기본 이미지
  });

  // 비밀번호 변경 상태
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // 이미지 관련 상태
  const [previewImage, setPreviewImage] = useState(userInfo.profileImage); 
  const [selectedFile, setSelectedFile] = useState(null); 

  // 비밀번호 보이기/숨기기 토글 상태
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  // 초기 데이터 로드 (GET)
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 기존 정보 불러오기 (마이페이지와 동일한 API 사용)
        const res = await fetch(`${API_BASE_URL}/api/mypage/user_info`);
        
        if (res.ok) {
          const data = await res.json();
          setUserInfo({
            nic: data.nic || data.nickname || "", 
            phone: data.phone || "",
            id: data.id || "", 
            profileImage: data.profileImage || "/assets/images/sample-profile.jpg",
          });
          setPreviewImage(data.profileImage || "/assets/images/sample-profile.jpg");
        } else {
          console.error("사용자 정보 로드 실패");
        }
      } catch (error) {
        console.error("API 연결 오류:", error);
      }
    };

    fetchUserInfo();
  }, []);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); 
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl); 
    }
  };

  const handleSave = async () => {
    // 비밀번호 일치 확인
    if (password && password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // FormData 객체 생성 (파일 + 텍스트 전송용)
      const formData = new FormData();
      
      formData.append("nic", userInfo.nic); 
      formData.append("phone", userInfo.phone);
      
      // 변경된 경우에만 추가할 데이터
      if (password) {
        formData.append("password", password);
      }
      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      // API 호출
      const res = await fetch(`${API_BASE_URL}${PROFILE_UPDATE_ENDPOINT}`, {
        method: "POST", 
        body: formData,
      });

      if (res.ok) {
        alert("정보가 수정되었습니다.");
        navigate("/mypage"); // 마이페이지로 이동하여 변경된 정보 확인
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(errData.message || "정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("저장 중 에러 발생:", error);
      alert("서버 연결 오류가 발생했습니다.");
    }
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
          <p className="banner-text-position banner-subtitle">홈 &gt; 마이페이지 &gt; 내정보 수정</p>
        </div>

        {/* 수정 폼 카드 섹션 */}
        <div className="edit-profile-wrapper">
          <div className="edit-card">
            
            {/* 프로필 이미지 (클릭 시 파일 선택) */}
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

            {/* 닉네임 표시: userInfo.nic 사용 */}
            <h2 className="user-nickname-title">{userInfo.nic}</h2>

            {/* 입력 폼 */}
            <div className="edit-form">
              
              <div className="input-row">
                <label>닉네임</label>
                <input 
                  type="text" 
                  name="nic" 
                  value={userInfo.nic} 
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
                  readOnly 
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
                    placeholder="변경 시에만 입력하세요"
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