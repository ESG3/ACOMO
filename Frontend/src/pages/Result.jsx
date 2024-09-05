import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import styled from 'styled-components';
import OptionGroup from '../components/OptionGroup';
import Button from '../components/Button';
import TextBox from '../components/TextBox';

const ResultWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ExplanationTitle = styled.div`
    font-family: 'Pretendard', sans-serif;
    font-size: 20px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 12px;
`;

const CountText = styled.h1`
    font-size: 32px;
    text-align: left;
    font-family: 'Pretendard', sans-serif;
    margin-right: auto; /* 버튼을 오른쪽으로 배치하기 위해 여백 조정 */
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-top: 20px; /* 버튼 위쪽 여백 */
`;

const TitleText = styled.div`
    font-size: 24px;
    text-align: left;
    font-weight: 600;
    margin-bottom: 20px;
    font-family: 'Pretendard', sans-serif;
`;

const ContentText = styled.div`
    font-family: 'Pretendard', sans-serif;
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 50px;
`;

const NavigationWrapper = styled.div`
    display: flex;
    justify-content: center;  /* 가운데 정렬 */
    align-items: center;
    margin-top: 50px;
    gap: 20px; /* 글자 사이 간격 */
`;

const TopNavigationWrapper = styled.div`
    display: flex;
    justify-content: center;  /* 가운데 정렬 */
    align-items: center;
    gap: 20px; /* 글자 사이 간격 */
`;

const NavigationText = styled.div`
    cursor: pointer;
    color: #007bff;
    font-size: 18px;

    &:hover {
        text-decoration: underline;
    }
`;

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { results } = location.state; // Solve.jsx에서 전달된 결과
    const [currentIndex, setCurrentIndex] = useState(0);
    const [correctData, setCorrectData] = useState({});
    const [correctCount, setCorrectCount] = useState(0);

    useEffect(() => {
        // 더미 데이터 설정
        const fetchCorrectData = () => {
            const currentQuestion = results[currentIndex];

            const countCorrectAnswers = () => {
                const count = results.reduce((acc, question) => {
                    return acc + (question.selectedAnswer === question.correctAnswer ? 1 : 0);
                }, 0);
                setCorrectCount(count);
            };
    
            countCorrectAnswers();

            setCorrectData((prev) => ({
                ...prev,
                [currentQuestion.id]: {
                    correctAnswer: currentQuestion.correctAnswer,
                    explanation: currentQuestion.explanation,
                    correct: currentQuestion.selectedAnswer === currentQuestion.correctAnswer,
                },
            }));
        };

        fetchCorrectData();
    }, [currentIndex, results]);

    const handleNavigation = (direction) => {
        setCurrentIndex((prevIndex) => prevIndex + direction);
    };

    if (results.length === 0 || !correctData[results[currentIndex]?.id]) {
        return <div>Loading...</div>;
    }

    const currentQuestion = results[currentIndex];
    const { correct, correctAnswer } = correctData[currentQuestion.id];

    const options = currentQuestion.options.map((option) => ({
        text: option,
        isSelected: option === currentQuestion.selectedAnswer,
        correct: option === correctAnswer ? true : option === currentQuestion.selectedAnswer && !correct ? false : null
    }));

    const handleFinish = () => {
        navigate('/solve');
    };

    return (
        <Layout>
            <ResultWrapper>
                <TopNavigationWrapper>
                    <CountText>{results.length}문제 중 {correctCount}문제 정답</CountText>
                    <ButtonWrapper>
                        <Button 
                            text='확인 마치기'
                            onClick={handleFinish} 
                        />
                    </ButtonWrapper>
                </TopNavigationWrapper>
                <TitleText>{currentQuestion.subject} 퀴즈 결과 ({currentIndex + 1}/{results.length})</TitleText>
                <ContentText>{currentQuestion.content}</ContentText>
                <OptionGroup options={options} isResult={true} />
                <ExplanationTitle>해설</ExplanationTitle>
                <TextBox>
                    {currentQuestion.explanation}
                </TextBox>
                <NavigationWrapper>
                    {currentIndex > 0 && (
                        <NavigationText onClick={() => handleNavigation(-1)}>이전 문제 보기</NavigationText>
                    )}
                    {currentIndex < results.length - 1 && (
                        <NavigationText onClick={() => handleNavigation(1)}>다음 문제 보기</NavigationText>
                    )}
                </NavigationWrapper>
            </ResultWrapper>
        </Layout>
    );
};

export default Result;
