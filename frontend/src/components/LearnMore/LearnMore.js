import React, { useEffect, useState } from "react";
import styles from "./LearnMore.module.css";
var parse = require("html-react-parser");

const LearnMore = (props) => {

  return (
    <div className={`${styles.darkBG}`}>
      <div className={styles.centered}>
        <div className={` ${styles.container} p-6 bg-white`}>
          <div className="flex pb-4 w-full">
            <h1 className="text-2xl"> Some guidelines</h1>
            <button
              className={`ml-auto self-center ${styles.link}`}
              onClick={() => props.setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
          <div>
            hello
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
