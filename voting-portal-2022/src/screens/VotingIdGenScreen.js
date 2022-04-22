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
        <>
          {/* <div className="flex flex-col justify-start">
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
        </div> */}
          <div className="w-80">
            <div className="flex flex-col items-center justify-between p-4">
              <div className="text-4xl font-atkinson">
                <p className="text-gray-600">Enter Your OTP</p>
              </div>
              <div>
                <input
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-64 h-12 p-2 border-2 mt-5 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl "
                />
              </div>
              <div>
                <button
                  onClick={() => {
                    handleGetVoterId(otp);
                    console.log("sxsxs");
                  }}
                  className="w-64 bg-blueBg mt-5 h-12 text-white rounded-lg font-roboto"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </StatusScreen>
  );
};

export default VotingIdGenScreen;
