import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 240px;
  border: none;
  font-size: 24px;
  border-radius: 6px;
  margin-top: 48px;
  padding: 16px;
  background-color: #2cad6d;
  color: white;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

export default function Button({ text }) {
  return <StyledButton type="submit">{text}</StyledButton>;
}
