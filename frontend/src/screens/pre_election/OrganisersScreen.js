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
import Sarthak_img from "../../assets/team_images/Sarthak.jpg";
import Arjun_img from "../../assets/team_images/Arjun.jpeg";
import Nishtha_img from "../../assets/team_images/Nistha.jpg";
import Chinmay_img from "../../assets/team_images/Chinmay.jpg";
import Nivedit_img from "../../assets/team_images/Nivedit.jpg";
import Toshit_img from "../../assets/team_images/Toshit.jpg";
import grace_img from "../../assets/team_images/grace.png"
import yashi_img from "../../assets/team_images/yashi.jpg"
import sarthak_img from "../../assets/team_images/sarthakd_img.png"
import vignesh_img from "../../assets/team_images/Vighnesh_Image.jpg"
import { Helmet } from "react-helmet";
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
  {
    name: "Arjun Bhardwaj",
    post: "Core Team",
    contact: "9362314614",
    image: { Arjun_img },
    imagename: "Arjun_img",
  },
  {
    name: "Nishtha Rathod",
    post: "Core Team",
    contact: "8469510331",
    image: { Nishtha_img },
    imagename: "Nishtha_img",
  },
  {
    name: "Chinmay Jagdish Zinjal",
    post: "Core Team",
    contact: "7709595217",
    image: { Chinmay_img },
    imagename: "Chinmay_img",
  },
  {
    name: "Nivedit ukey",
    post: "Core Team",
    contact: "9370432794",
    image: { Nivedit_img },
    imagename: "Nivedit_img",
  },
  {
    name: "Toshit Kumar",
    post: "Core Team",
    contact: "6377436574",
    image: { Toshit_img },
    imagename: "Toshit_img",
  },
];

const WebTeamList = [
  {
    name: "Kunal Solanke",
    post: "WebOps Team",
    contact: "9511852924",
    image: { Kunal_img },
    imagename: "Kunal_img",
  },
  {
    name: "Vishnu Rai",
    post: "Web3 Team",
    contact: "7578968856",
    image: { Vishnu_img },
    imagename: "Vishnu_img",
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
    image: { Sarthak_img },
    imagename: "Sarthak_img",
  },
  {
    name: "Sarthak Diwan",
    post: "Frontend Team",
    contact: "7018236559",
    image: { sarthak_img },
    imagename: "sarthak_img",
  },
  {
    name: "Yashi Natu",
    post: "Frontend Team",
    contact: "9752886479",
    image: { yashi_img },
    imagename: "yashi_img",
  },
  {
    name: "Grace Mary Matson",
    post: "Frontend Team",
    contact: "9480575380",
    image: { grace_img },
    imagename: "grace_img",
  },
  {
    name: "Vignesh Deshpande",
    post: "Frontend Team",
    contact: "9819532497",
    image: { vignesh_img },
    imagename: "vignesh_img",
  },

];

const OrganisersScreen = () => {
  return (
    <>
      <Helmet>
        <title>Organisers | Election Portal</title>
      </Helmet>
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
