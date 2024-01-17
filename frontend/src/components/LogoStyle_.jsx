import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #3498db;
  color: white;
  font-size: 1.2em;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  ${(props) =>
    props.primary &&
    `
    background-color: #e74c3c;
  `}
`;

const LogoStyle_ = () => {
  return (
    <div>
      <h1>스타일 버튼 예시에요</h1>
      <StyledButton>버튼임</StyledButton>
      <StyledButton primary>이것도 버튼임</StyledButton>
    </div>
  );
};

export default LogoStyle_;