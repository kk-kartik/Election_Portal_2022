import React from "react";
import styles from "./Dates.module.css";
import calender from "./calender.svg";
const Dates = () => {
  return (
    <div className="w-">
      <h1 className="font-normal text-2xl pt-8 pb-4 text-gray-800"> Important Dates </h1>
      <div>
        <table>
          <tr>
            <td className="p-4">
              <img src={calender} alt="calender" className={styles.image} />
            </td>
            <td className="p-4 text-gray-800 font-medium text-base">
              End of Nominations
            </td>
            <td className="p-4 text-gray-700 font-normal text-base">
              12h Feb'21
            </td>
          </tr>
          <tr>
            <td className="p-4">
              <img src={calender} alt="calender" className={styles.image} />
            </td>
            <td className="p-4 text-gray-800 font-medium text-base">
              Candidates List
            </td>
            <td className="p-4 text-gray-700 font-normal text-base">
              13h Feb'21
            </td>
          </tr>
          <tr>
            <td className="p-4">
              <img src={calender} alt="calender" className={styles.image} />
            </td>
            <td className="p-4 text-gray-800 font-medium text-base">Debates</td>
            <td className="p-4 text-gray-700 font-normal text-base">
              16h Feb'21
            </td>
          </tr>
          <tr>
            <td className="p-4">
              <img src={calender} alt="calender" className={styles.image} />
            </td>
            <td className="p-4 text-gray-800 font-medium text-base">
              Elections
            </td>
            <td className="p-4 w-60 text-gray-700 font-normal text-base">
              20th Feb'21
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Dates;
