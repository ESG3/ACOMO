import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 임포트
import './QuizCreator.css';

const QuizCreator = () => {
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState(['', '', '']);
  const [selectedSubject, setSelectedSubject] = useState('JavaScript');
  const [memo, setMemo] = useState('');
  const [selectedChoice, setSelectedChoice] = useState(null);

  const navigate = useNavigate();

  const subjects = ['HTML', 'CSS', 'JavaScript', 'Git/GitHub', 'AI', 'Node', 'MongoDB', 'Express', 'React'];

  const handleAddChoice = () => {
    if (choices.length >= 5) {
      alert('선택지 추가는 최대 5개까지 가능합니다.');
      return;
    }
    setChoices([...choices, '']);
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleDeleteChoice = (index) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
    if (selectedChoice === index) {
      setSelectedChoice(null);
    }
  };

  const handleCheckButtonClick = (index) => {
    if (selectedChoice === index) {
      setSelectedChoice(null);
    } else if (selectedChoice !== null) {
      alert('선택지 중 답안은 하나만 가능합니다.');
    } else {
      setSelectedChoice(index);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || choices.some(choice => !choice.trim())) {
      alert('모든 빈칸을 채워주세요.');
      return;
    }

    const quizData = {
      subject: selectedSubject,
      content: question,
      options: choices,
      correctAnswer: selectedChoice !== null ? choices[selectedChoice] : null,
      explanation: memo,
      creatorId: window.sessionStorage.getItem('userId'), // 현재 로그인한 사용자 ID를 가져옴
    };

    try {
      const response = await axios.post('http://localhost:3000/quiz/create', quizData);

      if (response.status === 201) {
        alert('퀴즈 생성이 완료되었습니다!');
        navigate('/mypage'); // 문제 생성이 완료된 후 MyPage로 이동
      } else {
        alert(response.data.message || '퀴즈 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('퀴즈 생성 중 오류 발생:', error);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="quiz-creator">
      <form onSubmit={handleSubmit}>
        <div>
          <label>&nbsp;과목</label>
          <div>
            {subjects.map((subject) => (
              <button
                type="button"
                key={subject}
                className={selectedSubject === subject ? 'selected' : ''}
                onClick={() => setSelectedSubject(subject)}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label>&nbsp;문제내용</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="문제 내용 입력"
          />
        </div>
        <div>
          <label>&nbsp;선택지</label>
          {choices.map((choice, index) => (
            <div key={index} className="choice-input">
              <button
                type="button"
                className={`check-button ${selectedChoice === index ? 'selected' : ''}`}
                onClick={() => handleCheckButtonClick(index)}
              >
                ✓
              </button>
              <input
                type="text"
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
                placeholder={`선택지 ${index + 1}`}
              />
              {choices.length > 2 && (
                <button type="button" className="delete-button" onClick={() => handleDeleteChoice(index)}>삭제</button>
              )}
            </div>
          ))}
          <button type="button" className="add-choice-button" onClick={handleAddChoice}>
            선택지 추가하기
          </button>
        </div>
        <div>
          <label>&nbsp;메모</label>
          <br/>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="이 메모는 해설 생성에 활용될 예정입니다."
          />
        </div>
        <div className="submit-container">
          <button type="submit">퀴즈 만들기</button>
        </div>
      </form>
    </div>
  );
};

export default QuizCreator;
