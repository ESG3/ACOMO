import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Option from './Option';

const OptionGroupContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const OptionGroup = ({ options: initialOptions, isResult, onOptionClick }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // initialOptions가 변경될 때마다 options 상태를 업데이트
        setOptions(initialOptions.map(option => ({
            text: option.text,
            isSelected: option.isSelected || false,
            correct: option.correct
        })));
    }, [initialOptions]);

    const handleOptionClick = (index) => {
        if (!isResult) {
            const updatedOptions = options.map((option, idx) => ({
                ...option,
                isSelected: idx === index, // 클릭된 옵션만 true, 나머지는 false
            }));
            setOptions(updatedOptions);
            onOptionClick(index); // 클릭 핸들러 호출
        }
    };

    return (
        <OptionGroupContainer>
            {options.map((option, index) => (
                <Option 
                    key={index} 
                    text={option.text} 
                    isSelected={option.isSelected} 
                    correct={option.correct}
                    isResult={isResult} 
                    onClick={() => handleOptionClick(index)} // 클릭 리스너 추가
                />
            ))}
        </OptionGroupContainer>
    );
};

export default OptionGroup;