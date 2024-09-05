import React from 'react';
import { GoCheckCircleFill, GoCheckCircle } from "react-icons/go";
import styled from 'styled-components';

const RadioIcon = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ isSelected, isResult, correct }) => {
        if (isResult && correct) return '#7ABD70';
        if (!isSelected) return '#292929';
        if (isResult && !correct) return '#E38275';
        return '#7092BD';
    }};
`;

const RadioButton = ({ isSelected, isResult, correct }) => {
    return (
        <RadioIcon isSelected={isSelected} isResult={isResult} correct={correct}>
            {isSelected || (!isSelected && isResult && correct != null) ? <GoCheckCircleFill size={24} /> : <GoCheckCircle size={24} />}
        </RadioIcon>
    );
};

export default RadioButton;