import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './my-page.css';
import circle from '../circle.png';
import clip from '../clip.png';
import clipboard from '../clipboard.png';
import axios from 'axios'; // Import axios

function MyPage() {
  const navigate = useNavigate(); // Initialize navigate

  const handleQuizCreatorRedirect = () => {
    navigate('/quizcreator'); // QuizCreator 페이지로 이동
  };
  const handleSubjectRedirect =() => {
    navigate('/solve'); //subject 페이지로 이동
  }
  
  // 통신에 필요한 값 가져오기
  const username = sessionStorage.getItem("userId");

  // 유저 정보 초기값 설정
  const [user, setUser] = useState({
    id: "66d5f82fd68cbd5175ce02e6", 
    username: "esg3",
    password: "esg3",
    level: 1,
    correctAnswers: 0,
    createdQuizzes: 0
  });
  const [remainingQuizzes, setRemainingQuizzes] = useState(10);

  useEffect(() => {	//userEffect 사용
    const fetchData = async () => {
    const response = await fetch(
      `http://localhost:3000/user/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
    const result = await response.json();
    if (response.status === 200) {
      setUser({	//userState 사용
        id: result.id,
        username: result.username,
        password: result.password,
        level: result.level, 
        correctAnswers : result.correctAnswers, 
        createdQuizzes: result.createdQuizzes
      });

      // 현재 레벨 계산 (10개의 정답마다 1 레벨 증가)
      const newLevel = Math.floor(user.correctAnswers / 10) + 1;
      
      // 다음 레벨까지 남은 퀴즈 계산
      const remaining = 10 - (user.correctAnswers % 10);
      setRemainingQuizzes(remaining);
    } else {
      console.log("실패");
    }
  };
  fetchData();
}, [user]);

  return(
    <div className="container">
      <div className="item first">
        <p className='status'><span>{user.username}</span>님 안녕하세요!</p>
        <p className='status'>오늘은 {user.correctAnswers}개의 퀴즈의 정답을 맞혔어요.</p>
        <p className='status'>지금까지 {user.createdQuizzes}개의 퀴즈를 만들었어요.</p>
        <hr />
        <div className='level-container'>
          <img className='level' src={circle} alt="level status" />
          <p>LV.{user.level}</p>
        </div>
        <p className='info'>다음 레벨까지 남은 퀴즈 : {remainingQuizzes}개</p>
      </div>
      <div className="item second">
        <img className="clip" src={clip} alt="clip" />

        <p className='create' onClick={handleQuizCreatorRedirect}>
        <span>
            퀴즈 만들러 가기
          </span>
        </p>
        <p>퀴즈를 만들고<br />아코모에서 공유해요.</p>
      </div>
      <div className="item third">
        <img className="clipboard" src={clipboard} alt="clipboard" />
        <p className='solve' onClick={handleSubjectRedirect}>
          <span>
            퀴즈 풀러 가기
          </span>
        </p>
        <p>다른 사람들이 만든 퀴즈를<br />모두 함께 풀어봐요.</p>
      </div>
    </div>
  )
}

export default MyPage;