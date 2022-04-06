import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigationType } from "react-router-dom";
import { getUser } from "../../actions/auth";
import { API, updateCandidateData, uploadCredentials } from "../../api";
import { SET_CANDIDATE_DATA } from "../../constants";
import useNominate from "../../hooks/useNominate";
import styles from "../Register/RegisterScreen.module.css";
import SaveAndNext from "./SaveAndNext";

const VideoScreen = () => {
  const {
    error,
    message,
    loading,
    candidate,
    setError,
    updateNomination,
  } = useNominate();

  const videoRef = useRef(null);

  const submitData = async () => {
    if (!videoRef.current.value) {
      setError("Please add valid url");
      return;
    }
    const data = { video: videoRef.current.value };
    updateNomination(data, "/nominate/witnesses");
  };
  return (
    <>
      <p>Enter Youtube Video url.</p>
      <label for="video" className="font-normal mb-4 text-sm text-gray-800">
        Video Url
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
      />
      <SaveAndNext
        error={error}
        message={message}
        loading={loading}
        submit={submitData}
      />
    </>
  );
};
export default VideoScreen;
