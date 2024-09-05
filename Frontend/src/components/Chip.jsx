import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import React from 'react';

const StyledChip = styled.div`
    background-color: #C9D7E8;
    color: black;
    font-size: 26px;
    font-family: 'Bebas Neue', sans-serif;
    border-radius: 40px;
    padding: 16px 24px;
    display: inline-block;
    cursor: pointer;
    text-align: center;
    user-select: none;
`;

const Chip = ({ subject }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/solve/${subject}`);
    };

    return (
        <StyledChip onClick={handleClick}>
            {subject === 'Git' ? 'Git/Github' : subject}
        </StyledChip>
    )
};

export default Chip;