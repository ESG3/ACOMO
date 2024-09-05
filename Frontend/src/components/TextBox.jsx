import React from 'react';
import styled from 'styled-components';

const StyledTextField = styled.div`
    width: 100%;
    font-family: 'Pretendard', sans-serif;
    padding: 12px 16px;
    font-weight: 300;
    font-size: 16px;
    border: 2px solid #C9D7E8;
    border-radius: 20px;
    color: #292929;
    box-sizing: border-box;
    display: flex;
`;

const TextBox = ({ children }) => {
    return (
        <StyledTextField>{children}</StyledTextField>
    );
};

export default TextBox;
