import React from "react"
import styles from "./Loading.module.css"
const Loading = (props) =>{
    return(
        <div className="flex flex-row items-center w-96 shadow-md px-4 rounded-2xl py-8">
            <div className="text-2xl font-atkinson mx-4 text-gray-700">
                {props.text}
            </div>
            <div class={styles.loader}>
            <div class={styles.circle}>
                <div></div>
            </div>
            </div>
        </div>
    )
}
export default Loading;