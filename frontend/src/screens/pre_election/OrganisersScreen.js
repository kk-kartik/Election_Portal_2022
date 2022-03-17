import React from "react";
import { Router, Routes } from "react-router-dom";
import OrganizerCard from "../../components/Home/OrganizerCard/OrganizerCard";

const OrganisersScreen = () => {
  return (
    <>
      <div className="text-2xl">Election Team</div>
      <div className="flex flex-wrap">
        <OrganizerCard />
        <OrganizerCard />
        <OrganizerCard />
      </div>
      <div className="text-2xl">Web Developement Team</div>
      <div className="flex flex-wrap">
        <OrganizerCard />
        <OrganizerCard />
        <OrganizerCard />
      </div>
    </>
  );
};
export default OrganisersScreen;
