import React from "react";
import Register from "../../components/Home/Register/Register";
import Dates from "../../components/Home/Dates/Dates";
import Debates from "../../components/Home/Debates/Debates";
import { Helmet } from "react-helmet";

const AboutScreen = () => {
  return (
    <>
      <Helmet>
        <title>Election Portal</title>
      </Helmet>
      <Register />
      <Dates />
      <Debates />
    </>
  );
};

export default AboutScreen;
