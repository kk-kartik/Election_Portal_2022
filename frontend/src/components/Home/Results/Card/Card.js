import React from "react";
import styles from "./CardStyle.module.css";
import { Link } from "react-router-dom";

const Card = ({ person }) => {
  let capital_name = person?.name || person?.user?.name;
  let arr = capital_name.split(" ");
  arr.forEach((e, index, theArray) => {
    theArray[index] = e.charAt(0) + e.slice(1).toLowerCase();
  });

  capital_name = arr.join(" ");
  const config = {
    "background-image":
      "linear-gradient(0deg,rgba(10, 10, 10, 0.8) 0%,rgba(255, 255, 255, 0) 100%), url(" +
      person.image +
      ")",
    "min-width": "10rem",
  };

  return (
    // <Link to={`/candidate/${person.id}`}>
    <div className="flex items-center">
      <div className={`!rounded-md ${styles.front} shadow-lg`} style={config}>
        {/* <div className="title text-xl font-bold">{capital_name}</div> */}
        {/* <div className="title smallTitle">{person.tagline}</div> */}
      </div>
        <div className="flex flex-col pl-10">
            <div className={`${styles.name}`}>
                {person.name}
            </div>
            <div className={`${styles.branch}`}>
                {person.branch}
            </div>
            <div className={`${styles.won} mt-6`}>
            Won by {person.vote_lead} votes
            </div>


        </div>
    </div>
    // </Link>
  );
};

export default Card;
