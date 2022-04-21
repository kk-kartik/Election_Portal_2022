import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { pos2idMap } from "../constants";
import { getCandidateByPos } from "../redux/actions/candidates";
import { Link } from "react-router-dom";
import CandidateCard from "../components/CandidateCard/CandidateCard";
import styles from "../components/buttons/buttons.module.css";
import SideBarSection from "../components/SideNav/Sidebar";
import { posts } from "../constants";

const VotingScreen = () => {
  const dispatch = useDispatch();
  const { position } = useParams();
  const candidates = useSelector((store) => store.candidates);

  useEffect(() => {
    dispatch(getCandidateByPos(pos2idMap[position], position));
    //Web3 part over
  }, [position]);

  console.log("votingScreen candidates: ", candidates);

  return (
    <div className="">
      <SideBarSection posts={posts} />
      <div className="ml-80">
        <div className="p-6">
          <div className="flex flex-end w-3/4">
            <h2 className="text-lg">
              <span className="font-bold ml-12">
                {/* {candidates.all[0]["position"]} */}
              </span>
            </h2>
            <div className={`${styles.bg} mr-0 ml-auto`}>Single Vote</div>
          </div>
          <ul>
            {candidates &&
              candidates[position]?.map((candidate, i) => {
                return <CandidateCard person={candidate} />;
              })}
          </ul>
          <div className="flex ml-16 gap-2 ">
            <button className={styles.none}>None of the above</button>
            <button className={styles.button2}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingScreen;
