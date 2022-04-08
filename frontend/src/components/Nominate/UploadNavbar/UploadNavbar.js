import React from "react";
import styles from "./UploadNavbar.module.css";

const UploadNavbar = () => {
  return (
    <div className="pb-6">
      <div className="flex">
        <h1 className="text-2xl"> My Credentials</h1>
        <p href="#" className={`ml-auto self-center ${styles.link}`}>
          Learn More
        </p>
      </div>
      <hr className="my-2 border border-solid border-gray-200" />
    </div>
  );
};

export default UploadNavbar;
