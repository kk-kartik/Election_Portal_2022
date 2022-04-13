import React, {useState} from "react";
import { AgendaSVG } from "./AgendaSVG";
import ShareModal from "../ShareModal/ShareModal";
import styles from "../../../../screens/CandidatePositionForm/CandidatePositionForm.module.css"
const NameTag = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mr-0 mt-6">
        <div className="flex justify-between items-center flex-col mb-4">
          <div className="text-gray-400 font-semibold text-lg pb-8">
            Contesting for Vice President
          </div>
          <div className="flex space-x-2 ">
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
        <div className="font-bold text-5xl text-gray-800 pb-2">Albert Fores</div>
        <div className={styles.pink}>
          B.Tech, Electronics and Communication Engineering
        </div>
      </div>
    </>
  );
};

export default NameTag;
