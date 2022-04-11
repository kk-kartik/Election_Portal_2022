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
import React, { useEffect, useState } from "react";
import useNominate from "../../../hooks/useNominate";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import {
  aboutSchema,
  candidateSchema,
} from "../../../screens/candidatenominationscreen/AboutScreen";
import { witnessSchema } from "../../../screens/candidatenominationscreen/WitnessesScreen";

const lastDateOfVerification = "11/04/22";

const VerificationBox = () => {
  const {
    candidate,
    error,
    message,
    updateNomination,
    isComplete,
    setError,
    setMessage,
    isNominationComplete,
    isDeadlineOver,
    isFormClosed,
  } = useNominate();
  const userData = useSelector((store) => store.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [witnessComplete, setwitnessComplete] = useState(false);
  const [profileComplete, setprofileComplete] = useState(false);

  useEffect(() => {
    checkWitnessData();
    checkProfile();
  }, []);

  const checkCreds = () => {
    if (
      candidate &&
      candidate.credentials &&
      candidate.credentials["Grade Card"]
    ) {
      return true;
      // if (
      //   candidate?.position?.title !== "PG Senator" &&
      //   candidate?.position !== 10
      // ) {
      //   return true;
      // } else if (
      //   (candidate?.position?.title === "PG Senator" ||
      //     candidate?.position === 10) &&
      //   candidate.credentials["Thesis incomplete proof"]
      // ) {
      //   return true;
      // } else {
      //   return false;
      // }
    } else {
      return false;
    }
  };

  const submitNominationForm = async () => {
    if (!(isComplete && profileComplete && witnessComplete)) {
      setError("Please complete all the steps,by verifying the tabs");
      return;
    }
    updateNomination({ nomination_complete: true });
    setIsOpen(false);
  };

  const checkProfile = async () => {
    try {
      await candidateSchema.validate(candidate, { abortEarly: false });
      await aboutSchema.validate(userData.euser, { abortEarly: false });
      setprofileComplete(true);
    } catch (err) {
      console.log(err);
      setprofileComplete(false);
    }
  };

  const checkWitnessData = async () => {
    console.log("Cheking witness data");
    try {
      await witnessSchema.validate(candidate.proposed_by, {
        abortEarly: false,
      });
      await witnessSchema.validate(candidate.seconded_by, {
        abortEarly: false,
      });
      setwitnessComplete(true);
    } catch (err) {
      console.log("Witness schema not validated");
      console.log(err);
      setprofileComplete(false);
    }
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
          svg={formSVG}
          text={"Complete your election profile"}
          done={profileComplete}
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

        <Tile svg={plusSVG} text={"Add Credentials"} done={checkCreds()} />
        <Tile
          svg={verifySVG}
          text={"Add Witness Data"}
          done={witnessComplete}
        />
      </div>
      <div className={`flex mt-4`}>
        <button className={`${styles.btn1} py-2 px-4 mr-4 cursor-pointer`}>
          <a
            className={`${styles.text}`}
            href={`https://swc.iitg.ac.in/elections_api/sgc/candidate_pdf/${candidate?.id}/`}
            target="_blank"
            rel="noreferrer"
          >
            Preview Nomination Form
          </a>
        </button>
        {/* {!isNominationComplete && !isDeadlineOver && (
          <button
            className={`${isComplete ? styles.btn1 : styles.btn2} py-2 px-4`}
            disabled={!isComplete}
            onClick={() => setIsOpen(true)}
            //onClick={submitNominationForm}
          >
            <div className={`${isComplete ? styles.text1 : styles.text2}`}>
              Sync profile
            </div>
          </button>
        )} */}
      </div>
      <p className={`mt-2 text-blue-500`}>
        Your data is synced and will be auto updated on deadline.
      </p>
      {isNominationComplete ? (
        <p className="text-blue-500">Your Nomination is complete</p>
      ) : (
        <>
          {isDeadlineOver && (
            <p className="text-blue-500">Nomination Deadline is over.</p>
          )}
        </>
      )}
      {error && <p className="text-red-600 mt-5">{error}</p>}
      {message && <p className="text-green-600 mt-5">{message}</p>}
      <div className={`flex mt-4`}>
        <div className={`${styles.lastdate}`}>
          Last Date for Verification is: {lastDateOfVerification}
        </div>
        <div className={`mr-0 ml-auto ${styles.help}`}>
          <a href="mailto:swc@iitg.ac.in">Need Help?</a>
        </div>
      </div>
      {isOpen && (
        <ConfirmDialog
          setIsOpen={setIsOpen}
          finalSubmit={submitNominationForm}
        />
      )}
    </div>
  );
};

export default VerificationBox;
