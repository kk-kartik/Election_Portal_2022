import React, { useEffect, useState } from "react";
import styles from "./LearnMore.module.css";
var parse = require("html-react-parser");

const LearnMore = (props) => {

  return (
    <div className={`${styles.darkBG}`} onClick={() => props.setIsOpen(false)}>
      <div className={styles.centered}>
        <div className={` ${styles.container} p-6 bg-white`}>
          <div className="flex pb-4 w-full">
            <h1 className="text-2xl mr-10"> Some guidelines</h1>
            <button
              className={`ml-auto self-center ${styles.link}`}
              onClick={() => props.setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
          {props.page === "agenda" && (
            <div className="">
              <p>How to write effective agendas/manifestos: </p>
              <br />
              <p>
                Gather your aims not only from your own experience but consult
                with friends, peers, and others in the college community. In
                your role, you represent student views, not solely your own.
              </p>
              <br />
              <p>Ask yourself the following, and it'll come to you: </p>
              <br />
              <p>Specific: What do you want to do?</p>
              <p>Measurable: How will you know when you've achieved it?</p>
              <p>Achievable: Is it in your power to accomplish it?</p>
              <p>Realistic: Can you realistically achieve it?</p>
              <p>Time-bound: When exactly do you want to accomplish it?</p>
              <br />
              <p>Lastly, Be the best version of yourself.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
