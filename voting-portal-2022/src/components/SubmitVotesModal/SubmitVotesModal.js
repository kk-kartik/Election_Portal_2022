import SubmitVotesField from "../SubmitVotesField/SubmitVotesField";
import styles from "./SubmitVotesModal.module.css"
const SubmitVotesModal = () => {
    return (
        <div className={`${styles.model}`}>
            <div className={`${styles.mainContent} lg:w-6/12 ml-auto mr-auto mt-auto mb-auto pb-6 md:w-9/12 w-11/12`}>
            <div className={`${styles.heading} pl-8 pt-4 pb-4`}>
                Submit your Votes
            </div>
            <div className={`${styles.form} flex flex-col ml-8 mt-5 mr-11`}>
                <SubmitVotesField post="Post" pClass="font-medium" candidate="Candidate" cClass="font-medium" />
                <SubmitVotesField post="Vice President" candidate="Brooklyn Simmons" />
                <SubmitVotesField post="Hostal Affairs Board" candidate="Ralph Edwards" />
                <SubmitVotesField post="Students Web Commitee" candidate="Dianne Russell" />
                <SubmitVotesField post="Sports Board" candidate="NOTA" cClass="text-orange-500"/>
                <SubmitVotesField post="PG Senate" candidate="Marvin McKinney, Eleanor Penaasdasd, asd sad" long={true} />
                <SubmitVotesField post="UG Senate" candidate="Marvin McKinney, Eleanor Penaidjasidji, asomdomoas" long={true}/>
                <SubmitVotesField post="Girls Senate" candidate="Ronald Richards" long={true}/>
            </div>
            <div className="mr-11 ml-8 mt-5 mb-8 flex items-center">
                <input type="checkbox" id="check" name="check" className={`${styles.checkBox} w-5 h-5`}>
                </input>
                <label for="check" className="text-base ml-2">I understand that I will not be able to change my votes after I submit</label>
            </div>
            <div className="flex gap-4 mr-11 ml-8">
                <button className={`${styles.cancelBtn} py-2.5 px-5`}>Cancel</button>
                <button className={`${styles.contBtn} py-2.5 px-5`}>Continue</button>
            </div>
            </div>
        </div>
    );
};
export default SubmitVotesModal;