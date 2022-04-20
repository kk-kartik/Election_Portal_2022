import React from "react";
import styles from "./CandidateCard.module.css";
import SingleVote from "../buttons/buttons";
const Agenda = (p) => {
  return (
    <ol>{p.title}</ol>
  );
};

const CandidateCard = (props) => {
  function toPascalCase(string) {
    let b = string.split(" ");
    let string2 = ""
    for (let i = 0; i < b.length; i++) {
      let s = b[i][0].toUpperCase();
      let y = b[i].substr(1).toLowerCase();
      const final = s + y;
      string2 += final;
      string2 += " ";
    }
    return string2;
  }
  let agendas = [];
  for (const [key, value] of Object.entries(props.person.agenda_text)) {
    agendas = [...agendas, <Agenda key={key} title={key} agenda={value} />];
    if (agendas.length === 4) {
      break;
    }
  }
  let listItems = [];
  let list = [];

  if (agendas[0].key[0] != "1") {
    listItems = agendas.map((agenda) =>
      <li>{agenda}</li>
    );
  }
  if (agendas[0].key[0] == "1") {
    // list = []
    list = agendas.map((agenda) =>
      <li> {agenda}</li>

    );
    list.join('\n');
  }
  return (
    <div
      className={`${styles.card} m-10 w-3/4 h-fit flex flex-col md:flex-row`}
    >
      <div className="pr-8 self-center">
        <img
          src={props.person.image}
          alt="W"
          border="0"
          className={styles.candidate}
          
        />
      </div>
     
      <div className="p-4 md:pr-16 ">
        <h1 className="font-bold">{toPascalCase(props.person.name)}</h1>
        <div className="flex">

          <div className="pl-6 pt-2 ">
            {listItems.length > 0 &&
              <ol className="list-decimal">
                {listItems}
              </ol>}
            {listItems.length == 0 &&
              <ol className="list-none">
                {list}
              </ol>}
          </div>
          <div className="mt-auto mb-0">

          </div>
        </div>

        <div className="pt-4">
        <SingleVote name={toPascalCase(props.person.name)} />
          {/* <button className={styles.button}> Vote for  </button> */}
        </div>
      </div>
     
      </div>
  );
};

export default CandidateCard;
