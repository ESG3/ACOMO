import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Button from '../components/Button';
import OptionGroup from '../components/OptionGroup';
import React, { useState, useEffect, useCallback } from 'react';
import { fetchQuestions, solveQuiz } from '../services/solveService';

const SolveWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TitleText = styled.div`
    font-size: 24px;
    text-align: left; /* 제목을 좌측 정렬 */
    margin-bottom: 20px;
    font-weight: 600;
    padding: 0;
    font-family: 'Pretendard', sans-serif;
`;

const ContentText = styled.div`
    font-family: 'Pretendard', sans-serif;
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 50px; /* 옵션과 제목 사이의 간격 조정 */
`;

const ButtonWrapper = styled.div`
    margin-top: 50px;
    display: flex;
    flex-grow: 1; /* 버튼을 아래로 밀어내는 효과 */
    justify-content: center; /* 버튼을 가로로 중앙 정렬 */
    align-items: center; /* 버튼을 세로로 중앙 정렬 */
`;

const Solve = () => {
    const navigate = useNavigate();
    const { subject } = useParams();  // useParams 훅을 사용해 subject 파라미터를 가져옴
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});

    let sessionStorage = window.sessionStorage;

    const loadQuestions = useCallback(async () => {
        const result = await fetchQuestions({ subject });

        if (typeof result === 'string') {
            // 오류 메시지인 경우
            alert(result);
            navigate('/solve');
        } else if (Array.isArray(result)) {
            // 정상 배열인 경우
            setQuestions(result);
        } else {
            // 예상하지 못한 응답 형식
            console.error('Unexpected response format:', result);
            alert('문제 목록을 불러오는 데 실패했습니다.');
        }
    }, [subject, navigate]);

    useEffect(() => {
        loadQuestions();
    }, [loadQuestions]);

    const handleOptionClick = (index) => {
        if (!questions[currentIndex].isResult) {
            setSelectedOptions(prevState => ({
                ...prevState,
                [questions[currentIndex].id]: questions[currentIndex].options[index],
            }));
        }
    };

    const handleClick = async () => {
        const currentQuestion = questions[currentIndex];
        if (!selectedOptions[currentQuestion.id]) {
            alert("답을 선택해주세요");
            return;
        }

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // 문제 ID, 과목명, 질문, 옵션, 선택된 답변을 Result.jsx로 넘김
            const results = questions.map(question => ({
                id: question.id,
                subject: question.subject,
                content: question.content,
                options: question.options,
                selectedAnswer: selectedOptions[question.id] || "",
                correctAnswer: question.correctAnswer,
                explanation: question.explanation
            }));

            const resultsForSubmit = questions.map(question => ({
                quizId: question.id,
                selectedAnswer: selectedOptions[question.id] || "",
                userId: sessionStorage.getItem('userId') || 'user111' // 사용자 ID는 실제 사용자 ID로 교체해야 함
            }));

            try {
                // 서버에 결과 전송
                const result = await Promise.all(resultsForSubmit.map(data => solveQuiz(data)));

                // 서버 응답 처리 (필요시 추가 로직)
                console.log('Server response:', result);
            } catch (error) {
                console.error('Error submitting quiz results:', error);
                alert('결과 제출 중 오류가 발생했습니다.');
            }
            
            navigate('/solve/result', { state: { results } });
        }
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentIndex];
    const options = currentQuestion.options.map(option => ({
        text: option,
        isSelected: option === selectedOptions[currentQuestion.id],
    }));

    return (
        <Layout>
            <SolveWrapper>
                <TitleText>
                    {subject} 과목의 퀴즈 푸는 중 ({currentIndex + 1}/{questions.length})
                </TitleText>
                <ContentText>
                    {currentQuestion.content}
                </ContentText>
                <OptionGroup
                    options={options}
                    isResult={false}
                    onOptionClick={handleOptionClick}
                />
                <ButtonWrapper>
                    <Button 
                        text={currentIndex === questions.length - 1 ? '정답 확인하기' : '다음 퀴즈로'}
                        onClick={handleClick} 
                    />
                </ButtonWrapper>
            </SolveWrapper>
        </Layout>
    );

};

export default Solve;
