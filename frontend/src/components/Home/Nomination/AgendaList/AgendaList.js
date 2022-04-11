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
      <div className="font-semibold text-lg pb-4">My Top Three Agendas</div>
      <div className="p-2 leading-8">
        <ul className="list-decimal text-gray-600 text-lg leading-8 ">{updatedList}</ul>
      </div>
      <div className="font-semibold text-lg py-4">About me</div>
      <div className="text-gray-600 text-lg p-2 leading-8">
        Currently serving as Superintendent of Police (Communication), Assam. ​An Engineering graduate in the field Electronics and Communication). ​​Was one of the SIT members to investigate the infamous 30th October, 2008 serial blasts took place in Guwahati and various districts of lower Assam. ​DGP’s commendation Medal.
        CM’s Police Medal for outstanding service. ​Internal Security Medal from MHA, Govt. of India.
      </div>

    </>
  );
};

export default AgendaList;
