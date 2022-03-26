import React from "react";
import BreadCrumbs from "../../components/Home/Nomination/BreadCrumbs/BreadCrumbs";
import NameTag from "../../components/Home/Nomination/NameTag/NameTag";
import AgendaList from "../../components/Home/Nomination/AgendaList/AgendaList";

const CandidateNominationScreen = () => {
  return (
    <>
      <BreadCrumbs />
      <NameTag />
      <AgendaList />
    </>
  );
};

export default CandidateNominationScreen;
