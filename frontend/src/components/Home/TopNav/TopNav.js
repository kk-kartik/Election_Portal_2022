import React from "react";
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
import { Dropdown } from "@primer/react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../actions/auth";
import { useNavigate } from "react-router-dom";

const responseGoogle = async (data) => {
  console.log(data);
  const accessToken = data["accessToken"];
  const res = await axios.post(
    `${process.env.REACT_APP_BASEAPIURL}elections_api/auth/social/google/`,
    {
      access_token: accessToken,
    },
    {
      withCredentials: true,
    }
  );
};
const authHandler = async (err, data, dispatch, navigate) => {
  console.log(data, err);
  const accessToken = data["accessToken"];
  const res = await axios.post(
    `https://swc.iitg.ac.in/elections_api/auth/social/outlook/`,
    {
      access_token: accessToken,
    },
    {
      withCredentials: true,
    }
  );
  dispatch(getUser());
  console.log("response", res);
  if (!res?.data?.user?.registration_complete) {
    navigate("/register", { replace: true });
  }
};

const TopNav = ({}) => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.auth);
  let navigate = useNavigate();
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
  console.log(process.env.REACT_APP_AUTH_REDIRECT_URI);
  let loginComp = (
    <MicrosoftLogin
      clientId={"495b7037-aa83-4595-a842-8a69daaf2f20"}
      redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
      //authCallback={() => authHandler(dispatch)}
      tenantUrl={
        "https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c"
      }
      authCallback={(err, data) => authHandler(err, data, dispatch, navigate)}
    />
  );
  if (userData?.first_name) {
    loginComp = (
      <div className={`hidden sm:flex flex-col`}>
        <div className={`decoration-stone-800 flex items-center`}>
          <Avatar src={profile} size={38} />
          {userData.first_name}
          <img src={dropdown} className={`mr-0 ml-auto`} alt="d" />
        </div>
        <div className={`decoration-gray-600`}>
          {userData.candidates.length !== 0 ? "Candidate" : "Voter"}
        </div>
      </div>
    );
  }
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
          {loginComp}
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
