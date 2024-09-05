// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './sign-up.css';
import axios from 'axios';

function SignUp() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passcheck, setPasscheck] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const validateNickname = (value) => {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,10}$/;
    return nicknameRegex.test(value);
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,15}$/;
    return passwordRegex.test(value);
  };

  const handleChangeNickname = (event) => {
    setNickname(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangePasscheck = (event) => {
    setPasscheck(event.target.value);

  };

  const handleSumbit = (e) => {
    e.preventDefault();

    if (!validateNickname(nickname)) {
      alert('닉네임은 한글, 영어, 숫자만 가능하고 띄어쓰기는 미포함 10자리까지 허용됩니다.');
      return;
    }

    else if (!validatePassword(password)) {
      alert('비밀번호는 영어와 숫자를 포함하여 띄어쓰기 없이 15자 이내로 입력가능합니다.');
      return;
    }

    else if (password !== passcheck) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }

    else {
      axios.post('http://localhost:3000/auth/signup',
        {
          "username": nickname,
          "password": password
        })
      .then(response => {
        if (response.status === 201 ){
          console.log(response.data)
          // 모든 검증 통과 시 AfterSignUp 페이지로 이동
          navigate('/after-signup');
        }
      })
      .catch(err => {
        console.error(err, err.response.data.message);
        alert(err.response.data.message || '로그인에 실패했습니다.');
      })
    }
  };

  

  return (
    <div className='app-container'>
      <form className='form-container'>
        <h2>회원가입</h2>
        <fieldset className='form-fieldset'>
          <label htmlFor="nickname" className='form-label'>닉네임</label>
          <p>한글, 영어, 숫자만 가능. 띄어쓰기 미포함</p>
          <input type="text"
            value={nickname}
            onChange={handleChangeNickname}
            placeholder='닉네임'
            className='form-input' />
        </fieldset>
        <fieldset className='form-fieldset'>
          <label htmlFor="password" className='form-label'>비밀번호</label>
          <input type="password"
            value={password}
            onChange={handleChangePassword}
            placeholder='비밀번호'
            className='form-input' />
        </fieldset>
        <fieldset className='form-fieldset'>
          <label htmlFor="passcheck" className='form-label'>비밀번호 확인</label>
          <input type="password"
            value={passcheck}
            onChange={handleChangePasscheck}
            placeholder='비밀번호 확인'
            className='form-input' />
        </fieldset>
        <button className='submit' type="submit" onClick={handleSumbit}>가입하기</button>
      </form>
    </div>
  );
}

export default SignUp;
