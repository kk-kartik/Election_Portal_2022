import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./TextEditor.module.css";
import { convertToHTML } from "draft-convert";
import Agenda from "../Nominate/AgendaList/Agenda";
import { useDispatch, useSelector } from "react-redux";
import convertFromHTML from "draft-convert/lib/convertFromHTML";
import { SET_CANDIDATE_DATA } from "../../constants";
var parse = require("html-react-parser");

const TextEditor = (props) => {
  let currentContentAsHTML = "";
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const convertContentToHTML = () => {
    currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
  };
  const [title, setTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert("Please add a title");
      return;
    }
    props.setTitle(title);
    convertContentToHTML();
    const convertedString = parse(currentContentAsHTML);
    const data = {
      agenda_text: {
        ...props.candidate?.agenda_text,
        [title]: currentContentAsHTML,
      },
    };

    props.updateNomination(data);
    props.setIsOpen(false);
  };

  return (
    <div className={styles.darkBG}>
      <div className={styles.centered}>
        <div className={` ${styles.container} p-6 bg-white`}>
          <div className="flex pb-4 ">
            <h1 className="text-2xl"> Add New Agenda</h1>
            <button
              className={`ml-auto self-center ${styles.link}`}
              onClick={() => props.setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
          <div className={` ${styles.container} p-2`}>
            <div className="pb-2">
              <input
                type="text"
                placeholder="Title"
                className={` ${styles.input} p-2 w-full`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={` ${styles.editor} p-2`}>
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                placeholder="Write about your agenda here..."
              />
            </div>
            <div className="flex flex-row-reverse p-2">
              <button
                className={` ${styles.button} px-11 py-2.5 font-semibold disabled disabled:bg-violet-100`}
                onClick={onSubmit}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
