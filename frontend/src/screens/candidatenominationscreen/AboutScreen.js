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

const AboutScreen = () => {
  const candidate = useSelector((store) => store.candidate);
  const userData = useSelector((store) => store.auth);
  const [profileData, setProfileData] = useState(null);

  const [uploadImage, setUploadImage] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const dispatch = useDispatch();

  const [intro, setIntro] = useState(null);

  useEffect(() => {
    if (uploadImage) {
      setImageURL(URL.createObjectURL(uploadImage));
    } else {
      setImageURL(null);
    }
  }, [uploadImage]);

  const submitAboutData = async () => {
    if (!candidate) {
      navigate("/", { replace: true });
    }
    dispatch({
      type: SET_CANDIDATE_DATA,
      data: { image: uploadImage, about: intro },
    });

    try {
      const res = await userRegistration(profileData);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Something went wrong!Please try logging in again."
      );
    }
    navigate("/nominate/agendas");
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
            imageURL={imageURL || candidate?.image}
            uploadImage={uploadImage}
            setUploadImage={setUploadImage}
            intro={intro || candidate.about}
          />
        </div>
      </div>
      {error && <p className="text-red">{error}</p>}
      <p className="text-sm">Apply changes before proceeding</p>
      <button className={styles.button} onClick={submitAboutData}>
        Save & Next
      </button>
    </>
  );
};
export default AboutScreen;
