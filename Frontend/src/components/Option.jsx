import React from 'react';
import styled from 'styled-components';
import RadioButton from './RadioButton';

const OptionContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    width: 100%; /* 부모 요소의 전체 너비를 사용 */
`;

const StyledTextField = styled.div`
    flex-grow: 1; /* 남은 공간을 모두 차지 */
    font-family: 'Pretendard', sans-serif;
    padding: 12px 16px;
    font-weight: 300;
    font-size: 16px;
    border: 2px solid #C9D7E8;
    border-radius: 20px;
    color: #292929;
    margin-left: 20px; /* RadioButton과 TextField 사이에 간격 */
    box-sizing: border-box;
    display: flex;
    align-items: center; /* 텍스트가 중앙에 위치하도록 */
`;

const Option = ({ text, isSelected, correct, isResult, onClick }) => {
    return (
        <OptionContainer isResult={isResult} onClick={onClick}>
            <RadioButton isSelected={isSelected} isResult={isResult} correct={correct} />
            <StyledTextField>{text}</StyledTextField>
        </OptionContainer>
    );
};

export default Option;
