import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import AboutScreen from "./AboutScreen";
import Footer from "../../components/Footer/Footer";
import NominationScreen from "./NominationScreen";
import TopNav from "../../components/Home/TopNav/TopNav";
import BlockchainMessage from "../../components/Home/BlockchainMessage/BlockchainMessage"
import HomeRouteNavBar from "../../components/Home/HomeRouteNavbar/HomeRouteNavBar"
import StatsScreen from "./StatsScreen";
import RulesScreen from "./RulesScreen";
import OrganisersScreen from "./OrganisersScreen";
const Layout = () => {
  return (
    <div className="md:ml-20 mt-12 mr-4 ml-4">
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
            <Route index path="/" exact element={<AboutScreen />} />
            <Route path="about" element={<AboutScreen />} />
            <Route path="nominations/*" exact element={<NominationScreen />} />
            <Route path="stats" exact element={<StatsScreen/>} />
            <Route path="rules" exact element={<RulesScreen/>} />
            <Route path="organisers" exact element={<OrganisersScreen/>} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default PreElectionScreen;
