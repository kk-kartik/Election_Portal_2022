import React from "react";
import styles from "../Register/RegisterScreen.module.css";

function SaveAndNext({ error, message, loading, submit }) {
  return (
    <div className="mt-5">
      {loading && <p className="text-sm text-green">Saving...</p>}
      {error ? (
        <p className="text-red">{error}</p>
      ) : message ? (
        <p className="text-green">{error}</p>
      ) : null}
      {/* <p className="text-sm">Apply changes before proceeding</p> */}
      <button className={styles.button} onClick={submit}>
        Save
      </button>
      <br />
    </div>
  );
}

export default SaveAndNext;
