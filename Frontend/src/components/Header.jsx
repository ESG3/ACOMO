import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

// Header 스타일링
const HeaderContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
`;

const Title = styled.div`
  font-family: "Bungee Shade", sans-serif;
  color: white;
  font-weight: 400;
  font-size: 50px;
  cursor: pointer;
`;

const Header = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    console.log('Title clicked');
    console.log('isLoggedIn:', isLoggedIn);
    if (isLoggedIn) {
      navigate('/mypage'); // 로그인 상태이면 MyPage로 이동
    } else {
      navigate('/'); // 로그인하지 않았으면 Home으로 이동
    }
  };

  return (
    <>
      <HeaderContainer>
        <Title onClick={handleTitleClick}>ACOMO</Title>
      </HeaderContainer>
    </>
  );
};

export default Header;
