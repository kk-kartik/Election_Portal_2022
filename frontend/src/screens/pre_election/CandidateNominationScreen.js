import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../components/Home/Nomination/BreadCrumbs/BreadCrumbs";
import NameTag from "../../components/Home/Nomination/NameTag/NameTag";
import AgendaList from "../../components/Home/Nomination/AgendaList/AgendaList";
import YoutubeEmbed from "../../components/Home/Nomination/Video/YoutubeEmbed";
import ProfileCard from "../../components/Home/Nomination/ProfileCard/profileCard";
import svg from "../../components/Nominate/AgendaList/style.svg";
import svg2 from "../../components/Nominate/AgendaList/style2.svg";
import styles from "../Register/RegisterScreen.module.css";
import { getCandidateByID } from "../../api/index";
import branch_code from "../../constants/branch";
import { useParams } from "react-router-dom";
import MoreCandidates from "../../components/Home/Nomination/MoreCandidates/MoreCandidates";
import NewFooter from "../../components/Footer/NewFooter";
import { Helmet } from "react-helmet";

const CandidateNominationScreen = () => {
  const [loaded, setLoaded] = useState({});
  const [branch, setBranch] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getCandidateByID(id)
      .then((res) => res.json())
      .then((data) => {
        console.log("---data---", data);
        setLoaded(data);
        let br = data.branch;
        if(branch_code[br]) {
          setBranch(branch_code[br]);
        }
      })
      .catch((e) => console.log(e));
  }, [id]);

  const getEmbedID = (value) => {
    var regEx =
      "^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?.com|youtu.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)";
    var matches = value.match(regEx);
    return matches[1];
  };

  return (
    <>
      <div className="m-2">
        {/* <Helmet>
          <meta property="og:URL" content={loaded.image} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={loaded.name} />
          <meta property="og:description" content={loaded.about} />
          <meta property="og:image" content={loaded.image} />
        </Helmet> */}
        <br />
        {loaded.name ? (
          <>
            <div className="md:pl-16 pl-4">
              <BreadCrumbs name={loaded.name} position={loaded.position} />
            </div>
            <div className="ml-auto mr-auto w-full md:w-1/2 ">
              <div className="pt-16 pb-10 relative items-end">
                <YoutubeEmbed embedId={getEmbedID(loaded.video)} />

                <div className={`absolute z-40  ${styles.svgs}`}>
                  <img src={svg} className="mr-4" alt="." />
                  <img src={svg2} className="ml-6" alt="." />
                </div>
              </div>
              <div className="py-8">
                <NameTag
                  name={loaded.name}
                  branch={branch}
                  position={loaded.position}
                  degree={loaded.degree}
                  agenda_pdf={loaded.agenda_pdf}
                />
              </div>
              <AgendaList agenda={loaded.agenda_text} about={loaded.about} />
              <br />
              <br />

              <ProfileCard
                name={loaded.name}
                branch={branch}
                tagline={loaded.tagline}
                image={loaded.image}
                degree={loaded.degree}
                agenda_pdf={loaded.agenda_pdf}
              />
              <div className="">
                <MoreCandidates loaded={loaded} />
              </div>
            </div>
          </>
        ) : (
          <div style={{minHeight:"70vh", display:"flex",justifyContent:"center"}}>Loading</div>
        )}
      </div>
      <NewFooter></NewFooter>
    </>
  );
};

export default CandidateNominationScreen;
