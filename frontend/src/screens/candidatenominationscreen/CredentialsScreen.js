import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigationType } from "react-router-dom";
import { getUser } from "../../actions/auth";
import { API, updateCandidateData, uploadCredentials } from "../../api";
import Upload from "../../components/Nominate/Upload/Upload";
import UploadNavbar from "../../components/Nominate/UploadNavbar/UploadNavbar";
import { SET_CANDIDATE_DATA } from "../../constants";
import styles from "../Register/RegisterScreen.module.css";
const CredentialsScreen = () => {
  const candidate = useSelector((store) => store.candidate);
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleFile = async (title, file) => {
    try {
      API.defaults.headers["Content-Type"] = "multipart/form-data";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", title);
      const res = await uploadCredentials(formData);
      setCredentials((prev) => ({ ...prev, [title]: res.data.file }));
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Something went wrong!Please try logging in again."
      );
    }
  };

  const submitCredentils = async () => {
    try {
      dispatch({
        type: SET_CANDIDATE_DATA,
        data: {
          credentials: {
            ...(candidate?.credentials ? candidate.credentials : {}),
            ...credentials,
          },
        },
      });
      navigate("/nominate/video");
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
      <UploadNavbar />
      {candidate.credentials && Object.keys(candidate.credentials).length != 0 && (
        <>
          <h2>Previous uploaded credentials</h2>
          <div>
            <ul class="bg-white rounded-lg w-96 text-gray-900 mb-4 mt-2 flex flex-wrap gap-3">
              {Object.keys(candidate.credentials).map((k, i) => (
                <li key={i}>
                  <a
                    href={candidate.credentials[k]}
                    target="_blank"
                    className="underline text-blue-500"
                  >
                    {k}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <Upload handleFile={handleFile} />
      {error && <p className="text-red">{error}</p>}
      <p className="text-sm mt-6">Apply changes before proceeding</p>
      <button
        className={`px-5 text-white  ${styles.button}`}
        onClick={submitCredentils}
      >
        Save & Next
      </button>
    </>
  );
};
export default CredentialsScreen;
