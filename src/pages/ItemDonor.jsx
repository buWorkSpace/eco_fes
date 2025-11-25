// src/pages/items/ItemDonor.jsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ItemDonor.css";
import Header from "../components/Header";

// TODO: 실제로는 donor_id 기준으로 서버에서 가져오기
const mockDonor = {
  id: "donor-1",
  name: "민주님",
  joinText: "가입한지 6개월",
  profile: "/images/donor.png",
  items: [
    {
      id: 2000,
      title: "과일과 샐러드 10인분",
      location: "백석동",
      time: "1시간전",
      done: false,
      image: "/images/items/item1.png",
    },
    {
      id: 2006,
      title: "소떡소떡 3개",
      location: "백석동",
      time: "3개월전",
      done: true,
      image: "/images/items/item7.png",
    },
    {
      id: 2007,
      title: "찐 고구마 2개",
      location: "백석동",
      time: "4개월전",
      done: true,
      image: "/images/items/item8.png",
    },
  ],
};

const ItemDonor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const donor = mockDonor;

  return (
    <>
      <Header />

      <main className="donor-page">
        {/* 상단 그라데이션 배너 */}
        <div className="donor-banner" />

        <div className="donor-inner">
          {/* 프로필 영역 */}
          <div className="donor-profile-wrap">
            <img
              src={donor.profile}
              alt={donor.name}
              className="donor-profile-img"
            />
            <div className="donor-profile-text">
              <h2 className="donor-name">{donor.name}</h2>
              <span className="donor-join">{donor.joinText}</span>
            </div>
          </div>

          <hr className="donor-divider" />

          {/* 등록물품 + 카드 리스트 */}
          <div className="donor-items-header">
            <button className="donor-items-btn">등록물품</button>
          </div>

          <div className="donor-items-grid">
            {donor.items.map((item) => (
              <div
                key={item.id}
                className={`donor-item-card ${item.done ? "is-done" : ""}`}
                onClick={() => navigate(`/items/${item.id}`)}
              >
                <div className="donor-item-image-wrap">
                  <img src={item.image} alt={item.title} />
                  {item.done && (
                    <div className="donor-item-done-overlay">
                      <div className="donor-item-done-circle">거래완료</div>
                    </div>
                  )}
                </div>
                <div className="donor-item-body">
                  <p className="donor-item-title">{item.title}</p>
                  <div className="donor-item-meta-top">
                    <span className="donor-item-name">{donor.name}</span>
                    <span className="donor-item-time">{item.time}</span>
                  </div>
                  <div className="donor-item-meta-bottom">
                    <span className="loc-icon">📍</span>
                    <span className="loc-text">{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="donor-back-btn" onClick={() => navigate(-1)}>
            돌아가기
          </button>
        </div>
      </main>
    </>
  );
};

export default ItemDonor;
