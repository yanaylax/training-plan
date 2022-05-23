import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { sessionPlan } from "../../../../redux/sessions/sessionsSlice";
import { SessionList } from "../../styles";
import SingleSession from "../single-session";

export default function TrainingPlan() {
  const sessionList = useSelector(sessionPlan);
  const sortedList = sessionList
    .slice()
    .sort((first, second) => first.index - second.index);
  const mappedList = sortedList
    ? sortedList.map((session, index) => {
        return (
          <SingleSession
            key={session._id}
            list="plan"
            index={index}
            session={session}
          />
        );
      })
    : [];

  return (
    <Droppable key="training-plan-key" droppableId="training-plan-key">
      {(provided, snapshot) => (
        <SessionList {...provided.droppableProps} ref={provided.innerRef}>
          {mappedList.length > 0 && mappedList}
          {provided.placeholder}
        </SessionList>
      )}
    </Droppable>
  );
}
