import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./TextEditor.module.css"
const TextEditor = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);
  return (
      <div className={styles.darkBG}>
     <div className={styles.centered}> 
    <div className={` ${styles.container} p-6 bg-white`} >
    <div className="flex pb-4 ">
    <h1 className="text-2xl"> Add New Agenda</h1>
        <button className={`ml-auto self-center ${styles.link}`} onClick={() => props.setIsOpen(false)}>
          Cancel
        </button>
    </div>
    <div className={` ${styles.container} p-2`}>
    <div className="pb-2">
        <input type="text" placeholder="Title" className={` ${styles.input} p-2 w-full`}/>
    </div>
      <div className={` ${styles.editor} p-2`}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          placeholder="Write about your agenda here..."
        />
      </div>
      <div className="flex flex-row-reverse p-2">
         <button className={` ${styles.button} px-11 py-2.5 font-semibold disabled disabled:bg-violet-100`}> Save </button>
      </div>
    </div>
    </div>
    </div> 
    </div>

  );
};

export default TextEditor;