import React from "react";
import {Helmet} from 'react-helmet';
import styles from "./CandidatePositionForm.module.css";
import TopNav from "../../components/Home/TopNav/TopNav";
const CandidatePositionForm = () => {
  return (
    <div className="">
        <Helmet>
                <style>{'body { background-color: #f8fafe; }'}</style>
        </Helmet>
        <TopNav />
        <div className={`${styles.cont} ml-2.5 mr-2.5 sm:ml-auto sm:mr-auto `}>
        <h1 className="text-4xl pb-4 mb-4"> Nominate Yourself as a Candidate </h1>
        <div>
          <form>
            <label for="name" className="font-semibold text-s text-gray-800">
              Name:{" "}
            </label>
            <br />
            <input
              type="text"
              id="name"
              name="fname"
              className={` ${styles.input} md:w-11/12 w-full`}
            />
            <br />
            <br />
            <label for="degree" className="font-semibold text-s text-gray-800">
              Post:{" "}
            </label>{" "}
            <br />
            <select id="degree" className={` ${styles.input} md:w-11/12 w-full`}>
              <option value="vp">Vice President</option>
              <option value="president">President</option>
              <option value="phd">PhD</option>
            </select>
            <br />
            <br />
          </form>
        </div>
        <br />

        <button className={styles.button2}> Continue </button>
        
        <button className={styles.button}> Cancel </button>
      </div>
      
        
      
    </div>
  );
};

export default CandidatePositionForm;
