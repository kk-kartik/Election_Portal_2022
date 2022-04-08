import React from "react";
import styles from "../Register/RegisterScreen.module.css";

function SaveAndNext({ error, message, loading, submit }) {
  return (
    <div className="">
      {loading && <p className="text-sm text-green">Saving...</p>}
      {message && <p className="text-red">{message}</p>}

      {error && <p className="text-green">{error}</p>}
      {/* <p className="text-sm">Apply changes before proceeding</p> */}
      <button className={styles.button} onClick={submit}>
        Save
      </button>
      <br />
    </div>
  );
}

export default SaveAndNext;
