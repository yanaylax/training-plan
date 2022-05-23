import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TrainingPlanManager from "../components/training-plan-manager";
import styled from "styled-components";

const TrainingManagerPageContainer = styled.div`
  & > h1 {
    padding: 80px 0 0 80px;
    color: white;
  }
`;

export default function TrainingManagerPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <TrainingManagerPageContainer>
      <h1>TRAINING PLAN</h1>
      <TrainingPlanManager />
    </TrainingManagerPageContainer>
  );
}
