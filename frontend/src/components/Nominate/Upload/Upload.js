import React from "react";
import styles from "./Upload.module.css";
import doc from "./doc.svg";
const Upload = (props) => {
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };

  return (
    <div>
      <div className={`w-full md:w-3/5 ${styles.container}`}>
        <div className="p-6">
          <div className="pb-4">
            <p className="text-lg leading-8 text-gray-600 ">
              Certificate of Appreciation in RECYCLE-2018 (International
              Conference in the month of February) from IIT GUWAHATI.
            </p>
          </div>
          <button className={styles.button} onClick={handleClick}>
            {" "}
            <div className="flex">
              <img src={doc} alt="doc" />
              <p className="pl-2">Attach Proof </p>
            </div>
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div className="pt-8">
        <button className={`px-5 text-white ${styles.credbutton}`}>
          {" "}
          Add Credentials{" "}
        </button>
      </div>
    </div>
  );
};

export default Upload;