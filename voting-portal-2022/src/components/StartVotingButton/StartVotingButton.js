import React from "react"
import arrow from "./arrowRight.png"
const StartVotingButton = ()=> {
    return(
        <div className="w-80 bg-gradient-to-r from-blueBg to-violetBg rounded-lg">
            <div className="flex flex-row items-center justify-between p-4">
                <div className="text-2xl font-bold ">
                    <p className="text-white">Starting Voting</p>
                </div>
                <div className="w-12 h-12">
                    <img src={arrow} alt="" />
                </div>
            </div>
        </div>
    )
}

export default StartVotingButton;