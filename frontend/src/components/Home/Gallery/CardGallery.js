import React from "react";
import Card from "./Card";
import lime from "../../../assets/Lime.jpg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const CardGallery = (props) => {
  let cards = [];
  for (let i = 0; i < props.persons.length; i++) {
    cards = [...cards, <Card id={i} person={props.persons[i]} />];
  }
  return (
    <div className="flex items-center justify-center md:m-3">
      <div className="grid grid-flow-col md:grid-flow-row-dense	auto-cols-max overflow-auto md:grid-cols-2 lg:grid-cols-3 gap-3">
        {cards}
      </div>
    </div>
  );
};

export default CardGallery;
