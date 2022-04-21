import Number from "./Number";
import styles from "./GenerateOTPScreen.module.css"

const GenerateOTPScreen = () => {
    return (
        <>
            <div className="flex flex-col">
                <div>
                Steps to send OTP
                </div>
                <div className="flex my-3">
                    <Number number="1"></Number>
                    <div className={`${styles.bold} flex self-center ml-3.5`}>
                        Verify ID Card
                    </div>
                </div>
                <div className="flex my-3">
                    <Number number="2"></Number>
                    <div className={`${styles.bold} flex self-center ml-3.5`}>
                        Enter voter’s Email ID
                    </div>
                </div>
                <div className="flex my-3">
                    <Number number="3"></Number>
                    <div className={`${styles.bold} flex self-center ml-3.5`}>
                        Ask voter to go to next screen
                    </div>
                </div>
            </div>
        </>
    );
}

export default GenerateOTPScreen;