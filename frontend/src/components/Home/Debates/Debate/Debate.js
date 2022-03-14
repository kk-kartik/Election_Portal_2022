import React from "react";
import styles from "./Debate.module.css";
import calender from "./calender.svg";
import clock from "./clock.svg";
const Debate = () => {
  return (
    <div className={`${styles.card} ml-auto mr-auto`}>
      <div className="p-6">
        <h3 className="font-semibold text-lg pb-4 text-gray-800">
          {" "}
          Vice President Debate
        </h3>
        <p className="font-medium text-gray-500 text-base pb-4 ">
          Albert Flores, Jenny Wilson, Brooklyn Simmons.
        </p>
        <table>
          <tr>
            <td>
              <img src={calender} alt="calender" className={styles.image} />
            </td>
            <td>
              <h5> &nbsp; 17th Feb'21</h5>
            </td>
          </tr>
        </table>

        <table>
          <tr>
            <td>
              <img src={clock} alt="clock" className={styles.image} />
            </td>
            <td>
              <h5> &nbsp; 4:00 PM</h5>
            </td>
          </tr>
        </table>
        <div className="p-4">
          <button className={styles.btn}> <div>
              
               <table className="ml-auto mr-auto"> <tr> 
              <td> <img src={calender} alt="calender" className={styles.image} /> 
                  </td>
                <td> &nbsp; Add to Calender 
                    </td></tr> </table>
              </div>
                    </button>
          <p className="text-center text-gray-400 pt-2 ">100 attending</p>
        </div>
       
      </div>
    </div>
  );
};

export default Debate;
