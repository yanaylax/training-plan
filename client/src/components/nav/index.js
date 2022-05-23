import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ReactComponent as NovosLogo } from "../../assets/novos.svg";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../redux/auth/authSlice";

const NavContainer = styled.nav`
  height: 70px;
  padding: 12px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #635164;
  border-bottom: 2px solid #e7a957;
  & > .right-side {
    display: flex;
    align-items: center;
    gap: 24px;
    color: white;

    & > .logout-button {
      & > button {
        border: none;
        font-size: 16px;
        border-radius: 4px;
        padding: 8px 10px;
        background-color: #433558;
        color: #745e76;
        opacity: 0.8;
        font-weight: 600;
        &:hover {
          cursor: pointer;
          opacity: 1;
          transition: opacity 0.1s ease-in;
        }
      }
    }

    & > .user-details {
      display: flex;
      gap: 4px;
    }
    & > .name-bubble {
      height: 60px;
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      border-radius: 50%;
      background-color: #c82879;
      letter-spacing: 1px;
    }
  }
`;

export default function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <NavContainer>
      <NovosLogo />
      {user ? (
        <div className="right-side">
          <div className="user-details">
            <h3>{user.name}</h3>
            <h3>{user.lastName}</h3>
          </div>
          <div className="logout-button">
            <button onClick={onLogout}>Log out</button>
          </div>
          <div className="name-bubble">
            {user.name[0].toUpperCase()}
            {user.lastName[0].toUpperCase()}
          </div>
        </div>
      ) : (
        <></>
      )}
    </NavContainer>
  );
}
