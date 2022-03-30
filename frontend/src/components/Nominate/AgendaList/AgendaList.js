import React, { useState } from "react";
import styles from "./AgendaList.module.css";
import dots from "./three-dots.svg";
import TextEditor from "../../TextEditor/TextEditor"
import Agenda from "./Agenda";
import draftToHtml from 'draftjs-to-html';
import convertToRaw from 'draftjs-to-html';
const AgendaList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState ('')
  const [htmlContent, setHtmlContent] = useState('')

    const getContent = (htmlContentProp) => {
        setHtmlContent(htmlContentProp);
        console.log(htmlContentProp);
    }



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
      {/* <textarea value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}></textarea> */}
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
