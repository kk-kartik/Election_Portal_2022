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

  useEffect(() => {
    if (uploadImage) {
      setImageURL(URL.createObjectURL(uploadImage));
    } else {
      setImageURL(null);
    }
  }, [uploadImage]);

  const submitData = async () => {
    try {
      const res = await userRegistration(profileData);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Something went wrong!Please try logging in again."
      );
    }
    const data = { image: uploadImage, about: intro };
    updateNomination(data, "/nominate/agendas");
  };

  return (
    <>
      <div className="flex flex-col	md:flex-row ">
        <div className="w-full md:w-4/12">
          <WitnessDataForm
            data={profileData || userData?.euser}
            setData={setProfileData}
          />
        </div>
        <div className="w-full">
          <PicIntroUpload
            setIntro={setIntro}
            imageURL={imageURL || convertoUrl(candidate?.image)}
            uploadImage={uploadImage}
            setUploadImage={setUploadImage}
            intro={intro || candidate?.about}
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
