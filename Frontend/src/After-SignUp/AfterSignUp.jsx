// AfterSignUp.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './after-sign-up.css';

function AfterSignUp() {
  const navigate = useNavigate(); // Initialize navigate

  const handleLoginRedirect = () => {
    navigate('/Login'); // 로그인 페이지로 이동
  };

  return (
    <div className='app-container'>
      <h2>회원가입 완료!</h2>
      <button className='submit' onClick={handleLoginRedirect}>로그인하러 가기</button>
    </div>
  );
}

export default AfterSignUp;
