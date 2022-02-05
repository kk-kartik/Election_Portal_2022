import React from "react";
import { Routes, Route } from "react-router-dom";
import AboutScreen from "./AboutScreen";

const PreElectionScreen = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold underline">Pre Election</h2>
      <Routes>
        <Route path="/" exact element={<AboutScreen />} />
      </Routes>
    </div>
  );
};

export default PreElectionScreen;
