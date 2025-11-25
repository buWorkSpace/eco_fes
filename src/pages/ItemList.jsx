// src/pages/ItemList.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ItemList.css";
import Header from "../components/Header";

// TODO: 백엔드 연동 전까지 사용할 임시 데이터
const mockItems = [
  {
    id: 2000,
    title: "과일과 샐러드 10인분",
    donorName: "민주님",
    location: "백석동",
    time: "1시간전",
    image: "/images/items/item1.png",
  },
  {
    id: 2001,
    title: "토마토, 상추",
    donorName: "성현님",
    location: "원성동",
    time: "1시간전",
    image: "/images/items/item2.png",
  },
  {
    id: 2002,
    title: "햄 샌드위치",
    donorName: "의자님",
    location: "불당동",
    time: "1시간전",
    image: "/images/items/item3.png",
  },
  {
    id: 2003,
    title: "잡채 1인분",
    donorName: "원님",
    location: "불당동",
    time: "1시간전",
    image: "/images/items/item4.png",
  },
  {
    id: 2004,
    title: "핫도그 1인분",
    donorName: "윤기님",
    location: "성정동",
    time: "1시간전",
    image: "/images/items/item5.png",
  },
  {
    id: 2005,
    title: "양파 6개",
    donorName: "민정님",
    location: "원성동",
    time: "1시간전",
    image: "/images/items/item6.png",
  },
];

const districts = [
  "문성동","백석동","봉명동","불당동","부성동","쌍용동",
  "성정동","신방동","신안동","원성동","일봉동","중앙동","청룡동"
];

const ItemList = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [keyword, setKeyword] = useState("");

const toggleDistrict = (d) => {
  setSelectedDistricts((prev) =>
      prev.includes(d) ? prev.filter((v) => v !== d) : [...prev, d]
    );
  };

  // TODO: 나중에 백엔드 연동 시에는 서버에서 필터링
  const filteredItems = mockItems.filter((item) => {
    const matchKeyword =
      keyword === "" ||
      item.title.includes(keyword) ||
      item.location.includes(keyword);
    const matchDistrict =
      selectedDistricts.length === 0 ||
      selectedDistricts.includes(item.location);
    return matchKeyword && matchDistrict;
  });

  return (
    <>
      <Header />

      <main className="item-page">
        <div className="item-page-inner">
          {/* 검색 영역 */}
          <div className="item-search-row">
            <div className="item-search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="행정동 이나 물품 이름"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <button
              className="filter-icon-btn"
              onClick={() => setShowFilter((prev) => !prev)}
            >
              {/* TODO: 필터 아이콘 파일 있으면 여기서 이미지로 교체 */}
              ☰
            </button>

            {/* 필터 드롭다운 */}
            {showFilter && (
              <div className="filter-dropdown">
                <div className="filter-header">
                  <span>동</span>
                  <span className="arrow">▾</span>
                </div>
                <div className="filter-list">
                  {districts.map((d) => (
                    <label key={d} className="filter-item">
                      <input
                        type="checkbox"
                        checked={selectedDistricts.includes(d)}
                        onChange={() => toggleDistrict(d)}
                      />
                      {d}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <h2 className="item-section-title">방금 올라온 물품</h2>

          {/* 카드 그리드 */}
          <div className="item-grid">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="item-card"
                onClick={() => navigate(`/items/${item.id}`)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="item-card-img"
                />
                <div className="item-card-body">
                  <p className="item-card-title">{item.title}</p>

                  <div className="item-card-row">
                    <div className="item-card-user">
                      <span className="profile-circle" />
                      <span className="user-name">{item.donorName}</span>
                    </div>
                    <span className="time-text">{item.time}</span>
                  </div>

                  <div className="item-card-row">
                    <span className="loc-icon">📍</span>
                    <span className="loc-text">{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 (UI만) */}
          <div className="item-pagination">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">&gt;</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ItemList;