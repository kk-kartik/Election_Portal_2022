import React from "react";
import styles from "../Register/RegisterScreen.module.css";

function SaveAndNext({ error, message, loading, submit }) {
  return (
    <div className="my-2">
      {loading && <p className="text-blue-500 mb-1">Saving...</p>}
      {message && <p className="text-blue-500 mb-1">{message}</p>}

      {error && <p className="text-red-300 mb-1">{error}</p>}
      {/* <p className="text-sm">Apply changes before proceeding</p> */}
      <button className={styles.button} onClick={submit}>
        Save
      </button>
      <br />
    </div>
  );
}

export default SaveAndNext;
