import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigationType } from "react-router-dom";
import { getUser } from "../../actions/auth";
import { API, updateCandidateData, uploadCredentials } from "../../api";
import { SET_CANDIDATE_DATA } from "../../constants";
import styles from "../Register/RegisterScreen.module.css";

const VideoScreen = () => {
  const candidate = useSelector((store) => store.candidate);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const dispatch = useDispatch();

  const submitData = async () => {
    if (!videoRef.current.value) {
      setError("Please add valid url");
      return;
    }
    try {
      // API.defaults.headers["Content-Type"] = "application/json";
      // const res = await updateCandidateData(candidate.id, {
      //   video: videoRef.current.value,
      // });
      // await dispatch(getUser());
      // navigate("/nominate/witnesses");
      dispatch({
        type: SET_CANDIDATE_DATA,
        data: { video: videoRef.current.value },
      });
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.detail ||
          "Something went wrong!Please try logging in again."
      );
    }
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
        onChange={submitData}
      />
    </>
  );
};
export default VideoScreen;
