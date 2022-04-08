import React, { useState } from "react";
import iitglogo from "../../assets/iitg-logo.png";
import gmaillogo from "./gmaillogo.png";
import outlooklogo from "./microsoft.png";
import axios from "axios";
import MicrosoftLogin from "react-microsoft-login";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import { ELECTIONAPI, IS_PROD, OUTLOOK_LOGIN_URL } from "../../constants";
import cards from "../../assets/images_1.png";
import Footer from "../../components/Footer/Footer";

const LoginScreen = () => {
  var screenWidth = window.innerHeight;
  screenWidth = 0.8 * screenWidth;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const [loginClicked, setLoginClicked] = useState(false);
  const responseGoogle = async (data) => {
    const accessToken = data["accessToken"];
    if (accessToken) {
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
        if (!res?.data?.user?.registration_complete) {
          navigate("/register", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } catch (err) {
        alert("Something went wrong!Please check your connection");
        return;
      }
    }
  };

  const authHandler = async (err, data) => {
    if (!IS_PROD) {
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
        if (!res?.data?.user?.registration_complete) {
          navigate("/register", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } catch (err) {
        alert("Something went wrong!Please check your connection");
        return;
      }
    }
  };
  return (
    <>
      <div
        className="block md:hidden min-w-screen"
        style={{ minHeight: `${screenWidth}px` }}
      >
        <div className="flex flex-row space-x-4 items-center justify-center mt-4">
          <div className="h-12 w-12 md:h-20 md:w-20">
            <img className="h-12 w-12 md:h-20 md:w-20" src={iitglogo} alt="" />
          </div>
          <div>
            <p class="text-lg sm:text-xl" style={{ color: "#4b5563" }}>
              Indian Institute of Technology Guwahati
            </p>
          </div>
        </div>
        <div className="mt-16 ml-4">
          <p className="text-4xl font-medium mb-2" style={{ color: "#2e2f2f" }}>
            Sign In
          </p>
          <p className="text-lg font-normal" style={{ color: "#4b5563" }}>
            Register yourself by using IITG email
          </p>
        </div>
        {IS_PROD ? (
          <div className="flex justify-center">
            <div className="">
              <a href={OUTLOOK_LOGIN_URL}>
                <div className="px-4 py-2 border-black border-2 flex items-center">
                  <img src={outlooklogo} alt="" className="w-5 h-5 mr-3" />
                  Sign in with Outlook
                </div>
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-8 flex justify-center">
            <MicrosoftLogin
              clientId={"24fc6265-3b9b-4b94-813b-9b810b90c1e9"}
              redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
              tenantUrl={
                "https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c"
              }
              authCallback={authHandler}
            />
          </div>
        )}
        <div>
          <div className="flex justify-center">
            <GoogleLogin
              clientId="774598959771-jilp7jr6a3677htqaf1na9adqoj3aolo.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <div className="flex border-2 bg-blue-500 border-blue-500  items-center bg-white mt-4">
                    <div className="bg-white p-2">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt=""
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="font-bold bg-blue-500 text-white p-2">
                      Sign in with Google
                    </div>
                  </div>
                </button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
            />
          </div>
        </div>
      </div>
      <div
        className="min-h-screen min-w-screen hidden md:block"
        style={{ backgroundColor: "#f8fafe" }}
      >
        <div className="flex justify-between">
          <div className="flex justify-center">
            <div>
              <div className="flex flex-row space-x-4 items-center md:ml-32 mt-8 md:mt-16">
                <div className="h-12 w-12 md:h-20 md:w-20">
                  <img
                    className="h-12 w-12 md:h-20 md:w-20"
                    src={iitglogo}
                    alt=""
                  />
                </div>
                <div>
                  <p class="text-lg sm:text-xl" style={{ color: "#4b5563" }}>
                    Indian Institute of Technology Guwahati
                  </p>
                </div>
              </div>
              <div className="mt-8 md:mt-16 md:ml-32">
                <p
                  className="text-4xl font-medium mb-2"
                  style={{ color: "#2e2f2f" }}
                >
                  Sign In
                </p>
                <p className="text-lg font-normal" style={{ color: "#4b5563" }}>
                  Register yourself by using IITG email
                </p>
              </div>
              {IS_PROD ? (
                <div className="">
                  <div className="">
                    <a href={OUTLOOK_LOGIN_URL}>
                      <div className="px-4 py-2 border-black border-2 flex items-center">
                        <img
                          src={outlooklogo}
                          alt=""
                          className="w-5 h-5 mr-3"
                        />
                        Sign in with Outlook
                      </div>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="md:ml-32 mt-8 ">
                  <MicrosoftLogin
                    clientId={"24fc6265-3b9b-4b94-813b-9b810b90c1e9"}
                    redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
                    //authCallback={() => authHandler(dispatch)}
                    tenantUrl={
                      "https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c"
                    }
                    authCallback={authHandler}
                  />
                </div>
              )}
              <div>
                <div className="">
                  <GoogleLogin
                    clientId="774598959771-jilp7jr6a3677htqaf1na9adqoj3aolo.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <div className="flex border-2 bg-blue-500 border-blue-500  items-center bg-white ml-32 mt-4">
                          <div className="bg-white p-2">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                              alt=""
                              className="w-8 h-8"
                            />
                          </div>
                          <div className="font-bold bg-blue-500 text-white p-2">
                            Sign in with Google
                          </div>
                        </div>
                      </button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <img src={cards} alt="cards" className="h-screen" />
          </div>
        </div>
        {/* <div className="flex flex-col">
        <div className="flex flex-row items-center py-2 sm:py-4">
          <div className="h-12 w-12 md:h-20 md:w-20 flex mx-3 sm:ml-20">
            <img
              className="h-12 w-12 md:h-20 md:w-20 flex"
              src={iitglogo}
              alt=""
            />
          </div>
          <div>
            <p class="text-lg sm:text-xl" style={{color:"#4b5563"}}>
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
              {IS_PROD ? (
                <div className="mb-4">
                  <div className="py-2 px-4 border text-slate-600 font-bold border-slate-700">
                    <a href={OUTLOOK_LOGIN_URL}>
                      <div className="flex flex-row items-start justify-start font-semibold">
                        <img
                          src={outlooklogo}
                          alt=""
                          className="w-5 h-5 mr-3 "
                        />
                        Sign in with Outlook
                      </div>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <MicrosoftLogin
                    clientId={"24fc6265-3b9b-4b94-813b-9b810b90c1e9"}
                    redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
                    //authCallback={() => authHandler(dispatch)}
                    tenantUrl={
                      "https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c"
                    }
                    authCallback={authHandler}
                  />
                </div>
              )}
              <div>
                <div className="py-2 pl-1 pr-1 border text-slate-600 bg-white font-bold border-slate-700">
                  <GoogleLogin
                    clientId="774598959771-jilp7jr6a3677htqaf1na9adqoj3aolo.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <div className="flex flex-row items-start justify-start font-semibold">
                          <img src={gmaillogo} alt="" className="w-10 h-5" />
                          Sign in with IITG Gmail
                        </div>
                      </button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex fixed top-0 right-0 w-auto justify-end">
        <img src={cards} alt="cards" className="h-screen" />
      </div> */}
      </div>
      <Footer />
    </>
  );
};
export default LoginScreen;
