import React, { useState } from "react";
import { blindVote, encryptVote, verifySign } from "../../lib/encrypt";
import { getNEpair } from "../../lib/fetch";
import { signVote } from "../../lib/post";

import MicrosoftLogin from "react-microsoft-login";
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
    const res = await axios.get(
      "http://localhost:8000/elections_api/auth/outlook/signin/",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );

    const res1 = await axios.get(
      "http://localhost:8000/elections_api/auth/token/refresh/",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
      <MicrosoftLogin
        clientId={"f2dc9516-b846-4460-9c99-c46cf28b869b"}
        graphScopes={["6974450a-7569-4f53-ab04-47aa8b84687f/read"]}
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
      <p>Encrypted vote:{JSON.stringify({ data: encryptedVote })}</p>
      <p>Blined vote:{JSON.stringify({ data: blindData })}</p>
      <p>SignedVote vote:{JSON.stringify({ data: signedVote })}</p>
      <p>isVerified:{isVerified ? 1 : 0}</p>
      <p>Error: {JSON.stringify({ data: error })}</p>
      <p>NEpair: {JSON.stringify({ data: NEpair })}</p>
    </div>
  );
}

export default Vote;
