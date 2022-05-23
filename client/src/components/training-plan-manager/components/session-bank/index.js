import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { sessionBank } from "../../../../redux/sessions/sessionsSlice";
import { SessionList } from "../../styles";
import SingleSession from "../single-session";

export default function SessionBank() {
  const sessionList = useSelector(sessionBank);

  const sortedList = sessionList
    .slice()
    .sort((first, second) => first.index - second.index);
  const mappedList = sortedList
    ? sortedList.map((session, index) => {
        return (
          <SingleSession
            key={session._id}
            list="bank"
            index={index}
            session={session}
          />
        );
      })
    : [];

  return (
    <Droppable key="session-bank-key" droppableId="session-bank-key">
      {(provided, snapshot) => (
        <SessionList {...provided.droppableProps} ref={provided.innerRef}>
          {mappedList.length > 0 && mappedList}
          {provided.placeholder}
        </SessionList>
      )}
    </Droppable>
  );
}
