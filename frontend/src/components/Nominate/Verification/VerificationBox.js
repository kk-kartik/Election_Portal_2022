import Tile from "./Tile";
import postSVG from "./post.svg";
import agendaSVG from "./agenda.svg";
import videoSVG from "./video.svg";
import formSVG from "./form.svg";
import plusSVG from "./plus.svg";
import verifySVG from "./verify.svg";
import styles from "./VerificationBox.module.css";
import { useSelector } from "react-redux";
import { API, updateCandidateData } from "../../../api";
import { useState } from "react";

function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
}

function jsonToFormData(data) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}

const VerificationBox = () => {
  const candidate = useSelector((store) => store.candidate);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const canSubmit =
    !!candidate.id &&
    !!candidate.video &&
    !!candidate.agenda_text &&
    !!candidate.credentials &&
    !!candidate.proposed_by?.name;

  const submitNominationForm = async () => {
    try {
      API.defaults.headers["Content-Type"] = "multipart/form-data";
      const finalData = {};
      Object.keys(candidate).forEach((k) => {
        if (
          k == "image" ||
          k == "proposed_by_sign" ||
          k == "seconded_by_sign"
        ) {
          const val = candidate[k];
          if (
            val &&
            (typeof val === "string" || val instanceof String) &&
            val.startsWith("http")
          ) {
            return;
          }
        }
        if (
          k == "agenda_text" ||
          k == "credentials" ||
          k == "proposed_by" ||
          k == "seconded_by"
        ) {
          finalData[k] = JSON.stringify(candidate[k]);
          return;
        }
        finalData[k] = candidate[k];
      });
      const formData = await jsonToFormData(finalData);
      const res = await updateCandidateData(candidate.id, formData);
      setMessage("Nomination submitted!!");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Something went wrong!Please try logging in again."
      );
    }
  };

  return (
    <div className={`w-9/12 ${styles.main} pt-6 pl-6 pr-6 pb-6`}>
      <div className="flex flex-wrap">
        <Tile
          svg={postSVG}
          text={"Register for the Post"}
          done={!!candidate.id}
        />
        <Tile
          svg={videoSVG}
          text={"Upload your introduction video"}
          done={!!candidate.video}
        />
        <Tile
          svg={agendaSVG}
          text={"Upload your agendas"}
          done={!!candidate.agenda_text}
        />
        <Tile svg={formSVG} text={"Generate Nomination form"} done={true} />
        <Tile
          svg={plusSVG}
          text={"Add Credentials"}
          done={!!candidate.credentials}
        />
        <Tile
          svg={verifySVG}
          text={"Add Witness Data"}
          done={!!candidate.proposed_by?.name}
        />
      </div>
      <div className={`flex mt-4`}>
        <button className={`${styles.btn1} py-2 px-4 mr-4`}>
          <div className={`${styles.text}`}>Preview Nomination Form</div>
        </button>
        <button
          className={`${canSubmit ? styles.btn1 : styles.btn2} py-2 px-4`}
          onClick={submitNominationForm}
        >
          <div className={`${canSubmit ? styles.text1 : styles.text2}`}>
            Send For Verification
          </div>
        </button>
      </div>
      {error && <p className="text-red-600 mt-5">{error}</p>}
      {message && <p className="text-green-600 mt-5">{message}</p>}
      <div className={`flex mt-4`}>
        <div className={`${styles.lastdate}`}>
          Last Date for Verification is: 08/04/22
        </div>
        <div className={`mr-0 ml-auto ${styles.help}`}>
          <a href="mailto:swc@iitg.ac.in">Need Help?</a>
        </div>
      </div>
    </div>
  );
};

export default VerificationBox;
