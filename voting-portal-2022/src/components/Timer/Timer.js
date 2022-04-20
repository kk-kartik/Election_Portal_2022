import React from "react"

const Timer = (props) => {
    return(
        <div className="w-80">
            <div className="flex flex-col rounded-xl bg-pink-500 items-center pb-6 pt-2 ">
                <div className="text-sm text-gray-100">
                    Please Wait
                </div>
                <div className="text-6xl font-bold text-white">
                    {props.time}s
                </div>
            </div>
        </div>
    )
}
export default Timer