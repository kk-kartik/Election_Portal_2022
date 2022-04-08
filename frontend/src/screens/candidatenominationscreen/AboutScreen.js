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
  const [validationErrors, setValidationErrors] = useState(null);

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
    if (candidate.about != "" && !intro) {
      setValidationErrors((prev) => ({
        ...prev,
        about: "Intro should be minimum 50 words.",
      }));
      return;
    }
    const data = {};
    if (intro) {
      data["about"] = intro;
    } else {
      data["about"] = candidate.about;
    }
    if (uploadImage) {
      data["image"] = uploadImage;
    }
    updateNomination(data, "/nominate/agendas");
  };

  return (
    <>
      <div className="flex flex-col	md:flex-row ">
        <div className="w-full md:w-4/12">
          <WitnessDataForm
            data={profileData || userData?.euser}
            setData={setProfileData}
            validationErrors={validationErrors}
          />
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
