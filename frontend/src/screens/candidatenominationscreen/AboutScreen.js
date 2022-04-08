import React, { useEffect, useState } from "react";
import RegisterForm from "../Register/RegisterForm";
import PicIntroUpload from "../../components/Nominate/PicIntroUpload/PicIntroUpload";
import styles from "../Register/RegisterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  API,
  fetchUserData,
  updateCandidateData,
  userRegistration,
} from "../../api";
import { getUser } from "../../actions/auth";
import { SET_CANDIDATE_DATA } from "../../constants";
import WitnessDataForm from "../Register/WitnessDataForm";
import useNominate from "../../hooks/useNominate";
import SaveAndNext from "./SaveAndNext";
import * as yup from "yup";
import { validateYupSchema } from "formik";
import CandidateRegistrationData from "../Register/CandidateRegistrationData";

const convertoUrl = (image) => {
  if (!image) return null;
  if (
    (typeof image === "string" || image instanceof String) &&
    image.startsWith("http")
  ) {
    return image;
  }
  return URL.createObjectURL(image);
};
const AboutScreen = () => {
  const {
    candidate,
    navigate,
    error,
    setError,
    loading,
    setLoading,
    message,
    updateNomination,
  } = useNominate();
  const userData = useSelector((store) => store.auth);
  const [profileData, setProfileData] = useState(null);

  const [uploadImage, setUploadImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [intro, setIntro] = useState(null);
  const [candidateData, setCandidateData] = useState(null);
  const [candidateDataErrors, setcandidateDataErrors] = useState(null);
  const [validationErrors, setValidationErrors] = useState(null);

  const onChange = (e) => {
    const cData = {
      cpi: candidate.cpi,
      contact_no: candidate.contact_no,
      backlogs: candidate.backlogs,
      active_backlogs: candidate.active_backlogs,
    };
    setCandidateData((prev) => ({
      ...cData,
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  let candidateSchema = yup.object().shape({
    cpi: yup.string().required("Cpi is required"),
    backlogs: yup.string().required("Please enter NA if None"),
    active_backlogs: yup.string().required("Please enter NA if None"),
    contact_no: yup
      .string()
      .required("Please enter your phone number")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Phone no should have atleast 6 digits"),
  });

  let aboutSchema = yup.object().shape({
    name: yup
      .string()
      .required("Please enter your name")
      .min(3, "Please enter a valid name"),
    degree: yup.string().required().min(1, "Please select your degree"),
    branch: yup.string().required().min(1, "Please select your branch"),
    hostel: yup.string().required().min(1, "Please select your hostel"),
    roll_number: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(9, "Roll number should have atleast 9 digits")
      .max(12, "Roll number shouldn't be more than 12 digits")
      .typeError("Please enter digits only"),
  });

  useEffect(() => {
    if (uploadImage) {
      setImageURL(URL.createObjectURL(uploadImage));
    } else {
      setImageURL(null);
    }
  }, [uploadImage]);

  const submitData = async () => {
    console.log(candidateData);
    if (profileData) {
      try {
        await aboutSchema.validate(profileData, { abortEarly: false });
      } catch (err) {
        if (err.inner) {
          setValidationErrors((prev) => {
            const newError = {};
            err.inner.forEach((e) => (newError[e.params.path] = e.errors[0]));
            return newError;
          });
        }
        return;
      }
      try {
        const res = await userRegistration(profileData);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Something went wrong!Please again or refresh the browser"
        );
        return;
      }
    }
    if (candidate.about == "" && !intro) {
      setValidationErrors((prev) => ({
        ...prev,
        about: "Intro should be minimum 50 words.",
      }));
      return;
    }
    let data = {};
    if (intro) {
      data["about"] = intro;
    } else {
      data["about"] = candidate.about;
    }
    if (uploadImage) {
      data["image"] = uploadImage;
    }
    if (candidateData) {
      try {
        await candidateSchema.validate(candidateData, { abortEarly: false });
      } catch (err) {
        if (err.inner) {
          setcandidateDataErrors((prev) => {
            const newError = {};
            err.inner.forEach((e) => (newError[e.params.path] = e.errors[0]));
            return newError;
          });
        }
        return;
      }
    }
    if (candidateData) {
      data = {
        ...data,
        ...candidateData,
      };
    }
    updateNomination(data, "/nominate/agendas");
  };

  return (
    <>
      <div className="flex flex-col	md:flex-row ">
        <div className="w-full md:w-4/12">
          <CandidateRegistrationData
            data={profileData || userData?.euser}
            setData={setProfileData}
            validationErrors={validationErrors}
          />
          <label for="cpi" className="font-semibold text-sm text-gray-800">
            Cpi:{" "}
          </label>
          <br />
          <input
            required
            type="text"
            id="cpi"
            name="cpi"
            className={`${styles.input} md:w-11/12 w-full mb-1`}
            defaultValue={candidate?.cpi}
            onChange={onChange}
          />
          {candidateDataErrors?.cpi ? (
            <p className="text-red-400 text-sm">{candidateDataErrors.cpi}</p>
          ) : (
            <br />
          )}
          <label
            for="contact_no"
            className="font-semibold text-sm text-gray-800"
          >
            Contact No:{" "}
          </label>
          <br />
          <input
            required
            type="text"
            id="contact_no"
            name="contact_no"
            className={`${styles.input} md:w-11/12 w-full mb-1`}
            defaultValue={candidate?.contact_no}
            onChange={onChange}
          />
          {candidateDataErrors?.contact_no ? (
            <p className="text-red-400 text-sm">
              {candidateDataErrors.contact_no}
            </p>
          ) : (
            <br />
          )}
          <label for="backlogs" className="font-semibold text-sm text-gray-800">
            Backlogs:{" "}
          </label>
          <br />
          <input
            required
            type="text"
            id="backlogs"
            name="backlogs"
            className={`${styles.input} md:w-11/12 w-full mb-1`}
            defaultValue={candidate?.backlogs}
            onChange={onChange}
          />
          {candidateDataErrors?.backlogs ? (
            <p className="text-red-400 text-sm">
              {candidateDataErrors.backlogs}
            </p>
          ) : (
            <br />
          )}
          <label for="backlogs" className="font-semibold text-sm text-gray-800">
            Active Backlogs:{" "}
          </label>
          <br />
          <input
            required
            type="text"
            id="active_backlogs"
            name="active_backlogs"
            className={`${styles.input} md:w-11/12 w-full mb-1`}
            defaultValue={candidate?.backlogs}
            onChange={onChange}
          />
          {candidateDataErrors?.active_backlogs ? (
            <p className="text-red-400 text-sm">
              {candidateDataErrors.active_backlogs}
            </p>
          ) : (
            <br />
          )}
        </div>
        <div className="w-full">
          <PicIntroUpload
            setIntro={setIntro}
            imageURL={imageURL || convertoUrl(candidate?.image)}
            uploadImage={uploadImage}
            setUploadImage={setUploadImage}
            setImageURL={setImageURL}
            intro={intro || candidate?.about}
            validationErrors={validationErrors}
          />
        </div>
      </div>
      <SaveAndNext
        error={error}
        message={message}
        loading={loading}
        submit={submitData}
      />
    </>
  );
};
export default AboutScreen;
