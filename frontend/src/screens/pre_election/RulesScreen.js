import React from "react";
import { Router, Routes } from "react-router-dom";

const RulesScreen = () => {
  // document.location = "https://elections.swciitg.in/";
  window.open("https://elections.swciitg.in/");
  // <a href="https://elections.swciitg.in/" target="_blank"></a>;
  return (
    <>
      <a href="https://elections.swciitg.in/" target="_blank">
        Click Here
      </a>
    </>
  );
};
export default RulesScreen;
