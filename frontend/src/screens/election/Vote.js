import React, { useState } from "react";
import { blindVote, encryptVote, verifySign } from "../../lib/encrypt";
import { getNEpair } from "../../lib/fetch";
import { signVote } from "../../lib/post";

import MicrosoftLogin from "react-microsoft-login";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

function Vote() {
  const [vote, setVote] = useState(null);
  const [blindData, setblindData] = useState({});
  const [encryptedVote, setencryptedVote] = useState(null);
  const [signedVote, setsignedVote] = useState(null);
  const [NEpair, setNEpair] = useState(null);
  const [error, setError] = useState(null);
  const [isVerified, setVerified] = useState(false);

  const authHandler = async (err, data) => {
    console.log(data, err);
    const accessToken = data["accessToken"];
    const res = await axios.post(
      `${process.env.REACT_APP_BASEAPIURL}/auth/social/outlook/`,
      {
        access_token: accessToken,
      },
      {
        withCredentials: true,
      }
    );

    const res1 = await axios.post(
      `${process.env.REACT_APP_BASEAPIURL}/elections_api/auth/token/refresh/`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log(res1);
  };

  const responseGoogle = async (data) => {
    console.log(data);
    const accessToken = data["accessToken"];
    const res = await axios.post(
      `${process.env.REACT_APP_BASEAPIURL}elections_api/auth/social/google/`,
      {
        access_token: accessToken,
      },
      {
        withCredentials: true,
      }
    );

    const res1 = await axios.post(
      `${process.env.REACT_APP_BASEAPIURL}elections_api/auth/token/refresh/`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log(res1);
  };

  const handleChange = (e) => {
    setVote(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const keys_res = await getNEpair();
    console.log("Retrieve api response", keys_res);
    if (keys_res.isError) {
      setError(
        keys_res.data || "Something went wrong!!Couldn't get key value pairs"
      );
      return;
    }

    const encryptedData = encryptVote(vote);
    console.log("Encrypted data", encryptedData);
    const blindedData = blindVote(encryptedData, keys_res.data);
    console.log("Blinded data", blindedData.blindedVote);
    console.log(blindedData.r);
    const sign_res = await signVote(blindedData.blindedVote);
    console.log("Sign api response", sign_res);
    if (sign_res.isError) {
      setError(sign_res.data || "Something went wrong!!Couldn't sign vote.");
      return;
    }

    const isVerified = verifySign(
      blindedData.r,
      encryptedData,
      sign_res.data.signed,
      keys_res.data
    );
    console.log(isVerified);
    if (isVerified) {
      setVerified(true);
    }
    setNEpair(keys_res.data);
    setsignedVote(sign_res.data.signed);
    setblindData(blindedData);
    setencryptedVote(encryptedData);
  };
  return (
    <div className="mt-20 mx-20">
      <GoogleLogin
        clientId="774598959771-jilp7jr6a3677htqaf1na9adqoj3aolo.apps.googleusercontent.com"
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Google login
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
      />
      ,
      <MicrosoftLogin
        clientId={"495b7037-aa83-4595-a842-8a69daaf2f20"}
        redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
        authCallback={authHandler}
        tenantUrl={
          "https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c"
        }
        authCallback={authHandler}
      />
      <form onSubmit={handleSubmit}>
        <label>Enter your vote</label>
        <input
          type="text"
          onChange={handleChange}
          className="block border-black border-2 px-2"
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 py-1 rounded-sm my-4 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Vote;
