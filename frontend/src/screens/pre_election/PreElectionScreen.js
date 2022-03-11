import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import AboutScreen from "./AboutScreen";
import Footer from "../../components/Footer/Footer";
import NominationScreen from "./NominationScreen";
import TopNav from "../../components/Navbars/TopNav";
import BlockchainMessage from "../../components/BlockchainMessage"
import HomeRouteNavBar from "../../components/Navbars/HomeRouteNavBar"
import StatsScreen from "./StatsScreen";
import RulesScreen from "./RulesScreen";
import OrganisersScreen from "./OrganisersScreen";
const Layout = () => {
  return (
    <div>
      <Outlet/>
    </div>
  );
}
const PreElectionScreen = () => {
  return (
    <>
      <div>
        {/* Pre-election navbar */}
        <TopNav/>
        <BlockchainMessage/>
        {/* Routes Navbar */}
        <div className="mt-5 ml-1 mr-1 md:ml-16 md:mr-10">
          <HomeRouteNavBar/>
        </div>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" exact element={<AboutScreen />} />
            <Route path="about" element={<AboutScreen />} />
            <Route path="nominations/*" exact element={<NominationScreen />} />
            <Route path="stats" exact element={<StatsScreen/>} />
            <Route path="rules" exact element={<RulesScreen/>} />
            <Route path="organisers" exact element={<OrganisersScreen/>} />
          </Route>
          {/* setup react router for different sections here */}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default PreElectionScreen;
