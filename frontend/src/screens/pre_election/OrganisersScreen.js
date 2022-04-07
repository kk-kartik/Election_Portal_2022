import React from "react";
import { Router, Routes } from "react-router-dom";
import OrganizerCard from "../../components/Home/OrganizerCard/OrganizerCard";
import Antash_img from "../../assets/team_images/antash.png";
import Princy_img from "../../assets/team_images/princy.jpeg";
import Praveen_img from "../../assets/team_images/praveen.jpg";
import Vedant_img from "../../assets/team_images/Vedant.jpeg";
import Vishnu_img from "../../assets/team_images/Vishnu.jpeg";
import Kunal_img from "../../assets/team_images/Kunal.jpg";
import Bhargav_img from "../../assets/team_images/Bhargav.jpg";
import Saket_img from "../../assets/team_images/Saket.png";
const ElectionTeamList = [
  {
    name: "Praveen Sai Teella",
    post: "Chief Election Officer",
    contact: "6303936832",
    image: { Praveen_img },
    imagename: "Praveen_img",
  },
  {
    name: "Princy Asawa",
    post: "Election Officer",
    contact: "7425070339",
    image: { Princy_img },
    imagename: "Princy_img",
  },
  {
    name: "Antash Kishore Sinha",
    post: "Election Officer",
    contact: "8340459570",
    image: { Antash_img },
    imagename: "Antash_img",
  },
];

const WebTeamList = [
  {
    name: "Kunal Solanke",
    post: "WebOps Head",
    contact: "9511852924",
    image: { Kunal_img },
    imagename: "Kunal_img",
  },
  {
    name: "Vishnu Rai",
    post: "Web3 Head",
    contact: "7578968856",
    image: { Vishnu_img },
    imagename: "Vishnu_img",
  },
  {
    name: "Bhargav Saikia",
    post: "Frontend Team",
    contact: "8403821184",
    image: { Bhargav_img },
    imagename: "Bhargav_img",
  },
  {
    name: "Sarthak Bhagwat",
    post: "Frontend Team",
    contact: "9425605601",
    image: { Praveen_img },
    imagename: "Saket_img",
  },
  {
    name: "Saket Kumar Singh",
    post: "Backend Team",
    contact: "7207848523",
    image: { Saket_img },
    imagename: "Saket_img",
  },

  {
    name: "Vedant Chourasia",
    post: "Backend Team",
    contact: "8109181921",
    image: { Vedant_img },
    imagename: "Vedant_img",
  },
];

const OrganisersScreen = () => {
  return (
    <>
      <div className="text-2xl mt-8 flex justify-center sm:justify-start">
        Election Team
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start">
        {ElectionTeamList.map((data, idx) => {
          return (
            <OrganizerCard
              key={idx}
              name={data.name}
              post={data.post}
              contact={data.contact}
              image={data.image}
              imagename={data.imagename}
            />
          );
        })}
      </div>
      <div className="text-2xl mt-8 flex justify-center sm:justify-start">
        Web Development Team
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start">
        {WebTeamList.map((data, idx) => {
          return (
            <OrganizerCard
              key={idx}
              name={data.name}
              post={data.post}
              contact={data.contact}
              image={data.image}
              imagename={data.imagename}
            />
          );
        })}
      </div>
    </>
  );
};
export default OrganisersScreen;
