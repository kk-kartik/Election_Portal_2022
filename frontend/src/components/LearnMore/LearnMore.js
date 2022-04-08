import React, { useEffect, useState } from "react";
import styles from "./LearnMore.module.css";
var parse = require("html-react-parser");

const LearnMore = (props) => {

  return (
    <div className={`${styles.darkBG}`} onClick={() => props.setIsOpen(false)}>
      <div className={styles.centered}>
        <div className={` ${styles.container} p-6 bg-white`}>
          <div className="flex pb-4 w-full">
            <h1 className="text-2xl mr-10"> Some guidelines</h1>
            <button
              className={`ml-auto self-center ${styles.link}`}
              onClick={() => props.setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
          <p>{props.content}</p>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
