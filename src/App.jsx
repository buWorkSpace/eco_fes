import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; //메인
import Login from './pages/Login'; //로그인
import Signup from './pages/Signup'; //회원가입
import SignupComplete from './pages/SignupComplete'; //회원가입 완료페이지
import RegisterSelect from './pages/RegisterSelect'; //물품등록 선택페이지
import RegisterManual from './pages/items/RegisterManual'; //물품 수기등록 페이지
import RegisterComplete from './pages/items/RegisterComplete'; //물품등록 완료 페이지

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup-complete" element={<SignupComplete />} />
      <Route path="/register-select" element={<RegisterSelect />} />
      <Route path="/register-manual" element={<RegisterManual />} />
      <Route path="/register-complete" element={<RegisterComplete />} />
    </Routes>
  );
};

export default App;