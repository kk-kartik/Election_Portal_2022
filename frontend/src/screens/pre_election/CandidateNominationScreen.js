import React, {useState} from "react";
import BreadCrumbs from "../../components/Home/Nomination/BreadCrumbs/BreadCrumbs";
import NameTag from "../../components/Home/Nomination/NameTag/NameTag";
import AgendaList from "../../components/Home/Nomination/AgendaList/AgendaList";
import YoutubeEmbed from "../../components/Home/Nomination/Video/YoutubeEmbed";
import ProfileCard from "../../components/Home/Nomination/ProfileCard/profileCard";
import svg from "../../components/Nominate/AgendaList/style.svg"
import svg2 from "../../components/Nominate/AgendaList/style2.svg"
import styles from "../Register/RegisterScreen.module.css"
import {getCandidateByID} from "../../api/index";
import parse from "html-react-parser";
const CandidateNominationScreen = () => {

  const [loaded, setLoaded] = useState(null);
  // const getData = async (id) => {
  //    data = await getCandidateByID(id);
  //    return data
  // }

  let tr = <div>
    Loading</div>;
  if(loaded == null){
    getCandidateByID("80").then((data)=>{console.log("---data---"); setLoaded(data.data); console.log(data.data)});
    return tr;
  }
  const agenda = ['Setting up Career Counselling Cell (opportunities in non-tech, UPSC, CAT, GRE, MS, PhD and Post-Doc in foreign Universities\) options available for change of field.', 'Setting up Students Committee for CIF and common labs to organize Workshops quarterly for learning instruments in CIF and common labs.'];

  const getEmbedID = (value) => {
    var regEx =
      "^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?.com|youtu.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)";
    var matches = value.match(regEx);
    return matches[1]; 
  };
  return (
    <div className="m-2">
      <br />
      <div className="md:pl-16 pl-4">
        <BreadCrumbs name={loaded.name} />
      </div>
      <div className="ml-auto mr-auto w-full md:w-1/2 ">
        <div className="p-4 pt-16 flex items-end">
          <YoutubeEmbed embedId={getEmbedID(loaded.video)} />
          <div className={`absolute z-40  ${styles.svgs}`}>
            <img src={svg} className="mr-4" />
            <img src={svg2} className="ml-6" />
          </div>
        </div>
        <div className="py-8">
          <NameTag name = {loaded.name} branch={loaded.branch} />
        </div>
        {/* <AgendaList agenda={parse(loaded.agenda_text)} about={loaded.about}/> */}
        <br />
        <br />
        <ProfileCard />
      </div>
    </div>
  );
};

export default CandidateNominationScreen;
