import React, { useEffect, useState } from "react";
import styles from "./AgendaList.module.css";
import TextEditor from "../../TextEditor/TextEditor";
import Agenda from "./Agenda";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
const AgendaList = () => {
  const candidate = useSelector((store) => store.candidate);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <div className="">
      {candidate?.agenda_text &&
        Object.keys(candidate?.agenda_text || []).map((a, i) => (
          <Agenda title={a} agenda={parse(candidate.agenda_text[a])} />
        ))}

      {isOpen && <TextEditor setIsOpen={setIsOpen} setTitle={setTitle} />}
      {/* <textarea value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}></textarea> */}
      {/* <Agenda count={count} title={title} agenda={agenda} long={true} /> */}
      <div className="pt-8">
        <button
          className={`text-white ${styles.button} px-5`}
          onClick={() => setIsOpen(true)}
        >
          Add Agenda
        </button>
      </div>
    </div>
  );
};

export default AgendaList;
