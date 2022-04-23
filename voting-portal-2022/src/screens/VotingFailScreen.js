import React from "react";
import StatusScreen from "./StatusScreen";
import SuccessMessage from "../components/SuccessMessage/SuccessMessage";
import FailMessage from "../components/FailMessage/FailMessage";
import { useLocation } from "react-router-dom";

export const VotingFailScreen = () => {
  const location = useLocation();
  //console.log("[ye hamari location]", location);
  const { data } = location.state;
  console.log("[this is what we have to check] : ", {
    data,
  });
  return (
    <div>
      <StatusScreen>
        <FailMessage message={data} />
      </StatusScreen>
    </div>
  );
};
