import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import TopNav from "../../components/Home/TopNav/TopNav";
import ProfileNavBar from "../../components/Nominate/ProfileNavBar/ProfileNavBar"
import AboutScreen from "./AboutScreen";
import AgendasScreen from "./AgendasScreen";
import AnalyticsScreen from "./AnalyticsScreen";
import CredentialsScreen from "./CredentialsScreen";
import VerificationScreen from "./VerificationScreen";
import VideoScreen from "./VideoScreen";

const Layout = () => {
  return (
    <div className="md:ml-20 mt-12 mr-4 ml-4">
      <Outlet/>
    </div>
  );
};
const CandidateNominateScreen = () => {
  return (
    <>
      <TopNav />
      <div className="mt-5 ml-1 mr-1 md:ml-16 md:mr-10">
        <ProfileNavBar />
      </div>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" exact element={<AboutScreen />} />
            <Route path="about" element={<AboutScreen />} />
            <Route path="agendas" exact element={<AgendasScreen/>} />
            <Route path="credentials" exact element={<CredentialsScreen/>} />
            <Route path="video" exact element={<VideoScreen/>} />
            <Route path="verification" exact element={<VerificationScreen/>} />
            <Route path="analytics" exact element={<AnalyticsScreen/>} />
          </Route>
        </Routes>
    </>
  );
};

export default CandidateNominateScreen;
