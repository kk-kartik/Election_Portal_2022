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
import useNominate from "../../../hooks/useNominate";

const VerificationBox = () => {
  const {
    candidate,
    error,
    message,
    updateNomination,
    isComplete,
    setError,
    setMessage,
  } = useNominate();

  const userData = useSelector((store) => store.auth);

  const checkCreds = () => {
    if (
      candidate &&
      candidate.credentials &&
      candidate.credentials["Grade Card"]
    ) {
      if(userData?.euser?.degree === "P" && candidate.credentials["Thesis incomplete proof"]){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  };

  const submitNominationForm = async () => {
    if (!isComplete) {
      setError("Please complete nomination form");
      return;
    }
    updateNomination({ nomination_complete: true });
  };

  return (
    <div className={`w-full md:w-9/12 ${styles.main} pt-6 pl-6 pr-6 pb-6`}>
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
          done={
            candidate &&
            candidate.agenda_text &&
            Object.keys(candidate.agenda_text).length >= 3
          }
        />
        {/* <Tile svg={formSVG} text={"Generate Nomination form"} done={true} /> */}
        <Tile
          svg={plusSVG}
          text={"Add Credentials"}
          done={checkCreds()}
        />
        <Tile
          svg={verifySVG}
          text={"Add Witness Data"}
          done={
            !(
              candidate?.proposed_by?.name == "" ||
              candidate?.seconded_by?.name == ""
            )
          }
        />
      </div>
      <div className={`flex mt-4`}>
        <button className={`${styles.btn1} py-2 px-4 mr-4 cursor-pointer`}>
          <a
            className={`${styles.text}`}
            href={`https://swc.iitg.ac.in/elections_api/sgc/candidate_pdf/${candidate?.id}/`}
            target="_blank"
          >
            Preview Nomination Form
          </a>
        </button>
        <button
          className={`${isComplete ? styles.btn1 : styles.btn2} py-2 px-4`}
          onClick={submitNominationForm}
        >
          <div className={`${isComplete ? styles.text1 : styles.text2}`}>
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
