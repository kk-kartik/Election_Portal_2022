import React from "react";

const AgendaList = (props) => {
  const list = props.agenda;

  const updatedList = list.map((listItems) => {
    return (
      <li key={listItems.toString()}>
        {listItems}
      </li>
    );
  });
  return (
    <>
      <div className="font-semibold text-lg pb-4">My Agendas</div>
      <div className="p-2 leading-8">
        <ul className="list-decimal text-gray-600 text-lg leading-8 ">{props.agenda}</ul>
      </div>
      <div className="font-semibold text-lg py-4">About me</div>
      <div className="text-gray-600 text-lg p-2 leading-8">
        {props.about}
      </div>

    </>
  );
};

export default AgendaList;
