import React, { useState } from "react";
import styles from "./AgendaList.module.css";
import dots from "./three-dots.svg";
import TextEditor from "../../TextEditor/TextEditor"
import Agenda from "./Agenda";
const AgendaList = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
     
          <Agenda count = "1" agenda="Background: In the past year and even recently some incidents
              related to physical violence and misbehavior to women, have
              happened. These are not acceptable at any level.Proposal: To
              counter these unfortunate incidents, I propose, to install CCTV
              camera in major places of campus, skvbsdkvb skdjvbdaouhv skdj skdjksjbdvadv askja asjaskj aksjak cdhd " long={true} />
          <Agenda count = "2" agenda="Background: In the past year and even recently some incidents
              related to physical violence and misbehavior to women, have
              happened. These are not acceptable at any level.Proposal: To
              counter these unfortunate incidents, I propose, to install CCTV
              camera in major places of campus, skvbsdkvb skdjvbdaouhv skdj skdjksjbdvadv askja asjaskj aksjak cdhd " long={true} />
      {isOpen && <TextEditor setIsOpen={setIsOpen} />}
      <div className="pt-8">
        <button className={`text-white ${styles.button} px-5`} onClick={() => setIsOpen(true)}>
          {" "}
          Add Agenda{" "}
        </button>
      </div>
    </div>
  );
};

export default AgendaList;
