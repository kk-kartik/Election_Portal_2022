import React from "react";
import styles from "./AgendaList.module.css";
import dots from "./three-dots.svg";
const AgendaList = () => {
  return (
    <div className="">
      <div className={`w-full md:w-3/5 ${styles.container}`}>
        <div className="p-6">
          <div className="flex">
            <h1 className="text-lg text-gray-800"> Agenda 1: Women safety </h1>
            <div className={`${styles.dropdowncont} ml-auto`} tabindex="-1">
              <img src={dots} className={styles.dots} />
              <div className={styles.dropdown}>
                <button className="absolute cursor-default bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  {" "}
                  Delete{" "}
                </button>
              </div>{" "}
            </div>
          </div>
          <div className="pt-4">
            <p className="text-lg leading-8 text-gray-600 ">
              {" "}
              Background: In the past year and even recently some incidents
              related to physical violence and misbehavior to women, have
              happened. These are not acceptable at any level.Proposal: To
              counter these unfortunate incidents, I propose, to install CCTV
              camera in major places of campus...{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="pt-8">
        <button className={`text-white ${styles.button} px-5`}>
          {" "}
          Add Agenda{" "}
        </button>
      </div>
    </div>
  );
};

export default AgendaList;
