// src/pages/items/ItemDetail.jsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ItemDetail.css";
import Header from "../components/Header";

// TODO: 백엔드 연동 전 테스트용 더미 데이터
const mockItem = {
  id: 2000,
  title: "과일과 샐러드",
  location: "백석동",
  views: 2,
  time: "1분전 (2025-11-09)",
  description:
    "행사 진행하고 남은 수박, 딸기, 망고 슬라이스 과일 나눔 합니다!\n샐러드도 있어요. 양은 충분합니다. 상태도 좋아요.\n백석동 근처에서 거래합니다.\n댓글 남겨 주세요! ^^",
  donorName: "민주님",
  image: "/images/items/item1.png",
};

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: 실제로는 id를 이용해 서버에서 데이터 가져오기
  const item = mockItem;

  return (
    <>
      <Header />

      <main className="detail-page">
        <div className="detail-inner">
          {/* 빵부스러기 */}
          <div className="detail-breadcrumb">나눔받기 &gt; 거래요청</div>

          {/* 상단 2단 레이아웃 */}
          <div className="detail-top">
            <div className="detail-image-wrap">
              <img
                src={item.image}
                alt={item.title}
                className="detail-image"
              />
            </div>

            <div className="detail-info">
              <h2 className="detail-title">{item.title}</h2>

              <div className="detail-meta">
                <span>{item.location}</span>
                <span>조회 {item.views}</span>
                <span>{item.time}</span>
              </div>

              <p className="detail-desc">{item.description}</p>
            </div>
          </div>

          {/* 나눔자 정보 박스 */}
          <div
            className="detail-donor-row"
            onClick={() => navigate(`/items/${id}/donor`)}
          >
            <img
              src="/images/donor.png"
              alt={item.donorName}
              className="detail-donor-avatar"
            />
            <span className="detail-donor-name">{item.donorName}</span>
            <span className="detail-donor-arrow">›</span>
          </div>

          {/* 거래요청 입력 (UI만) */}
          <div className="detail-request-box">
            <input
              type="text"
              placeholder="거래시간과 요청의 말을 남겨주세요."
            />
            <button>거래요청</button>
          </div>

          {/* 댓글 리스트 (UI만) */}
          <div className="detail-comments">
            <h3 className="comment-title">댓글 2</h3>

            <div className="comment-item">
              <img src="/images/user1.png" alt="은석님" />
              <div className="comment-body">
                <div className="comment-meta">
                  <strong>은석님</strong>
                  <span>2025-11-09 (18:30)</span>
                </div>
                <p>
                  저 오후 8시에 거래 하고 싶습니다! 가능할까요? 가능하면 남은거
                  다 가져가고 싶어요. 백석동이 어디로 가면 될까요?
                </p>
              </div>
            </div>

            <div className="comment-item">
              <img src="/images/donor.png" alt="민주님" />
              <div className="comment-body">
                <div className="comment-meta">
                  <strong>민주님</strong>
                  <span>2025-11-09 (18:30)</span>
                </div>
                <p>
                  네~^^ 남은거 다 가져가시면 될 것 같아요. 백석동 ○○아파트 ○○동
                  공동현관 앞으로 와주세요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ItemDetail;
