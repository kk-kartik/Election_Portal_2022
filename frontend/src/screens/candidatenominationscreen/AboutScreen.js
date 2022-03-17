import React from "react";
import RegisterForm from "../Register/RegisterForm"
import styles from "../Register/RegisterScreen.module.css"
const AboutScreen = () => {
  const myclick = ()=>{
    window.location.reload(false); 
    alert("Details have been modified");
  }
  return (
    <>
     <div className="w-3/12">
      <RegisterForm />
      <br />
        <br />
        <button className={styles.button} onClick={myclick}> Save </button>
        </div>
    </>
  );
};
export default AboutScreen;
