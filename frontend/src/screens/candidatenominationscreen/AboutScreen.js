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
      <div className="flex">
        <div className="w-3/12">
          <RegisterForm />
        </div>
        <div className="w-full">
          <PicIntroUpload />
        </div>
      </div>

      <br />
      <br />
      <button className={styles.button} onClick={myclick}>
        {" "}
        Save{" "}
      </button>
    </>
  );
};
export default AboutScreen;
