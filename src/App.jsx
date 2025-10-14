import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupComplete from './pages/SignupComplete';
import RegisterSelect from './pages/RegisterSelect';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup-complete" element={<SignupComplete />} />
      <Route path="/register-select" element={<RegisterSelect />} />

     
    </Routes>
  );
};

export default App;