import styles from "./RegisterSuccess.module.css"
import Icon from "./icon.svg"
const RegisterSuccess = (props) => {
    return (
    <div className={`${styles.cont} p-4 max-w-sm ml-auto mr-auto`}>
        <div className={`grid ${styles.grid} gap-5`}>
            <img src={Icon} className={`${styles.img} max-w-fit`}/>
            <div className={`flex flex-col`}>
                <div className={`${styles.small}`}>
                    Name
                </div>
                <div className={`${styles.text}`}>
                    John Doe
                </div>
            </div>
            <div className={`flex flex-col`}>
                <div className={`${styles.small}`}>
                    Roll No
                </div>
                <div className={`${styles.text}`}>
                    220 123 045
                </div>
            </div>
            <div className={`flex flex-col`}>
            </div>
            <div className={`flex flex-col`}>
                <div className={`${styles.small}`}>
                    Voter Type
                </div>
                <div className={`${styles.text}`}>
                    UG (M)
                </div>
            </div>
            <div className={`flex flex-col`}>
                <div className={`${styles.small}`}>
                    Hostel
                </div>
                <div className={`${styles.text}`}>
                    My Hostel
                </div>
            </div>
            <div className={`flex flex-col`}>
            </div>
            <div className={`flex flex-col`}>
                <div className={`${styles.small}`}>
                    Branch
                </div>
                <div className={`${styles.text}`}>
                    My Branch
                </div>
            </div>
        </div>
    </div>);
}


export default RegisterSuccess;