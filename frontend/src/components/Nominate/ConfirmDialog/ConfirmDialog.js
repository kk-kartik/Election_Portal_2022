import React, { useEffect, useState } from "react";
import styles from "./ConfirmDialog.module.css";
var parse = require("html-react-parser");

const ConfirmDialog = (props) => {
  return (
    <div className={`${styles.darkBG}`}>
      <div className={styles.centered}>
        <div className={` ${styles.container} p-6 bg-white`}>
          <div className="flex pb-4 w-full">
            <h1 className="text-2xl font-medium mr-10">Are you Sure ?</h1>
            <button
              className={`ml-auto self-center ${styles.link}`}
              onClick={() => props.setIsOpen(false)}
            >
              Close
            </button>
          </div>
          <p>You wouldn't be able to change your details any further.</p>
          <br />
          <div className="flex flex-col sm:flex-row">
            <button
              className="px-3 py-1 mr-2 border-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              onClick={() => {
                props.finalSubmit();
                props.setIsOpen(false);
              }}
            >
              Yes
            </button>
            <button
              className="px-3 py-1 mr-2 border-2 rounded-md bg-green-500 text-white hover:bg-green-600"
              onClick={() => props.setIsOpen(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
