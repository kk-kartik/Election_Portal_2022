import React from "react"
import Loading from "../components/Loader/Loading";
import Timer from "../components/Timer/Timer"
import StartVotingButton from "../components/StartVotingButton/StartVotingButton";
import SuccessMessage from "../components/SuccessMessage/SuccessMessage"
import iitglogo from "../assets/iitglogo.png"
const StatusScreen = () =>{
    return(
        <div className="w-full mt-20">
        <div className="flex flex-row justify-around items-center">
            <div className=" flex flex-col">
                <div className="w-24 h-24">
                    <img src={iitglogo} alt="" />
                </div>
                <div className="text-6xl font-bold w-64 leading-relaxed text-gray-700 font-atkinson">
                    Gymkhana Elections 2022
                </div>
            </div>
            <div>
                <Loading text="Please wait till we process your vote"/>
            </div>
        </div>
        </div>
    )
}

export default StatusScreen;