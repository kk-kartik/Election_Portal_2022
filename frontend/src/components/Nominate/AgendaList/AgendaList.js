import React, { useState } from "react";
import styles from "./AgendaList.module.css";
import dots from "./three-dots.svg";
import TextEditor from "../../TextEditor/TextEditor"
import Agenda from "./Agenda";
const AgendaList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  let demoAgenda = <Agenda count = "1" id="1" title="Women Safety" agenda="Background: In the past year and even recently some incidents
  related to physical violence and misbehavior to women, have
  happened. These are not acceptable at any level.Proposal: To
  counter these unfortunate incidents, I propose, to install CCTV
  camera in major places of campus, skvbsdkvb skdjvbdaouhv skdj skdjksjbdvadv askja asjaskj aksjak cdhd " long={true} />
  let demoAgenda2 = <Agenda count = "2" id="2" title="Women Safety" agenda="Background: In the past year and even recently some incidents
  related to physical violence and misbehavior to women, have
  happened. These are not acceptable at any level.Proposal: To
  counter these unfortunate incidents, I propose, to install CCTV
  camera in major places of campus, skvbsdkvb skdjvbdaouhv skdj skdjksjbdvadv askja asjaskj aksjak cdhd " long={true} />
  
  const [agendas, setAgendas] = useState([demoAgenda, demoAgenda2]);

  return (
    <div className="">
      {agendas}
      {isOpen && <TextEditor setIsOpen={setIsOpen} setAgendas={setAgendas} setTitle={setTitle}/>}
      {/* <textarea value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}></textarea> */}
      {/* <Agenda count={count} title={title} agenda={agenda} long={true} /> */}
      <div className="pt-8">
        <button className={`text-white ${styles.button} px-5`} onClick={() => setIsOpen(true)}>
          Add Agenda
        </button>
      </div>
    </div>
  );
};

export default AgendaList;
