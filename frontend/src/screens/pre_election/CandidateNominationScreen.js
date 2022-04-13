import React, {useEffect, useState} from "react";
import BreadCrumbs from "../../components/Home/Nomination/BreadCrumbs/BreadCrumbs";
import NameTag from "../../components/Home/Nomination/NameTag/NameTag";
import AgendaList from "../../components/Home/Nomination/AgendaList/AgendaList";
import YoutubeEmbed from "../../components/Home/Nomination/Video/YoutubeEmbed";
import ProfileCard from "../../components/Home/Nomination/ProfileCard/profileCard";
import svg from "../../components/Nominate/AgendaList/style.svg"
import svg2 from "../../components/Nominate/AgendaList/style2.svg"
import styles from "../Register/RegisterScreen.module.css"
import { useSelector } from "react-redux";
const CandidateNominationScreen = () => {
  useEffect(() => {
    //Access id from the url
    const id = window.location.href.split("/")[window.location.href.split("/").length - 1];
    console.log(id);
    //Get the candidate details from the database
    
  });
  const candidates = useSelector((store) => store.candidates);
  console.log(candidates);
  const [agenda, setAgenda] = useState(['Setting up Career Counselling Cell (opportunities in non-tech, UPSC, CAT, GRE, MS, PhD and Post-Doc in foreign Universities\) options available for change of field.', 'Setting up Students Committee for CIF and common labs to organize Workshops quarterly for learning instruments in CIF and common labs.']);
  return (
    <div className="m-2">
      <br />
      <div className="md:pl-16 pl-4">
        <BreadCrumbs />
      </div>
      <div className="w-full md:w-1/2 mx-4 md:ml-auto md:mr-auto">
        <div className="p-4 pt-16 flex items-end">
          <YoutubeEmbed embedId="rokGy0huYEA" />
          <div className={`absolute z-40 hidden lg:block ${styles.svgs}`}>
            <img src={svg} className="mr-4" />
            <img src={svg2} className="ml-6" />
          </div>
        </div>
        <div className="py-8">
          <NameTag />
        </div>
        <AgendaList agenda={agenda}/>
        <br />
        <br />
        <ProfileCard />
      </div>
    </div>
  );
};

export default CandidateNominationScreen;
