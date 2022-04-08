import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useNavigationType } from "react-router-dom";
import { getUser } from "../../actions/auth";
import { API, updateCandidateData, uploadCredentials } from "../../api";
import FixedUploadField from "../../components/Nominate/Upload/FixedUploadField";
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
    setMessage,
    updateNomination,
    setError,
    isNominationComplete,
  } = useNominate();

  const [credentials, setCredentials] = useState([]);

  const navigate = useNavigate();
  const userData = useSelector((store) => store.auth);

  const submitData = async (uploadData) => {
    const data = {
      credentials: {
        ...(candidate?.credentials ? candidate.credentials : {}),
        ...uploadData,
      },
    };
    updateNomination(data);
  };

  console.log("Candidate profile: ", candidate);

  const handleFile = async (title, file) => {
    setMessage("Uploading credentials");
    try {
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

    setMessage(null);
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

      {/* <h2 className="mb-2">Uploaded credentials</h2> */}

      <FixedUploadField
        handleFile={handleFile}
        credDelete={credDelete}
        title="Grade Card"
        link={candidate.credentials && candidate.credentials["Grade Card"]}
      />

      {userData?.euser?.degree === "P" && (
        <FixedUploadField
          handleFile={handleFile}
          credDelete={credDelete}
          title="Thesis incomplete proof"
          link={
            candidate.credentials &&
            candidate.credentials["Thesis incomplete proof"]
          }
        />
      )}
      {candidate.credentials && Object.keys(candidate.credentials).length != 0 && (
        <>
          {Object.keys(candidate.credentials).map((k, i) => {
            if (k !== "Grade Card" && k !== "Thesis incomplete proof"){
              return (
                <UploadField
                  handleFile={handleFile}
                  credDelete={credDelete}
                  title={k}
                  link={candidate.credentials[k]}
                />
              );
            }
          })}
        </>
      )}
      <Upload
        handleFile={handleFile}
        credentials={credentials}
        setCredentials={setCredentials}
        isNominationComplete={isNominationComplete}
      />
      <br />
      {/* <SaveAndNext
        error={error}
        message={message}
        loading={loading}
        submit={() => navigate("/nominate/witnesses")}
      /> */}
    </>
  );
};
export default CredentialsScreen;
