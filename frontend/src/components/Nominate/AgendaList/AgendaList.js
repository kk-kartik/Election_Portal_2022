import React, { useEffect, useState } from "react";
import styles from "./AgendaList.module.css";
import TextEditor from "../../TextEditor/TextEditor";
import Agenda from "./Agenda";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import useNominate from "../../../hooks/useNominate";
const AgendaList = () => {
  const {
    candidate,
    error,
    message,
    updateNomination,
    loading,
    isNominationComplete,
  } = useNominate();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(null);

  return (
    <div className="">
      {candidate?.agenda_text &&
        Object.keys(candidate?.agenda_text || []).map((a, i) => (
          <Agenda
            title={a}
            agenda={parse(candidate.agenda_text[a])}
            setIsOpen={setIsOpen}
            setTitle={setTitle}
            updateNomination={updateNomination}
            candidate={candidate}
          />
        ))}
      {!candidate ||
        !candidate?.agenda_text ||
        (Object.keys(candidate?.agenda_text || []).length < 3 && (
          <p className="text-sm">Add Atleast 3 agendas</p>
        ))}

      {isOpen && (
        <TextEditor
          setIsOpen={setIsOpen}
          setTitle={setTitle}
          updateNomination={updateNomination}
          candidate={candidate}
          title={title}
        />
      )}
      {/* <textarea value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}></textarea> */}
      {/* <Agenda count={count} title={title} agenda={agenda} long={true} /> */}
      {!isNominationComplete && (
        <div className="pt-8">
          <button
            className={`text-white ${styles.button} px-5 ml-2`}
            onClick={() => setIsOpen(true)}
          >
            Add Agenda
          </button>
        </div>
      )}
      {loading && <p className="text-sm text-blue-500">Saving...</p>}
      {error ? (
        <p className="text-red-300">{error}</p>
      ) : message ? (
        <p className="text-green-400">{error}</p>
      ) : null}
      <br />
    </div>
  );
};

export default AgendaList;
