import React from "react";
import styled from "styled-components";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const LoginContainer = styled.div`
  margin: 160px 80px;
  min-height: calc(100vh - 390px);
  border-radius: 16px;
  border: 8px solid #c82879;
  background-color: #635164;
  display: flex;
  overflow: hidden;
  background-color: #231538;
  & > * {
    flex: 1;
  }
`;

export default function Login() {
  return (
    <LoginContainer>
      <LoginForm />
      <RegisterForm />
    </LoginContainer>
  );
}
