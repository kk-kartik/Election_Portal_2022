import React, { useState } from "react";
import { AgendaSVG } from "../NameTag/AgendaSVG";
import styles from "./ProfileCard.module.css";
import pic from "./profilepic.svg";
import styles2 from "../../../../screens/CandidatePositionForm/CandidatePositionForm.module.css";
import ShareModal from "../ShareModal/ShareModal";
const ProfileCard = (props) => {
  let capital_name = props.name;
  let arr = capital_name.split(" ");
  arr.forEach((e, index, theArray) => {
    theArray[index] = e.charAt(0) + e.slice(1).toLowerCase();
  });

  capital_name = arr.join(" ");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={`mr-10 sm:mt-4 ${styles.container} p-2`}>
        <div className="flex pb-2">
          <div className="pr-4">
            <img src={props.image} className="w-auto h-20" alt="profile" />
          </div>
          <div className={`text-base font-medium ${styles.dcpclr}`}>
            <div
              className={`pb-1 text-xl font-normal ${styles.atkinson} ${styles.btmclr}`}
            >
              {" "}
              {capital_name}
            </div>
            <div>
              {props.degree}, {props.branch}
            </div>
            <div> IIT Guwahati </div>
          </div>
        </div>
        <div className={`bg-gray-100 p-4 mt-4 ${styles.atkinson}`}>
          <p className="italic text-xl text-gray-600">“{props.tagline}”</p>
        </div>
        <div className="flex space-x-2  hidden sm:block py-6">
          {isOpen && (
            <ShareModal setIsOpen={setIsOpen} url={window.location.href} />
          )}
          <button className={styles2.button} onClick={() => setIsOpen(true)}>
            Share this profile
          </button>
          {/* <button className={styles2.button3}>
            <div
              className="flex items-center"
              onClick={() => {
                window.open(props.agenda_pdf);
              }}
            >
              Agenda
              <AgendaSVG />
            </div>
          </button> */}
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
