import React, { useEffect } from "react";
import styled from "styled-components";
import TrainingPlan from "./components/training-plan";
import { DragDropContext } from "react-beautiful-dnd";
import CreateSession from "./components/create-session";
import SessionBank from "./components/session-bank";
import { useDispatch } from "react-redux";
import {
  clearTrainingPlan,
  getSessions,
  onDragEnd,
  reset,
  sessionBank,
  sessionPlan,
  updateAllSessions,
} from "../../redux/sessions/sessionsSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SessionListsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;

  & > * {
    flex: 1;
    max-width: 50%;
    & > .title-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    & > .title-container > h2 {
      height: 50px;
      margin-bottom: 16px;
      font-size: 18px;
      color: white;
      font-weight: 500;
      ::before {
        content: "";
        height: 10px;
        width: 10px;
        background-color: #c82879;
        border-radius: 50%;
        display: inline-block;
        margin-right: 8px;
      }
    }
    & > .title-container > h2 {
      margin-bottom: 0;
      height: auto;
    }
    & > .title-container {
      margin-bottom: 16px;
      height: 50px;
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
  }
`;

const TrainingPlanManagerContainer = styled.div`
  display: flex;
  padding: 80px;
  gap: 32px;
`;

export default function TrainingPlanManager() {
  const { user } = useSelector((state) => state.auth);
  const bank = useSelector(sessionBank);
  const plan = useSelector(sessionPlan);
  const { updateOnDrag } = useSelector((state) => state.sessions);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, isLoading, message } = useSelector(
    (state) => state.sessions
  );

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user) {
      dispatch(getSessions());
    }
    return () => dispatch(reset());
  }, [navigate, user, dispatch, isError, message]);

  useEffect(() => {
    if (updateOnDrag) {
      const sessions = [...bank, ...plan];
      dispatch(updateAllSessions(sessions));
    }
  }, [bank, plan, dispatch, updateOnDrag]);

  const dragHandler = async (result) => {
    dispatch(onDragEnd(result));
  };

  return (
    <TrainingPlanManagerContainer>
      <CreateSession />
      <SessionListsContainer>
        <DragDropContext onDragEnd={dragHandler}>
          <div>
            <div className="title-container">
              <h2>Session bank</h2>
            </div>
            <SessionBank />
          </div>
          <div>
            <div className="title-container">
              <h2>Training plan</h2>
              <button
                onClick={() => dispatch(clearTrainingPlan())}
                className="clear-plan"
              >
                Clear training plan
              </button>
            </div>
            <TrainingPlan />
          </div>
        </DragDropContext>
      </SessionListsContainer>
    </TrainingPlanManagerContainer>
  );
}
