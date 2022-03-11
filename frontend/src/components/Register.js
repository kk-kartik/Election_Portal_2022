import React from "react";
import styles from "./Register.module.css";
import RegisterSVG from "./RegisterSVG";
const Register = () => {
  return (
    <div className={`${styles.cont} w-full md:w-4/6`}>
      <h1 className={styles.regText}>Register</h1>
      <div className={styles.regCont}>
        <div className={`${styles.reg}`}>
          <span>Register for the Gymkhana Elections to cast your votes</span>
          <div className={styles.btns}>
            <button className={`${styles.regBtn}`}>Register Now</button>
            <button
              className={`${styles.nomBtn} hidden md:block bg-coolGray-50`}
            >
              Nominate
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
