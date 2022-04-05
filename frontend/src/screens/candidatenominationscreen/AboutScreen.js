import React from "react";
import RegisterForm from "../Register/RegisterForm";
import PicIntroUpload from "../../components/Nominate/PicIntroUpload/PicIntroUpload";
import styles from "../Register/RegisterScreen.module.css";
const AboutScreen = () => {
  const myclick = () => {
    window.location.reload(false);
    alert("Details have been modified");
  };
  return (
    <>
      <div className="flex flex-col	md:flex-row ">
        <div className="w-full md:w-3/12">
          <RegisterForm />
        </div>
        <div className="w-full">
          <PicIntroUpload />
        </div>
      </div>
      <button className={styles.button} onClick={myclick}>
        Save
      </button>
    </>
  );
};
export default AboutScreen;
