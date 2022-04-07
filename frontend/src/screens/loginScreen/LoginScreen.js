import React, { useState }  from "react";
import iitglogo from "./iitglogo.png";
import gmaillogo from "./gmaillogo.png";
import axios from "axios";
import MicrosoftLogin from "react-microsoft-login";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import { ELECTIONAPI } from "../../constants";
const LoginScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginClicked, setLoginClicked] = useState(false);
    const authHandler = async (err, data) => {
        if (err) {
          alert("Something went wrong!Please check your connection");
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
    
            if (!res?.data?.euser?.registration_complete) {
              navigate("/register", { replace: true });
            }
          } catch (err) {
            alert("Something went wrong!Please check your connection");
            return;
          }
        }
      };
    return (
        <div className="flex flex-col" >
            <div className="flex flex-row items-center">
                <div className="h-15 w-15 flex mr-3 ml-20">
                    <img className="h-12 w-12 flex" src={iitglogo} alt="" />
                </div>
                <div>
                    <p class="text-xl font-medium">Indian Institute of Technology Guwahati</p>
                </div>
            </div>
            <div className="flex flex-col items-center mt-40">
               <div className="flex flex-col" >
                    <p className="text-4xl font-normal mb-20">Sign In</p>
               </div>
              
               <div className="flex flex-col items-center">
               <div onClick={(e) => setLoginClicked(true)}>
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
                   <div className="flex my-5 ">
                        <p>OR</p>
                    </div>
                <div >
                    <button className="py-2 px-2 border text-slate-600 font-semibold border-slate-700">
                        <div className="flex flex-row items-center"> 
                        <img src={gmaillogo} alt=""  className="w-12 h-6"/>
                        Login With IITG Gmail ID
                        </div>
                    </button>
                </div>
               </div>
            </div>
        </div>
    );
}
export default LoginScreen;