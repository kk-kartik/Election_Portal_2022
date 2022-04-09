import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigationType } from "react-router-dom";
import { getUser } from "../../actions/auth";
import { API, updateCandidateData, uploadCredentials } from "../../api";
import { SET_CANDIDATE_DATA } from "../../constants";
import useNominate from "../../hooks/useNominate";
import styles from "../Register/RegisterScreen.module.css";
import SaveAndNext from "./SaveAndNext";
import YoutubeEmbed from "../../components/Home/Nomination/Video/YoutubeEmbed";
const VideoScreen = () => {
  const {
    error,
    message,
    loading,
    candidate,
    setError,
    updateNomination,
    isNominationComplete,
  } = useNominate();

  const videoRef = useRef(null);
  let embedId = "";
  const CheckURL = (value) => {
    var regEx =
      "^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?.com|youtu.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)";
    var matches = value.match(regEx);
    if (matches) {
      return matches[1];
    }
    return false;
  };
  const submitData = async () => {
    console.log(videoRef.current.value);
    console.log(CheckURL(videoRef.current.value));
    if (!videoRef.current.value || !CheckURL(videoRef.current.value)) {
      setError("Please add valid url");
      return;
    }
    embedId = CheckURL(videoRef.current.value);
    console.log(embedId);
    const data = { video: videoRef.current.value };
    updateNomination(data, "/nominate/witnesses");
    setError(null);
  };
  return (
    <>
      {/* <p>Enter Youtube Video url.</p> */}
      <label for="video" className="font-medium mb-4 text-base text-gray-800">
        Enter Youtube Video Url :
      </label>
      <br />
      <input
        required
        type="text"
        id="video"
        name="video"
        className={`${styles.input} md:w-1/2 lg:w-2/5 w-full`}
        defaultValue={candidate?.video}
        ref={videoRef}
        disabled={isNominationComplete}
      />
      {candidate.video && (
        <div className="w-full md:w-1/2 my-4">
          <YoutubeEmbed embedId={CheckURL(candidate.video)} />
        </div>
      )}

      {!isNominationComplete && (
        <SaveAndNext
          error={error}
          message={message}
          loading={loading}
          submit={submitData}
        />
      )}
    </>
  );
};
export default VideoScreen;
