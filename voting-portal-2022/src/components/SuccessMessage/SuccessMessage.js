import React from "react";
import tick from "./tick.png"
const SuccessMessage = (props) => {
    return(
        <div className="w-80">
            <div className="flex flex-col">
                <div className="bg-greenBg flex flex-row justify-between items-center p-3 rounded-2xl">
                    <div className="text-white font-bold text-xl font-atkinson">
                        Success
                    </div>
                    <div className="w-8 h-8">
                        <img src={tick} alt="" />
                    </div>
                </div>
                <div className="flex flex-col mt-5 shadow-xl rounded-2xl px-4">
                    <div className="mt-2">Transaction_ID: {props.transaction_id}</div>
                    <div className="mt-2">Voter_ID : {props.voter_id}</div>
                    <div className="mt-2">Block_ID : {props.block_id}</div>
                    <div className="mt-2 mb-2">Gas : ${props.gas}</div>
                </div>
                <div className="text-sm text-center text-gray-500 text-roboto font-regular mt-2">
                    You may now leave the system
                </div>
            </div>
        </div>
    )
}
export default SuccessMessage;