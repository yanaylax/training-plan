import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  font-size: 20px;
  border-radius: 6px;
  border: none;
  background-color: #433558;
  opacity: 0.8;
  transition: opacity 0.1s ease-in;
  color: white;
  padding: 12px 16px;
  width: 70%;

  &::placeholder {
    color: white;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 1;
  }
`;

export default function Input({
  type,
  onChange,
  value,
  placeholder,
  name,
  autocomplete,
}) {
  return (
    <StyledInput
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autocomplete={autocomplete ? "on" : "off"}
    />
  );
}
