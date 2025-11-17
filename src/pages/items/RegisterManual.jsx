// 물품 수기 등록 페이지 

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import './RegisterManual.css';
import imagesPlus from '../../assets/images/images_plus.png';


//API 주소 변수화: URL 확정 시 이 값만 변경
const API_BASE_URL = "http://localhost:8080"; 
const REGISTER_MANUAL_ENDPOINT = "/api/regi/selt_input";


const MAX_NAME_LEN = 20;
const pad2 = (n) => String(n || '').padStart(2, '0');
const buildDate = (y, m, d) => `${y || ''}-${pad2(m)}-${pad2(d)}`;

const RegisterManual = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    place: '',
    month: '',
    day: '',
    year: '',
    qty: 0,
    desc: '',
    imageFiles: [],
  });

  //사용자 피드백 메시지 상태 추가 (alert 대체)
  const [statusMsg, setStatusMsg] = useState('');

  const [previewUrls, setPreviewUrls] = useState([]);
  const urlsRef = useRef([]);
  useEffect(() => {
    urlsRef.current = previewUrls;
  }, [previewUrls]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setStatusMsg(''); // 입력 시작 시 메시지 초기화

    if (name === 'name') {
      // 최대 20자 제한
      setForm((f) => ({ ...f, name: value.slice(0, MAX_NAME_LEN) }));
      return;
    }
    if (name === 'qty') {
      const v = Math.max(0, Number(value ?? 0));
      setForm((f) => ({ ...f, qty: v }));
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSelectImage = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 1); // 한 번에 1장만 추가
    if (!files.length) return;

    setForm((f) => {
      const nextFiles = [...f.imageFiles, ...files].slice(0, 10);
      return { ...f, imageFiles: nextFiles };
    });

    const newUrls = files.map((f) => URL.createObjectURL(f));
    setPreviewUrls((prev) => [...prev, ...newUrls].slice(0, 10));

    e.target.value = '';
  };

  const removeImage = (idx) => {
    setForm((f) => {
      const nextFiles = (f.imageFiles || []).filter((_, i) => i !== idx);
      return { ...f, imageFiles: nextFiles };
    });
    setPreviewUrls((prev) => {
      const url = prev[idx];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== idx);
    });
  };

  useEffect(() => {
    return () => {
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  const saveDraft = () => {
    // 간단 임시저장 (로컬스토리지)
    const draft = { ...form, imageFile: undefined };
    localStorage.setItem('manualDraft', JSON.stringify(draft));
    // alert('임시저장 완료'); 
    setStatusMsg('✅ 임시 저장되었습니다.');
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatusMsg(''); // 등록 시도 시 메시지 초기화

    // Basic validation
    if (!form.name?.trim()) return setStatusMsg('물품명을 입력해 주세요.');
    if (!form.place?.trim()) return setStatusMsg('거래장소를 입력해 주세요.');

    const buy_date = buildDate(form.year, form.month, form.day);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(buy_date)) {
      return setStatusMsg('구매일자를 YYYY-MM-DD 형식(예: 2025-05-15)으로 입력해 주세요.');
    }
    
    // 💡 API 명세서에 따른 payload 구조
    const payload = {
      obj_id: 2001, // 명세서 요구
      obj_name: form.name,
      buy_date,
      expiration_date: [], // 명세서 요구 (데이터가 없으면 빈 배열 전송)
      donor_id: 'str1',   // TODO: 로그인 사용자 정보로 교체
      buyer_id: 'str2',   // TODO: 로그인 사용자 정보로 교체
      locate: form.place,
      fest_locate: 'str4', // TODO: 선택된 축제/부스 정보로 교체
    };

    try {
      const fullUrl = API_BASE_URL + REGISTER_MANUAL_ENDPOINT; 

      const res = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data = await res.json().catch(() => ({}));

      console.log('등록 성공', data);
      setStatusMsg('등록이 완료되었습니다!');
      // alert('등록이 완료되었습니다!'); 
      navigate('/register-complete');
    } catch (err) {
      console.error('등록 실패', err);
      // alert('등록 중 오류가 발생했습니다. 콘솔을 확인해 주세요.'); 
      setStatusMsg('등록 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <Header />
      <main className="manual-wrap">
        <h2 className="manual-title">물품 정보</h2>
        <hr className="manual-divider" />

        {/* 이미지 업로드 섹션 */}
        <section className="manual-section">
          <label htmlFor="image" className="manual-label">물품이미지 <small>({previewUrls.length}/10)</small></label>
          <div className="img-row">
            <div className="img-grid">
              {previewUrls.length < 10 && (
                <label htmlFor="image" className="img-card img-add-btn">
                  <img src={imagesPlus} alt="이미지 추가" className="img-add-icon" />
                </label>
              )}
              {previewUrls.map((url, idx) => (
                <div key={url} className="img-card">
                  <button type="button" className="img-del-btn" aria-label="이미지 삭제" onClick={() => removeImage(idx)}>×</button>
                  <img src={url} alt={`업로드된 이미지 ${idx + 1}`} className="img-card-img" />
                </div>
              ))}
            </div>
            <input id="image" name="image" type="file" accept="image/*" onChange={onSelectImage} style={{ display: 'none' }} />
          </div>
        </section>

        <form onSubmit={submit}>
          {/* 물품명 */}
          <section className="manual-field">
            <label htmlFor="name" className="manual-label">물품명</label>
            <div className="name-row">
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                placeholder="물품명 입력"
                className="input"
              />
              <span className="name-count">
                {form.name.length}/{MAX_NAME_LEN}
              </span>
            </div>
          </section>

          {/* 거래장소 */}
          <section className="manual-field">
            <label htmlFor="place" className="manual-label">거래장소</label>
            <input
              id="place"
              name="place"
              type="text"
              value={form.place}
              onChange={onChange}
              placeholder="주소 입력"
              className="input"
            />
          </section>

          {/* 물품 구매일자 */}
          <section className="manual-field">
            <div className="manual-label">물품 구매일자</div>
            <div className="date-inputs">
              <input name="month" value={form.month} onChange={onChange} placeholder="월(MM)" inputMode="numeric" maxLength={2} className="date-input" />
              <input name="day" value={form.day} onChange={onChange} placeholder="일(DD)" inputMode="numeric" maxLength={2} className="date-input" />
              <input name="year" value={form.year} onChange={onChange} placeholder="년(YYYY)" inputMode="numeric" maxLength={4} className="date-input" />
            </div>
          </section>

          {/* 수량 */}
          <section className="manual-field">
            <label htmlFor="qty" className="manual-label">수량</label>
            <div className="qty-row">
              <input
                id="qty"
                name="qty"
                type="number"
                min={0}
                value={form.qty}
                onChange={onChange}
                className="qty-input"
              />
              <span className="qty-unit">개</span>
            </div>
          </section>

          {/* 설명 */}
          <section className="manual-field">
            <label htmlFor="desc" className="manual-label">설명</label>
            <textarea
              id="desc"
              name="desc"
              rows={5}
              value={form.desc}
              onChange={onChange}
              placeholder="물품 정보를 자세히 적어주세요."
              className="desc-textarea"
            />
          </section>
          
          {/* 상태 메시지 출력 */}
          {statusMsg && (
            <div className={`status-message ${statusMsg.startsWith('✅') ? 'success' : 'error'}`}>
              {statusMsg}
            </div>
          )}

          {/* 하단 버튼 영역 */}
          <div className="manual-footer">
            <button type="button" className="btn-prev" onClick={() => navigate('/register-select')}>이전으로</button>
            <button type="button" className="btn-draft" onClick={saveDraft}>임시저장</button>
            <button type="submit" className="btn-submit">등록하기</button>
          </div>
        </form>
      </main>
    </>
  );
};

export default RegisterManual;