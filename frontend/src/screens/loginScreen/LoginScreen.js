import React from "react";
import iitglogo from "./iitglogo.png";
const LoginScreen = () => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center">
                <div className="h-15 w-15 flex mr-3 ml-20">
                    <img className="h-12 w-12 flex" src={iitglogo} alt="" />
                </div>
                <div>
                    <p class="text-xl font-medium">Indian Institute of Technology Guwahati</p>
                </div>
            </div>
            <div className="flex flex-col">
               <div className="flex flex-col" >
                    <p className="text-4xl font-normal mb-5">Sign In</p>
                    <p className="text-gray-700">Register yourself by using IITG email Id</p>
               </div>
               <div className="flex flex-col mt-10">
                   <p>Email</p>
                   <input type="text" className="w-1/5 border-2 rounded-md h-9 mt-2 mb-5" />
               </div>
               <div>
                   <button className="py-2 px-4 rounded-md text-white" style={{backgroundColor:'#2B00FF'}}>Sign-In</button>
                   <div className="w-1/4 flex justify-center my-5" >
                        <p>OR</p>
                    </div>
                <div className="w-1/4 flex justify-center my-5">
                    <button className="py-2 px-4 rounded-md text-white" style={{backgroundColor:'#2B00FF'}}>Login With Gmail</button>
                </div>
               </div>
            </div>
        </div>
    );
}
export default LoginScreen;