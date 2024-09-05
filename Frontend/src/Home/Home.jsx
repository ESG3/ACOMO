import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './home.css';
import user from '../user.png';
import clip from '../clip.png';
import clipboard from '../clipboard.png';

function Home() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); // Navigate to Login page
  };

  const handleQuizCreateClick = () => {
    alert("로그인 후 이용해주세요!"); // Show alert when "퀴즈 만들러 가기" is clicked
  };

  const handleQuizSolveClick = () => {
    alert("로그인 후 이용해주세요!"); // Show alert when "퀴즈 풀러 가기" is clicked
  };
  
  return (
    <div className="container">
      <div className="item first">
        <img className="user" src={user} alt="user" />
        <p className='start' onClick={handleLoginRedirect}>
          <span>
            로그인하고 아코모 시작하기
          </span>
        </p>
        <p className='start'>닉네임과 비밀번호만으로<br />아코모를 시작할 수 있어요.</p>
      </div>
      <div className="item second">
        <img className="clip" src={clip} alt="clip" />
        <p onClick={handleQuizCreateClick}>
          <span>
            퀴즈 만들러 가기
          </span>
        </p>
        <p>퀴즈를 만들고<br />아코모에서 공유해요.</p>
      </div>
      <div className="item third">
        <img className="clipboard" src={clipboard} alt="clipboard" />
        <p onClick={handleQuizSolveClick}>
          <span>
            퀴즈 풀러 가기
          </span>
        </p>
        <p>다른 사람들이 만든 퀴즈를<br />모두 함께 풀어봐요.</p>
      </div>
    </div>
  );
}

export default Home;