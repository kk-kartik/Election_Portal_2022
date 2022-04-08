import styles from "./AgendaNavbar.module.css";
import React, { useEffect, useState } from "react";
import LearnMore from "../../LearnMore/LearnMore";

const modalText = ""

const AgendaNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="pb-6">
      <div className="flex">
        <h1 className="text-2xl"> My Agendas</h1>

        {/* <a href="xyz.com" className={`ml-auto self-center ${styles.link}`}>
          {" "}
          Learn More
        </a> */}
        <button
          className={`ml-auto self-center ${styles.link}`}
          onClick={() => setIsOpen(true)}
        >
          Learn More
        </button>
      </div>
      {isOpen && <LearnMore content={modalText} setIsOpen={setIsOpen} />}
      <hr className="my-2 border border-solid border-gray-200" />
    </div>
  );
};

export default AgendaNavbar;
