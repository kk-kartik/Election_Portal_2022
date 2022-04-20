import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
const SubMenu = ({ item, index }) => {
  return (
    <>
      {item.subposts.length === 1 ? (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.sidebarLabel} p-3 text-lg flex justify-between text-black rounded-md border font-bold md:border-blue-700 md:border-l-4 md:border-b-0 md:border-t-0 md:border-r-0 md:text-blue-700 ${styles.electionBlue}`
              : `${styles.sidebarLabel} p-3 text-lg flex justify-between text-black rounded-md font-bold border md:flex`
          }
          style={{
            transition: "all 0.4s ease-out",
          }}
          to={item.subposts[0].path}
          activeClassName="decoration-blue-500 md:border-4 md:border-blue-600 md:text-blue-600 md:text-blue-600"
        >
          <div>
            <span className={`${styles.sidebarLabel}`}>{item.title}</span>
          </div>
        </NavLink>
      ) : (
        <div
          // className={
          //   subnav
          //     ? `${styles.sidebarLabel} cursor-pointer p-3 text-lg flex justify-between text-black rounded-md border font-bold md:border-blue-700 md:border-l-4 md:border-b-0 md:border-t-0 md:border-r-0 md:text-blue-700 ${styles.electionBlue}`
          //     : `${styles.sidebarLabel} cursor-pointer p-3 text-lg flex justify-between text-black rounded-md font-bold border md:flex`
          // }
          className={`${styles.sidebarLabel} cursor-pointer p-3 text-lg flex justify-between text-black rounded-md font-bold border md:flex`}
          style={{
            transition: "all 0.4s ease-out",
          }}
          activeClassName="cursor-pointer decoration-blue-500 md:border-4 md:border-blue-600 md:text-blue-600 md:text-blue-600"
        >
          <div>
            <span className={`${styles.sidebarLabel} cursor-pointer`}>{item.title}</span>
          </div>
        </div>
      )}

      {item.subposts.map((item, index) => {
        return (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.dropdownLink} cursor-pointer border hidden md:flex !text-[#2b00ff] font-semibold`
                : `${styles.dropdownLink} cursor-pointer border hidden md:flex`
            }
            to={item.path}
            key={index}
          >
            <div
              className={({ isActive }) =>
                isActive
                  ? `${styles.dropdownLink} border-b-2 rounded-md bg-gray-500 !text-[#2b00ff] font-semibold`
                  : `${styles.dropdownLink} border-b-2 rounded-md bg-gray-500`
              }
            >
              {item.title}
            </div>
          </NavLink>
        );
      })}
    </>
  );
};

export default SubMenu;
