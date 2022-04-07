import React from "react";
import styles from "./Register.module.css";
import RegisterSVG from "./RegisterSVG";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  let navigate = useNavigate();
  const userData = useSelector((store) => store.auth);

  const routeChange = () => {
    let path = "";
    if (!userData) {
      path = `/login`;
    } else {
      path = `/register`;
    }
    navigate(path);
  };

  const routeChange2 = () => {
    let path = "";
    if (!userData) {
      path = "/login";
    } else if (userData && userData.candidates.length) {
      path = "/nominate/about";
    } else path = `/nominate/post`;
    navigate(path);
  };

  return (
    <div className={`${styles.cont} w-full md:w-4/6 px-2 md:p-0 `}>
      <h1 className={styles.regText}>Register</h1>
      <div className={styles.regCont}>
        <div className={`${styles.reg}`}>
          <span>Register for the Gymkhana Elections to cast your votes</span>
          <div className={styles.btns}>
            {!userData?.euser?.registration_complete && (
              <button
                className={`${styles.regBtn} bg-[#2B00FF] hover:bg-[#2B00AA]`}
                onClick={routeChange}
              >
                Register Now
              </button>
            )}

            <button
              className={`${styles.nomBtn} hover:bg-gray-300 hidden md:block bg-coolGray-50`}
              onClick={routeChange2}
            >
              {userData?.candidates.length ? "My Nomination" : "Nominate"}
            </button>
          </div>
        </div>
        <div>
          <RegisterSVG />
        </div>
      </div>
    </div>
  );
};

export default Register;
