import { useState } from "react";
import styles from "./Agenda.module.css";
import dots from "./three-dots.svg";

const Agenda = (props) => {
  const [clicked, setClicked] = useState(false);
  let shortAgenda =
    props.agenda.length > 250
      ? props.agenda.substr(0, 250) + "..."
      : props.agenda;
  const dropDownHandler = (e) => {
    setClicked(!clicked);
  };
  let count = props.count;
  let title = props.title;
  let agenda = <div className={props.cClass}>{props.agenda}</div>;
  if (props.long === true) {
    agenda = (
      <div className={props.cClass}>
        <div className="flex">
          {clicked ? props.agenda : shortAgenda}
          <div onClick={dropDownHandler} className=" cursor-pointer">
            <div className="hidden">{props.agenda}</div>
            <p className={styles.link}>{clicked ? "(less)" : "(more)"}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-2">
      <div className={`w-full md:w-3/5 ${styles.container}`}>
        <div className="p-6">
          <div className="flex">
            <h1 className="text-lg text-gray-800">
              {" "}
              Agenda {count}: {title}{" "}
            </h1>
            <div className={`${styles.dropdowncont} ml-auto`} tabindex="-1">
              <img src={dots} className={styles.dots} />
            </div>
          </div>
          <div className="pt-4">{agenda}</div>
        </div>
      </div>
    </div>
  );
};
export default Agenda;
