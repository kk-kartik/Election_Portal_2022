import styles from "./RegisterSuccess.module.css"
import Icon from "./icon.svg"
import { useSelector } from "react-redux";
import DEPT from "../../../constants/depts"

const RegisterSuccess = (props) => {
    const userData = useSelector((store) => store.auth);
    // console.log("userData", userData);
    let hid = ""
    if(userData == null || userData?.euser?.registration_complete == false){
        hid = "hidden";
    }
    let roll_no = "";
    for(let i=0; i<userData?.euser?.roll_number.length; i++){
        if(i%3 == 0){
            roll_no += " "
        }
        roll_no += userData?.euser?.roll_number[i]
    }
    let voter_type = "PG";
    if(userData?.euser?.degree == "U"){
        voter_type = "UG";
    }
    return (
    <div className={`${styles.cont} p-4 max-w-sm ml-auto mr-auto ${hid}`}>
        <div className={`grid ${styles.grid} gap-5`}>
            <img src={Icon} className={`${styles.img} max-w-fit`}/>
            <div className={`flex flex-col`}>
                <div className={`${styles.small}`}>
                    Name
                </div>
                <div className={`${styles.text}`}>
                    {userData?.euser?.name}
                </div>
            </div>
            <div className={`flex flex-col`}>
                <div className={`${styles.small}`}>
                    Roll No
                </div>
                <div className={`${styles.text}`}>
                    {roll_no}
                </div>
            </div>
            <div className={`flex flex-col`}>
            </div>
            <div className={`flex flex-col`}>
                <div className={`${styles.small}`}>
                    Voter Type
                </div>
                <div className={`${styles.text}`}>
                    {voter_type} (M)
                </div>
            </div>
            <div className={`flex flex-col`}>
                <div className={`${styles.small}`}>
                    Hostel
                </div>
                <div className={`${styles.text}`}>
                    {userData?.euser?.hostel}
                </div>
            </div>
            <div className={`flex flex-col`}>
            </div>
            <div className={`flex flex-col`}>
                <div className={`${styles.small}`}>
                    Branch
                </div>
                <div className={`${styles.text}`}>
                    {DEPT[userData?.euser?.branch]}
                </div>
            </div>
        </div>
    </div>);
}


export default RegisterSuccess;