import React from "react";
import { Router, Routes } from "react-router-dom";
import OrganizerCard from "../../components/Home/OrganizerCard/OrganizerCard";
import Antash_img from "../../assets/team_images/antash.png";
import Princy_img from "../../assets/team_images/princy.jpeg";
import Praveen_img from "../../assets/team_images/praveen.jpg";

const ElectionTeamList = [
  {
    name: "Praveen Sai Teella",
    post: "Chief Election Officer",
    contact: "6303936832",
    image: { Praveen_img },
  },
  {
    name: "Princy Asawa",
    post: "Election Officer",
    contact: "7425070339",
    image: { Princy_img },
  },
  {
    name: "Antash Kishore Sinha",
    post: "Election Officer",
    contact: "8340459570",
    image: { Antash_img },
  },
];

const WebTeamList = [
  {
    name: "Vishnu Rai",
    post: "Web Team",
    contact: "1234657890",
    image: { Praveen_img },
  },
  {
    name: "Saket Kumar Singh",
    post: "Web Team",
    contact: "1234567890",
    image: { Praveen_img },
  },
  {
    name: "Kunal Solanke",
    post: "Web Team",
    contact: "1234567890",
    image: { Praveen_img },
  },
  {
    name: "Bhargav Saikia",
    post: "Web Team",
    contact: "1234567890",
    image: { Praveen_img },
  },
  {
    name: "Vedant Chourasia",
    post: "Web Team",
    contact: "1234567890",
    image: { Praveen_img },
  },
];

const OrganisersScreen = () => {
  return (
    <>
      <div className="text-2xl mt-8">Election Team</div>
      <div className="flex flex-wrap justify-start">
        {ElectionTeamList.map((data, idx) => {
          return (
            <OrganizerCard
              key={idx}
              name={data.name}
              post={data.post}
              contact={data.contact}
              image={data.image}
            />
          );
        })}
      </div>
      <div className="text-2xl mt-8">Web Development Team</div>
      <div className="flex flex-wrap">
        {WebTeamList.map((data, idx) => {
          return (
            <OrganizerCard
              key={idx}
              name={data.name}
              post={data.post}
              contact={data.contact}
              image={data.image}
            />
          );
        })}
      </div>
    </>
  );
};
export default OrganisersScreen;
