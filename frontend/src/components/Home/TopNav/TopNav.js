import React from "react";
import styles from "./TopNav.module.css";
import {Avatar} from "@primer/react";
import LogoSVG from "./logo.svg";
import GlobeSVG from "./globe.svg";
import profile from "./profile.svg"
import { Link } from "react-router-dom";
const TopNav = () => {
  return (
    <div className={`flex pl-4 pr-4 md:pl-16 md:pr-16 my-3`}>
      <div>
        <Link to="/">
          <img src={LogoSVG} />
        </Link>
      </div>
      <div className={styles.cont}>
        <div className={styles.btn}>
          <div>
          <img src={GlobeSVG} />
          </div>
          <div>EN</div>
        </div>
        <div className={styles.login}>
          <Avatar src={profile} size={38} />
          <div className={`hidden sm:flex`}>Login</div>
          <svg
            className={`flex sm:hidden`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.42678 7.42678L7.82326 10.8232C7.92089 10.9209 8.07918 10.9209 8.17681 10.8232L11.5732 7.42678C11.7307 7.26928 11.6192 7 11.3964 7H4.60356C4.38083 7 4.26929 7.26929 4.42678 7.42678Z"
              fill="#959DA5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default TopNav;
