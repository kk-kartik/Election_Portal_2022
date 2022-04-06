import React from "react";
import { AgendaSVG } from "../NameTag/AgendaSVG";
import styles from "./ProfileCard.module.css"
import pic from "./profilepic.svg";
const ProfileCard = () => {
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
                <div className="text-lg"> IIT Guwahati, 2023 </div>
              </div>
          </div>
          <div className="bg-gray-100 p-4">
            <p className="italic text-2xl text-gray-600">“Teamwork Divides the Task and Multiplies Success”</p>
          </div>
        <div className="flex space-x-2  hidden sm:block py-6">
            <button className="px-5 py-2.5 border-2 rounded ">
              Share this profile
            </button>
            <button className="px-5 py-2.5 border-2 rounded bg-pink-500 text-white">
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
