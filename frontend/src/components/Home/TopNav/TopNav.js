import React, { useState } from "react";
import styles from "./TopNav.module.css";
import { Avatar } from "@primer/react";
import LogoSVG from "./logo.svg";
import GlobeSVG from "./globe.svg";
import profile from "./profile.svg";
import dropdown from "./drop.svg";
import { Link } from "react-router-dom";
import MicrosoftLogin from "react-microsoft-login";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../actions/auth";
import { useNavigate } from "react-router-dom";
import { ELECTIONAPI } from "../../../constants";

const responseGoogle = async (data) => {
  const accessToken = data["accessToken"];
  const res = await axios.post(
    `${ELECTIONAPI}/auth/social/google/`,
    {
      access_token: accessToken,
    },
    {
      withCredentials: true,
    }
  );
};

const TopNav = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.auth);
  const candidate = useSelector((store) => store.candidate);
  const [loginClicked, setLoginClicked] = useState(false);
  const [dropClick, setDropClick] = useState(false);
  const authHandler = async (err, data) => {
    if (err) {
      return;
    }
    if (!data) {
      return;
    }
    if (!data["accesstoken"]) {
      return;
    }
    if (loginClicked) {
      const accessToken = data["accessToken"];
      try {
        const res = await axios.post(
          `${ELECTIONAPI}/auth/social/outlook/`,
          {
            access_token: accessToken,
          },
          {
            withCredentials: true,
          }
        );
        dispatch(getUser());

        if (!res?.data?.user?.registration_complete) {
          navigate("/register", { replace: true });
        }
      } catch (err) {
        alert("Something went wrong!Please check your connection");
        return;
      }
    }
  };

  //   let loginComp = <GoogleLogin
  //   clientId="774598959771-jilp7jr6a3677htqaf1na9adqoj3aolo.apps.googleusercontent.com"
  //   render={(renderProps) => (
  //     <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
  //       <div className={`hidden sm:flex`}>Login</div>
  //     </button>
  //   )}
  //   buttonText="Login"
  //   onSuccess={responseGoogle}
  //   onFailure={responseGoogle}
  //   redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
  // />
  const dropdownListener = (e) => {
    setDropClick(!dropClick);
  };
  let loginComp = () => {
    if (userData?.first_name) {
      return (
        <div className={`sm:flex flex-col`}>
          <div className={`decoration-stone-800 flex items-center`}>
            <Avatar src={profile} size={38} />
            <div className="ml-2 relative">
              <div className="flex flex-row">
                <span className="text-sm font-medium">
                  {userData.first_name}
                </span>
                <img
                  src={dropdown}
                  className="ml-1 scale-125 cursor-pointer"
                  alt="d"
                  onClick={dropdownListener}
                />
              </div>
              <span className="text-sm text-gray-800">
                {userData.candidates.length !== 0 ? "Candidate" : "Voter"}
              </span>
              <div
                className={`decoration-gray-600 absolute z-10 font-bold bg-white rounded shadow-lg top-3 right-0 ${
                  dropClick ? "flex flex-col" : "hidden"
                }`}
              >
                {userData?.candidates.length !== 0 && (
                  <Link
                    to="/nominate/about"
                    className="text-xs font-medium hover:bg-blue-100 px-3 py-2 rounded"
                    onClick={() => setDropClick(false)}
                  >
                    My profile
                  </Link>
                )}
                <button
                  onClick={(e) => {
                    dispatch(logout());
                    setLoginClicked(false);
                    setDropClick(false);
                    navigate("/");
                  }}
                  className="text-xs font-medium hover:bg-blue-100 px-3 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      // <div onClick={(e) => setLoginClicked(true)}>
      //   <MicrosoftLogin
      //     clientId={"495b7037-aa83-4595-a842-8a69daaf2f20"}
      //     redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
      //     //authCallback={() => authHandler(dispatch)}
      //     tenantUrl={
      //       "https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c"
      //     }
      //     authCallback={authHandler}
      //   />
      // </div>
      <div>
        <Link to="/login">
          <button className="border-2 py-1 px-4 rounded-md text-sm font-medium">
            Login
          </button>
        </Link>
      </div>
    );
  };
  return (
    <div className={`flex pl-4 pr-4 md:pl-16 md:pr-16 my-3`}>
      <div>
        <Link to="/">
          <img src={LogoSVG} alt="logo" />
        </Link>
      </div>
      <div className={styles.cont}>
        {/* <div className={styles.btn}>
          <div>
            <img src={GlobeSVG} alt="logo"/>
          </div>
          <div>EN</div>
        </div> */}
        <div className={styles.login}>
          {loginComp()}
          {/* <svg
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
          </svg> */}
        </div>
      </div>
    </div>
  );
};
export default TopNav;
