import React from "react";
import styles from "./Register.module.css";
import RegisterSVG from "./RegisterSVG";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Register = () => {
  let navigate = useNavigate();
  const candidate = useSelector((store) => store.candidate);
  const routeChange = () => {
    let path = `register`;
    navigate(path);
  };
  const routeChange2 = () => {
    let path = "";
    if (candidate && candidate.id) {
      path = "/nominate/about";
    } else path = `/nominate/post`;
    navigate(path);
  };
  return (
    <div className={`${styles.cont} w-full md:w-4/6`}>
      <h1 className={styles.regText}>Register</h1>
      <div className={styles.regCont}>
        <div className={`${styles.reg}`}>
          <span>Register for the Gymkhana Elections to cast your votes</span>
          <div className={styles.btns}>
            <button className={`${styles.regBtn}`} onClick={routeChange}>
              Register Now
            </button>
            <button
              className={`${styles.nomBtn} hidden md:block bg-coolGray-50`}
              onClick={routeChange2}
            >
              {candidate?.id ? "My Nomination" : "Nominate"}
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
