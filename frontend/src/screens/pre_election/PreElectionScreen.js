import React from "react";
import { Routes, Route } from "react-router-dom";
import AboutScreen from "./AboutScreen";
import Footer from "../../components/Footer/Footer";
import NominationScreen from "./NominationScreen";

const PreElectionScreen = () => {
  return (
    <>
      <div>
        {/* Pre-election navbar */}
        {/* Routes Navbar */}
        <Routes>
          <Route path="/" exact element={<AboutScreen />} />
          <Route path="/nominations/*" exact element={<NominationScreen />} />
          {/* setup react router for different sections here */}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default PreElectionScreen;
