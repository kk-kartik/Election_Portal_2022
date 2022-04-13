import React, { useState } from "react";
import { AgendaSVG } from "./AgendaSVG";
import ShareModal from "../ShareModal/ShareModal";
import styles from "../../../../screens/CandidatePositionForm/CandidatePositionForm.module.css";
const NameTag = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  let capital_name = props.name;
  let arr = capital_name.split(" ");
  arr.forEach((e, index, theArray) => {
    theArray[index] = e.charAt(0) + e.slice(1).toLowerCase();
  });

  capital_name = arr.join(" ");

  return (
    <>
      <div className="mr-10 mt-6">
        <div className="flex justify-between items-center">
          <div className="text-gray-400 font-semibold text-lg pb-8">
            Contesting for {props.position}
          </div>
          <div className="flex space-x-2  hidden sm:block">
            {isOpen && (
              <ShareModal setIsOpen={setIsOpen} url={window.location.href} />
            )}
            <button className={styles.button} onClick={() => setIsOpen(true)}>
              Share this profile
            </button>
            <button className={styles.button3}>
              <div className="flex items-center">
                Agenda
                <AgendaSVG />
              </div>
            </button>
          </div>
        </div>
        <div className="font-bold text-5xl text-gray-800 pb-2">
          {capital_name}
        </div>
        <div className={styles.pink}>
          {props.degree}, {props.branch}
        </div>
      </div>
    </>
  );
};

export default NameTag;
