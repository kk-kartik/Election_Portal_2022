import React from "react";
import iitglogo from "../assets/iitglogo.png";


const StatusScreen = (props) => {
  return (
    <div className="w-full h-screen flex flex-row justify-around items-center">
      <div className="flex flex-col justify-around items-center w-1/2">
        <div>
          <div className="w-24 h-24">
            <img src={iitglogo} alt="" />
          </div>
          <div className="text-6xl font-bold w-64 leading-snug text-gray-700 font-atkinson">
            Gymkhana Elections 2022
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center w-1/2">
        {props.children}
      </div>
    </div>
  );
};

export default StatusScreen;
