import Tile from "./Tile";
import postSVG from "./post.svg";
import agendaSVG from "./agenda.svg";
import videoSVG from "./video.svg";
import formSVG from "./form.svg";
import plusSVG from "./plus.svg"
import verifySVG from "./verify.svg"
import styles from "./VerificationBox.module.css"
const VerificationBox = () => {
    return (
    <div className={`w-9/12 ${styles.main} pt-6 pl-6 pr-6 pb-6`}>
        <div className="flex flex-wrap">
            <Tile svg={postSVG} text={"Register for the Post"} done={true}/>
            <Tile svg={videoSVG} text={"Upload your introduction video"} done={false}/>
            <Tile svg={agendaSVG} text={"Upload your agendas"} done={true}/>
            <Tile svg={formSVG} text={"Generate Nomination form"} done={false}/>
            <Tile svg={plusSVG} text={"Add Credentials"} done={false}/>
            <Tile svg={verifySVG} text={"Get your Profile verified"} done={false}/>
        </div>
        <div className={`flex mt-4`}>
            <button className={`${styles.btn1} py-2 px-4 mr-4`}>
                <div className={`${styles.text}`}>
                    Preview Nomination Form
                </div>
            </button>
            <button className={`${styles.btn2} py-2 px-4`}>
                <div className={`${styles.text2}`}>
                    Send For Verification
                </div>
            </button>
        </div>
        <div className={`flex mt-4`}>
            <div className={`${styles.lastdate}`}>
                Last Date for Verification is: 08/04/22
            </div>
            <div className={`mr-0 ml-auto ${styles.help}`}>
                <a href="mailto:swc@iitg.ac.in">Need Help?</a>
            </div>
        </div>
    </div>
    );
}

export default VerificationBox;