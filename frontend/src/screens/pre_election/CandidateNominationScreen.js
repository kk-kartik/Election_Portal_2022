import React from "react";
import BreadCrumbs from "../../components/Home/Nomination/BreadCrumbs/BreadCrumbs";
import NameTag from "../../components/Home/Nomination/NameTag/NameTag";
import AgendaList from "../../components/Home/Nomination/AgendaList/AgendaList";
import YoutubeEmbed from "../../components/Home/Nomination/Video/YoutubeEmbed";
import ProfileCard from "../../components/Home/Nomination/ProfileCard/profileCard";
const CandidateNominationScreen = () => {
  return (
    <>
    <br />
    <div className="pl-16">
      <BreadCrumbs />
    </div>
    <div className="ml-auto mr-auto w-full md:w-1/2 ">
      <div className="p-4 pt-16"> 
   <YoutubeEmbed embedId="rokGy0huYEA" />
      </div>
      <div className="py-8">

      <NameTag />
      </div>
      <AgendaList />
      <ProfileCard />
    </div>
    </>
  );
};

export default CandidateNominationScreen;
