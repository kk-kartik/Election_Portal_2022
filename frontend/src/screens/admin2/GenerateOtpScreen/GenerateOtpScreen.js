import React, { useEffect, useState } from "react";
import Number from "./Number";
import styles from "./GenerateOtpScreen.module.css"
import styles2 from "../../CandidatePositionForm/CandidatePositionForm.module.css"
import styles3 from "../../Register/RegisterScreen.module.css";
import { generateVoterId } from "../../../api";
import Loader from "../../../components/Loading/Loading";
const GenerateOtpScreen = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [voted, setVoted] = useState(false);
    const [sent, setSent] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [email, setEmail] = useState("");
    const handleSubmit = async () => {
        //if(isSuccess && !voted) setSent(true);
        try{
            setSent(true);
            const data = await generateVoterId(email);
            if(data.user !=null){

                if(data.is_voted==true) setVoted(true);
                else setIsSuccess(true);
            }
            setLoaded(true);
            
    
        }catch(e){
            console.log("error",e);
            setIsSuccess(false);      
        }
    }

    const handleClick = () => {window.location.reload();}

    return (
        <>
            <div className="flex flex-col ml-4">
                <div className={`${styles.head} mb-10`}>
                Steps to send OTP
                </div>
                <div className="flex flex-col my-3">
                    <div className="flex">
                        <Number number="1"></Number>
                        <div className={`${styles.bold} flex self-center ml-3.5`}>
                                Enter voter’s Email ID
                        </div>
                    </div>
                    <div className="ml-12 mt-3">
                        <div className={`${styles.small}`}>
                            Email ID
                        </div>
                    <input className={styles2.input} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <br/>
                    <div className="pt-4">
                    {!sent &&
                    <button className={styles3.button} onClick={handleSubmit}>Send OTP</button>
                    }
                    {sent && !loaded && <Loader text="Loading.. Please Wait"/> }
                    {isSuccess && 
                    <button className={styles3.button2}>Sent </button>
                    }
                    {loaded && !isSuccess && 
                    <button className={styles3.error}>Error! </button>
                    }
                    {voted &&
                    <button className={styles3.button3}>Has Voted!</button>
                    }

                    </div>
                    </div>
                    
                </div>
                <div className="flex my-3">
                    <Number number="2"></Number>
                    <div className={`${styles.bold} flex self-center ml-3.5`}>
                        Verify ID Card
                    </div>
                </div>
               
                <div className="flex flex-col my-3">
                   <div className="flex mb-2">
                        <Number number="3"></Number>
                        <div className={`${styles.bold} flex self-center ml-3.5`}>
                            Ask voter to go to next screen
                        </div>
                    </div> 
                    <div className={`${styles.detail} ml-12`}>
                        Ask user to wait for 5-10s and go to next screen
                    </div>
                    <div className={`mt-6 ml-12`}>
                        <button className={styles3.button} onClick={handleClick}>Next</button>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default GenerateOtpScreen;