import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useNavigationType } from "react-router-dom";
import { getUser } from "../../actions/auth";
import { API, updateCandidateData, uploadCredentials } from "../../api";
import Upload from "../../components/Nominate/Upload/Upload";
import UploadField from "../../components/Nominate/Upload/UploadField";
import UploadNavbar from "../../components/Nominate/UploadNavbar/UploadNavbar";
import { SET_CANDIDATE_DATA } from "../../constants";
import useNominate from "../../hooks/useNominate";
import styles from "../Register/RegisterScreen.module.css";
import SaveAndNext from "./SaveAndNext";
const CredentialsScreen = () => {
  const {
    candidate,
    error,
    message,
    loading,
    updateNomination,
    setError,
  } = useNominate();

  const [credentials, setCredentials] = useState([]);

  const navigate = useNavigate();

  const submitData = async (uploadData) => {
    const data = {
      credentials: {
        ...(candidate?.credentials ? candidate.credentials : {}),
        ...uploadData,
      },
    };
    updateNomination(data);
  };

  const handleFile = async (title, file) => {
    try {
      API.defaults.headers["Content-Type"] = "multipart/form-data";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", title);
      const res = await uploadCredentials(formData);
      submitData({ [title]: res.data.file });
      setCredentials([]);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Something went wrong!Please try logging in again."
      );
    }
  };

  const credDelete = async (title) => {
    const prevCredentials = candidate.credentials;
    const newCredentials = {};
    Object.keys(prevCredentials).forEach((k) => {
      if (k == title) return;
      newCredentials[k] = prevCredentials[k];
    });
    const data = {
      credentials: newCredentials,
    };
    updateNomination(data);
  };

  return (
    <>
      <UploadNavbar />
      {!candidate.credentials ||
        (Object.keys(candidate?.credentials).length == 0 && (
          <p>Upload all the important documents and credentials</p>
        ))}
      {candidate.credentials && Object.keys(candidate.credentials).length != 0 && (
        <>
          <h2 className="mb-2">Uploaded credentials</h2>

          {Object.keys(candidate.credentials).map((k, i) => (
            <UploadField
              handleFile={handleFile}
              credDelete={credDelete}
              title={k}
              link={candidate.credentials[k]}
            />
          ))}
        </>
      )}
      <Upload
        handleFile={handleFile}
        credentials={credentials}
        setCredentials={setCredentials}
      />
      <SaveAndNext
        error={error}
        message={message}
        loading={loading}
        submit={() => navigate("/nominate/witnesses")}
      />
    </>
  );
};
export default CredentialsScreen;
