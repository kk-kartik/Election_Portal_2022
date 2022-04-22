import React from "react";
import StatusScreen from "./StatusScreen";
import SuccessMessage from "../components/SuccessMessage/SuccessMessage";
import { useLocation } from "react-router-dom";

export const VotingResScreen = () => {
  const location = useLocation();
  console.log("[ye hamari location]", location);
  const { transaction_id, voter_id, block_id, gas } = location.state;
  return (
    <div>
      <StatusScreen>
        <SuccessMessage
          transaction_id={transaction_id || "dklfjd"}
          voter_id={voter_id || "dkfdkfj"}
          block_id={block_id || "dkfjd"}
          gas={gas || "dklfd"}
        />
      </StatusScreen>
    </div>
  );
};
