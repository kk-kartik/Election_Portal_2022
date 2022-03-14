import React from "react";
import styles from "./AgendaNavbar.module.css";

const AgendaNavbar = () => {
  return (
    <div className="pb-6">
      <div className="flex">
        <h1 className="text-2xl"> My Agendas</h1>
        <a href="xyz.com" className={`ml-auto self-center ${styles.link}`}>
          {" "}
          Learn More
        </a>
      </div>
      <hr className="my-2 border border-solid border-gray-200" />
    </div>
  );
};

export default AgendaNavbar;
