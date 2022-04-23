import React from "react";
import StatusScreen from "./StatusScreen";
import SuccessMessage from "../components/SuccessMessage/SuccessMessage";
import { useLocation, Redirect } from "react-router-dom";

export const VotingResScreen = () => {
  const location = useLocation();
  //console.log("[ye hamari location]", location);
  const renderComp = ()=> {
    if(location.state){
      const { transaction_id, voter_id, block_id, gas, isShow } =
        location.state;
      console.log("[this is what we have to check] : ", {
        transaction_id,
        voter_id,
        block_id,
        gas,
        isShow,
      });
    }else{
      return <Redirect to="/"/>
    }
  }
  
  return (
    <div>
      {renderComp()}
    </div>
  );
};
