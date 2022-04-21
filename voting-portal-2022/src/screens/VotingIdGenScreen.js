import React, { useState, useEffect } from "react";
import StatusScreen from "./StatusScreen";
import { getVoterID } from "../api";

const VotingIdGenScreen = (props) => {
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg]  = useState("");

  const handleGetVoterId = (otp) => {
    console.log("xsxsxs");
    getVoterID(otp)
      .then((data) => {
        console.log("Voter id data: ", data);
      })
      .catch((e) => {
        console.log("Voter id error: ", e.response.data);
        setErrorMsg(e.response.data[0]);
      });
  };

  return (
    <StatusScreen>
      {success ? (
        <h1>Here is your Voter ID</h1>
      ) : (
        <div className="flex flex-col justify-start">
          <h1>Enter your OTP cdcdcd</h1>
          <div className="flex flex-col items-start">
            <input
              type="number"
              className="border-black-700 p-4"
              style={{ border: "1px solid #2B00FF" }}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={() => {handleGetVoterId(otp);console.log("sxsxs")}}>Continue</button>
          </div>
        </div>
      )}
    </StatusScreen>
  );
};

export default VotingIdGenScreen;
