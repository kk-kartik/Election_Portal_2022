import React from "react";
import parse from "html-react-parser";
import styles from "./AgendaList.module.css"
import FAQCard from "../../FAQ/FAQCard";
const Agenda = (p) => {
  return (
    <div className="p-2">
      {/* <div className="font-semibold text-lg">{p.title}</div> */}
      <div className="p-2 leading-8 text-justify">
        <FAQCard question={p.title} answer={parse(p.agenda)}/>
        {/* <ol className={`list-decimal text-gray-600 text-lg leading-8 ${styles.list}`}></ol> */}
      </div>
    </div>
  );
}
const AgendaList = (props) => {
  // const list = props.agenda;

  // const updatedList = list.map((listItems) => {
  //   return (
  //     <li key={listItems.toString()}>
  //       {listItems}
  //     </li>
  //   );
  // });
  
  let agendas = [];
  
for (const [key, value] of Object.entries(props.agenda)) {
  console.log(key, value);
  agendas = [...agendas,<Agenda key={key} title={key} agenda={value}/>]
}
  return (
    <>
      <div className="font-semibold text-xl pb-4">My Agendas</div>

      {/* <div className="p-2 leading-8 text-justify">
        <ul className="list-decimal text-gray-600 text-lg leading-8  ">{props.agenda}</ul>
      </div> */}
      {agendas}

      <div className="font-semibold text-lg py-4">About me</div>
      <div className="text-gray-600 text-lg p-2 leading-8 text-justify">
        {props.about}
      </div>

    </>
  );
};

export default AgendaList;
