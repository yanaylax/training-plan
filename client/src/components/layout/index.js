import React from "react";
import styled from "styled-components";
import Nav from "../nav";

const LayoutContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #231538;
`;

export default function Layout({ children }) {
  return (
    <LayoutContainer>
      <Nav />
      {children}
    </LayoutContainer>
  );
}
