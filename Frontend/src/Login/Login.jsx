import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios import
import './Login.css';

const Login = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateId = (value) => {
    const idRegex = /^[가-힣a-zA-Z0-9]{1,10}$/;
    return idRegex.test(value);
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{1,15}$/;
    return passwordRegex.test(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    // if (!validateId(id)) {
    //   alert('아이디는 한글, 영어, 숫자를 이용하여 10자이내로 띄어쓰기 없이 입력가능합니다.');
    //   return;
    // }
    // if (!validatePassword(password)) {
    //   alert('비밀번호는 영어와 숫자를 포함하여 띄어쓰기 없이 15자 이내로 입력가능합니다.');
    //   return;
    // }

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username: id,
        password: password,
      });

      if (response.status === 200) {
        const userId = response.data.user.username;
        window.sessionStorage.setItem('userId', userId); // Store userId in sessionStorage
        onLogin();
        navigate('/mypage');
        alert('로그인 성공! 환영합니다!');
      } else {
        alert(response.data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      // 존재하지 않는 가입자일 떄
      if (error.response && error.response.status === 404) {
        alert('가입되지 않은 회원입니다.');
      } else if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      } else {
        // Generic error message for other issues
        console.error('Error during login:', error.message);
        alert('문제가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };
return (
    <div className="login-container">
      <div className="logo"></div> {/* ACOMO Logo */}
      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="login-subject">로그인</h1>
        <h2 className="login-title">ACOMO를 시작하세요!</h2>
        <div className="input-container">
          <label>닉네임</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="닉네임"
          />
        </div>
        <div className="input-container">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
        </div>
        <div className="button-container">
          <button type="submit" className="login-button">로그인</button>
          <button type="button" className="register-button" onClick={handleSignUpRedirect}>회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default Login;