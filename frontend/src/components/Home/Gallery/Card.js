import React from "react";
import "./CardStyle.css";

const Card = (props) => {
  const config = {
    "background-image":
      "linear-gradient(0deg,rgba(10, 10, 10, 0.8) 0%,rgba(255, 255, 255, 0) 100%), url(" +
      props.person.image +
      ")"
  };
  // console.log("yashiii");
  // console.log(props);
  return (
    <div onClick={()=>{document.location = `/election_portal/candidate/${props.person.id}`}} className="front shadow-lg" style={config}>
      <a href={props.person.id}>
        <div className="title">{props.person.name}</div>
      </a>
      <div className="title smallTitle">{props.person.tagline}</div>
    </div>
  );
};

export default Card;
