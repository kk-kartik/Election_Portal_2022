import React, { useState } from "react";
import iitglogo from "./iitglogo.png";
import gmaillogo from "./gmaillogo.png";
import axios from "axios";
import MicrosoftLogin from "react-microsoft-login";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import { ELECTIONAPI } from "../../constants";
import cards from "../../assets/images_1.png";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const [loginClicked, setLoginClicked] = useState(false);
  const responseGoogle = async (data) => {
    const accessToken = data["accessToken"];
    try {
      const res = await axios.post(
        `${ELECTIONAPI}/auth/social/google/`,
        {
          access_token: accessToken,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(getUser());
      if (!res?.data?.euser?.registration_complete) {
        navigate("/register", { replace: true });
      }
    } catch (err) {
      alert("Something went wrong!Please check your connection");
      return;
    }
  };


  const authHandler = async (err, data) => {
    if (err) {
      alert("Something went wrong!Please check your connection");
      return;
    }
    // if (loginClicked) {
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
      sessionStorage.removeItem("msal.idtoken");
      if (!res?.data?.euser?.registration_complete) {
        navigate("/register", { replace: true });
      }
    } catch (err) {
      alert("Something went wrong!Please check your connection");
      return;
    }
    //}
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row items-center py-2 sm:py-4">
          <div className="h-15 w-15 flex mx-3 sm:ml-20">
            <img
              className="h-8 w-8 sm:h-12 sm:w-12 flex"
              src={iitglogo}
              alt=""
            />
          </div>
          <div>
            <p class="text-lg sm:text-xl font-medium">
              Indian Institute of Technology Guwahati
            </p>
          </div>
        </div>
        <div className="flex px-20">
          <div className="flex flex-col justify-center items-start py-10">
            <div className="mb-10">
              <p className="text-4xl font-medium mb-2">Sign In</p>
              <p className="text-lg font-normal">
                Register yourself by using IITG email
              </p>
            </div>

            <div className="flex flex-col justify-start items-start">
              <div className="mb-4">
                <MicrosoftLogin
                  clientId={"495b7037-aa83-4595-a842-8a69daaf2f20"}
                  redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
                  //authCallback={() => authHandler(dispatch)}
                  tenantUrl={
                    "https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c"
                  }
                  authCallback={authHandler}
                />
              </div>
              <div>
                <button className="py-2 pl-1 pr-9 border text-slate-600 font-bold border-slate-700">
                  <GoogleLogin
                    clientId="774598959771-jilp7jr6a3677htqaf1na9adqoj3aolo.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <div className="flex flex-row items-start justify-start font-semibold">
                          <img src={gmaillogo} alt="" className="w-10 h-5 mr-1" />
                          Sign in with Gmail
                        </div>
                      </button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex fixed top-0 right-0 w-auto bg-slate-100 justify-end">
        <img src={cards} alt="cards" className="h-screen" />
      </div>
    </>
  );
};
export default LoginScreen;
