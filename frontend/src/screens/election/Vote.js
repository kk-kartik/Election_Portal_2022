import React, { useState } from "react";
import { blindVote, encryptVote, verifySign } from "../../lib/encrypt";
import { getNEpair } from "../../lib/fetch";
import { signVote } from "../../lib/post";

function Vote() {
  const [vote, setVote] = useState(null);
  const [blindData, setblindData] = useState({});
  const [encryptedVote, setencryptedVote] = useState(null);
  const [signedVote, setsignedVote] = useState(null);
  const [NEpair, setNEpair] = useState(null);
  const [error, setError] = useState(null);
  const [isVerified, setVerified] = useState(false);

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
    console.log("Blinded data", blindedData);

    const sign_res = await signVote(blindedData.blindedVote);
    console.log("Sign api response", sign_res);
    if (sign_res.isError) {
      setError(sign_res.data || "Something went wrong!!Couldn't sign vote.");
      return;
    }

    const isVerified = verifySign(
      blindedData.r,
      encryptedData,
      sign_res.data.signed_data,
      keys_res.data
    );
    if (isVerified) {
      setVerified(true);
    }

    console.log(isVerified);
    setNEpair(keys_res.data);
    setsignedVote(sign_res.data.signed_data);
    setblindData(blindedData);
    setencryptedVote(encryptedData);
  };
  return (
    <div className="mt-20 mx-20">
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
