import React, {useState} from "react";
import { AgendaSVG } from "../NameTag/AgendaSVG";
import styles from "./ProfileCard.module.css"
import pic from "./profilepic.svg";
import styles2 from "../../../../screens/CandidatePositionForm/CandidatePositionForm.module.css"
import ShareModal from "../ShareModal/ShareModal";
const ProfileCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={`mr-10 mt-6 ${styles.container} p-4`}>
          <div className="flex pb-2">
              <div className="pr-4">
                <img src={pic} />
              </div>
              <div>
                <div className="pb-1 text-xl"> ALbert Flores</div>
                <div className="text-lg">B.Tech, Electronics and Communications</div>
                <div className="text-lg"> IIT Guwahati </div>
              </div>
          </div>
          <div className="bg-gray-100 p-4">
            <p className="italic text-xl text-gray-600">“Teamwork Divides the Task and Multiplies Success”</p>
          </div>
        <div className="flex space-x-2 py-6">
        {isOpen && (
          <ShareModal setIsOpen={setIsOpen} url={window.location.href} />
        )}
            <button className={styles2.button} onClick={() => setIsOpen(true)}>
              Share this profile
            </button>
            <button className={styles2.button3}>
              <div className="flex items-center">
                Agenda
                <AgendaSVG />
              </div>
            </button>
        </div>
       
      </div>
    </>
  );
};

export default ProfileCard;
