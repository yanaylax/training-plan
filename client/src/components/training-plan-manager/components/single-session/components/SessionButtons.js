import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  deleteSession,
  updateSession,
} from "../../../../../redux/sessions/sessionsSlice";
import { ReactComponent as ChevronRight } from "../../../../../assets/chevron-right.svg";
import { ReactComponent as RestartIcon } from "../../../../../assets/restart.svg";
import { ReactComponent as DeleteIcon } from "../../../../../assets/delete.svg";
import { ReactComponent as Checkmark } from "../../../../../assets/check.svg";

const StyledButton = styled.button`
  font-size: 20px;
  border: none;
  width: 60px;
  background-color: #e7a957;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 3px solid #c84461;
  & > svg {
    height: 30px !important;
    width: 30px !important ;
    fill: #231538 !important;
    &.checkmark-svg {
      height: 50px !important;
      width: 50px !important ;
    }
  }
  &:hover {
    cursor: pointer;
    transition: background-color 0.1s ease-in;

    &.add {
      background-color: #2cad6d;
    }
    &.remove {
      background-color: #e91e63;
    }
  }
  &.completed {
    background-color: #2cad6d;
    &:hover {
      background-color: #e91e63;
    }
  }
`;

export default function SessionButtons({ list, session }) {
  const dispatch = useDispatch();

  const addToPlan = () =>
    dispatch(updateSession({ ...session, inPlan: true, type: "change-plan" }));
  const completeSession = () =>
    dispatch(
      updateSession({
        ...session,
        completed: !session.completed,
        type: "change-completed",
      })
    );
  const removeFromPlan = () =>
    dispatch(updateSession({ ...session, inPlan: false, type: "change-plan" }));
  const removeFromBank = () => dispatch(deleteSession(session._id));

  return list === "bank" ? (
    <div className="button-container">
      <StyledButton className="remove" onClick={removeFromBank}>
        <DeleteIcon fill="#433558" />
      </StyledButton>
      <StyledButton className="add" onClick={addToPlan}>
        <ChevronRight />
      </StyledButton>
    </div>
  ) : (
    <div className="button-container">
      <StyledButton className="remove" onClick={removeFromPlan}>
        <RestartIcon />
      </StyledButton>
      <StyledButton
        className={`add ${session.completed && "completed"}`}
        onClick={completeSession}
      >
        <Checkmark className="checkmark-svg" />
      </StyledButton>
    </div>
  );
}
