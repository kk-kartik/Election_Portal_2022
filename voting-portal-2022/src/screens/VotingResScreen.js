import React from "react";
import StatusScreen from "./StatusScreen";
import SuccessMessage from "../components/SuccessMessage/SuccessMessage";
import { useLocation } from "react-router-dom";

export const VotingResScreen = () => {
  const location = useLocation();
  console.log("[ye hamari location]", location);
  return (
    <div>
      <StatusScreen>{/* <SuccessMessage /> */}</StatusScreen>
    </div>
  );
};
