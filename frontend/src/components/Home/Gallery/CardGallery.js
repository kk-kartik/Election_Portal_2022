import React from "react";
import Card from "./Card";
//import lime from "../../../assets/Lime.jpg";
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const CardGallery = ({persons}) => {
  
  console.log("Gallery persons: ",persons);

  return (
    <div className="ml-4 flex items-center justify-center md:m-3">
      <div className="grid grid-flow-col md:grid-flow-row-dense	auto-cols-max overflow-auto md:grid-cols-2 lg:grid-cols-3 gap-3">
        {persons && persons.map((person,i)=>{
          return <Card key={i} id={i} person={person} />;
        })}
      </div>
    </div>
  );
};

export default CardGallery;
