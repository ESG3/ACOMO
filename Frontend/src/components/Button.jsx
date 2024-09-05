import React from 'react';
import styled from 'styled-components';

// 스타일 정의
const StyledButton = styled.div`
    background-color: #3067A8;
    color: #ffffff;
    font-size: 20px;
    font-family: 'Pretendard', sans-serif;
    font-weight: 600; /* Semibold */
    border-radius: 8px;
    width: 260px;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;

    &:hover {
        background-color: #255688; /* Hover 시 약간 어두운 색으로 변경 */
    }

    &:active {
        background-color: #1d4371; /* Active 상태에서 더 어두운 색으로 변경 */
    }
`;

// 버튼 컴포넌트 정의
const Button = ({ text, onClick }) => {
    return (
        <StyledButton onClick={onClick}>
            {text}
        </StyledButton>
    );
};

export default Button;