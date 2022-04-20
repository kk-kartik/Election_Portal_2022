import React, {useState} from "react";
import styles from "./buttons.module.css";
import check from "./check.svg"
import cancel from "./cancel.svg"
const SingleVote = () =>  {
    return(
        <div> 
        <button className={styles.button1}>
              Vote         </button>
    </div>
    ) 
}

const MultipleVote = () =>  {
    const [checked, setChecked] = useState(false);
    const [text, setText] = useState("Vote");
    const handleChange = () => {
        setChecked(!checked);
        if(text=="Vote") setText("Voted");
        else if(text=="Voted") setText("Vote");
      };
    return(
        <div> 
        <button className={styles.button1}>
            <div className="flex">
                <div className="pr-2">
            <input type="checkbox"  checked={checked} onChange={handleChange}/>
                </div>
               <div className="flex flex-col" >
            <p>{text}</p>
               </div>
            </div>
        </button>
        
    </div>
    ) 
}

const SingleVoted = () =>  {
    return(
        <div> 
        <button className={styles.button2}>
              <div className="flex">
                  <div className="pr-2 pt-1">
                  <img src={check}/>
                  </div>
                  <div>
                  Voted
                  </div>
              </div>
        </button>
    </div>
    ) 
}

const CancelVote = () => {
    return(
        <div>
            <button className={styles.button3}>
              <div className="flex">
                  <div className="pt-1">
                  <img src={cancel}/>
                  </div>
                  <div>
                  Cancel Vote
                  </div>
              </div>
        </button>
        </div>
    );
}

const CancelMultiple = () => {
    return(
        <div> 
        <button className={styles.button3}>
            <div className="flex">
                <div className="pr-2">
            <input type="checkbox" />
                </div>
               <div className="flex flex-col" >
            <p>Cancel Vote</p>
               </div>
            </div>
        </button>
        
    </div>
    );
}


export default SingleVoted;
