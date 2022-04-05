import React from "react";
import styles from "./Upload.module.css";
import doc from "./doc.svg";
const UploadField = (props) => {
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
        <div className="p-6 flex items-center ">
          <div className="w-1/2">
            <input type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Credential Name"
                    className={`${styles.input}  w-full`}></input>
          </div>
          <div className="ml-auto mr-12">
          <button className={styles.button} onClick={handleClick}>
            {" "}
            <div className="flex">
              <img src={doc} alt="doc" />
              <p className="pl-2">Upload </p>
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
      </div>
    </div>
  );
};

export default UploadField;
