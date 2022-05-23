import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  addSession,
  changeCurrentSession,
  currentSession,
  sessionBank,
} from "../../../../redux/sessions/sessionsSlice";

const CreateSessionForm = styled.form`
  height: 300px;
  padding: 16px;
  flex-basis: 40%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 2px solid #e91e63;
  border-radius: 6px;
  border-left: none;
  input,
  textarea,
  button {
    font-size: 20px;
    border-radius: 6px;
    border: none;
    background-color: #433558;
    opacity: 0.8;
    transition: opacity 0.1s ease-in;
    color: white;
    padding: 8px 16px;
    &::placeholder {
      color: white;
    }
    &:focus {
      outline: none;
    }
    &:hover {
      opacity: 1;
    }
  }
  input {
    flex-basis: 15%;
  }
  textarea {
    flex-basis: 85%;
    resize: none;
  }
  button {
    opacity: 1;
    height: 70px;
    font-weight: bold;
    background-color: #2cad6d;

    &:hover {
      cursor: pointer;
    }
  }
`;

export default function CreateSession() {
  const session = useSelector(currentSession);
  const bank = useSelector(sessionBank);
  const dispatch = useDispatch();
  return (
    <CreateSessionForm
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(addSession({ ...session, index: bank.length }));
      }}
    >
      <input
        onChange={(e) =>
          dispatch(
            changeCurrentSession({ key: "title", value: e.target.value })
          )
        }
        required
        minLength={2}
        value={session.title}
        placeholder="Title"
        type="text"
      />
      <textarea
        required
        onChange={(e) =>
          dispatch(
            changeCurrentSession({
              key: "description",
              value: e.target.value,
            })
          )
        }
        value={session.description}
        placeholder="Description"
      />
      <button type="submit">ADD NEW SESSION</button>
    </CreateSessionForm>
  );
}
