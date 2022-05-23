import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import SessionButtons from "./components/SessionButtons";

const SingleSessionContainer = styled.div`
  background-color: #433558;
  border-radius: 6px;
  display: flex;
  gap: 32px;
  color: white;
  font-size: 18px;
  overflow: hidden;
  z-index: 0;
  transition: transform 0.1s ease;
  justify-content: space-between;
  border-left: 4px solid #c84461;
  &.completed {
    border-left: 4px solid #2cad6d;
  }
  &:hover {
    transform: scale(1.06);
    z-index: 1;
    cursor: pointer;
    & > .button-container {
      z-index: 2;
    }
  }
  & > .session-info {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px 16px;
    max-width: 60%;
    & > h3 {
      color: #dfdae7;
      font-size: 16px;
      opacity: 0.8;
    }
  }
  & > .button-container {
    display: flex;
  }
`;

export default function SingleSession({ session, index, list }) {
  return (
    <Draggable key={session._id} draggableId={session._id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <SingleSessionContainer
              className={session.completed ? "completed" : ""}
            >
              <div className="session-info">
                <h3>{session.title}</h3>
                <h4>{session.description}</h4>
              </div>
              <SessionButtons session={session} list={list} />
            </SingleSessionContainer>
          </div>
        );
      }}
    </Draggable>
  );
}
