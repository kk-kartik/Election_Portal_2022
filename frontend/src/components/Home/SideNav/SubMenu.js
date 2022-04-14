import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as RiIcons from "react-icons/ri";
import "./Sidebar.css";

const SubMenu = ({ item, index }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `sidebar-link flex justify-between text-black rounded-md border font-bold md:border-blue-700 md:border-l-4 md:border-b-0 md:border-t-0 md:border-r-0 md:text-blue-700 `
            : `sidebar-link flex justify-between text-black rounded-md font-bold border md:flex`
        }
        style={{
          transition: "all 0.4s ease-out"
        }}
        to={item.subposts[0].path}
        onClick={item.subposts.length > 0 && item.subposts[0].title && showSubnav}
        activeClassName=" decoration-blue-500 md:border-4 md:border-purple-600 md:text-purple-600 md:text-purple-600"
      >
        <div>
          <span className="sidebar-label">{item.title}</span>
        </div>
        <div>
          {item.subposts.length > 0 && subnav ? (
            <div>
              <RiIcons.RiArrowUpSFill />
            </div>
          ) : item.subposts.length > 0 && item.subposts[0].title ? (
            <div>
              <RiIcons.RiArrowDownSFill />
            </div>
          ) : null}
        </div>
      </NavLink>
      {subnav &&
        item.subposts.map((item, index) => {
          return (
            <NavLink
              className="dropdown-link cursor-pointer border hidden md:flex"
              to={item.path}
              key={index}
            >
              <div className="dropdown-link border-b-2 rounded-md bg-gray-500">
                {item.title}
              </div>
            </NavLink>
          );
        })}
    </>
  );
};

export default SubMenu;
