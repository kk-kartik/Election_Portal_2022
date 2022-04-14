import React from "react";
import "./CardStyle.css";
import { Link } from "react-router-dom";

const Card = ({person}) => {
  const config = {
    "background-image":
      "linear-gradient(0deg,rgba(10, 10, 10, 0.8) 0%,rgba(255, 255, 255, 0) 100%), url(" +
        person.image +
      ")"
  };

  return (
    <Link to={`/candidate/${person.id}`}>
      <div className="front shadow-lg" style={config}>
        <div className="title">{person.name}</div>
        <div className="title smallTitle">{person.tagline}</div>
      </div>
    </Link>
  );
};

export default Card;
