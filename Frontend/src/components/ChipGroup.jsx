import React from 'react';
import styled from 'styled-components';

// ChipGroup 스타일 정의
const ChipGroupContainer = styled.div`
  display: flex;
  gap: 32px; /* Chip 사이의 가로 간격 */
  flex-wrap: wrap; /* 필요 시 다음 줄로 넘기기 */
`;

const ChipGroup = ({ children }) => {
  return <ChipGroupContainer>{children}</ChipGroupContainer>;
};

export default ChipGroup;