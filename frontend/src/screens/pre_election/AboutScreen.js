import React from "react";
import Register from "../../components/Home/Register/Register";
import Dates from "../../components/Home/Dates/Dates";
import Debates from "../../components/Home/Debates/Debates";
import { Helmet } from "react-helmet";
import RegisterSuccess from "../../components/Home/RegisterSuccess/RegisterSuccess";

const AboutScreen = () => {
  return (
    <>
    <div className="px-4">
      <Helmet>
        <title>Election Portal</title>
      </Helmet>
      <Register />
      <Dates />
      {/* <Debates /> */}
      <RegisterSuccess />

    </div>
    </>
  );
};

export default AboutScreen;
