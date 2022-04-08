import React from "react";
import { Navigate, Router, Routes } from "react-router-dom";

const RulesScreen = () => {
  // document.location = "https://elections.swciitg.in/";
  window.open("https://elections.swciitg.in/");
  // <a href="https://elections.swciitg.in/" target="_blank"></a>;
  return (
    <>
      <Navigate to="/"/>
    </>
  );
};
export default RulesScreen;
