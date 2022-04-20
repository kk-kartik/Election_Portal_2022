import React from "react";
import SubMenu from "./SubMenu";

const Sidebar = (props) => {
  return (
    <div className="shadow-lg rounded-2xl">
      {props.posts.map((item, index) => {
        return <SubMenu item={item} key={index} />;
      })}
    </div>
  );
};

export default Sidebar;
