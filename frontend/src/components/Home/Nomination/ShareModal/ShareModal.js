import React, { useEffect, useState } from "react";
import styles from "../../../TextEditor/TextEditor.module.css";

const ShareModal = (props) => {
const onSubmit = () => {
  var copyText = document.getElementById("input");
  copyText.select();
  navigator.clipboard.writeText(copyText.value);
  setButtonText("Copied!");
}
const [buttonText, setButtonText] = useState("Copy"); 
const changeText = (text) => setButtonText(text);
  return (
    <div className={styles.darkBG}>
      <div className={styles.centered}>
        <div className={` ${styles.container} p-6 bg-white w-full`}>
          <div className="flex pb-4 ">
            <h1 className="text-2xl"> Share Profile!</h1>
            <button
              className={`ml-auto self-center ${styles.link}`}
              onClick={() => {
                props.setIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
          <div className={` ${styles.container} p-2`}>
            <div className="pb-2">
              <input
                type="text"
                // placeholder="Title"
                id="input"
                className={` ${styles.input} p-2 w-full`}
                value={props.url}
              />
            </div>
            <div className="flex flex-row-reverse p-2">
              <button
                className={` ${styles.button} px-11 py-2.5 font-semibold disabled disabled:bg-violet-100`}
                onClick={onSubmit}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
