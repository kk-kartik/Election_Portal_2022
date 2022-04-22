import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { pos2idMap } from "../constants";
import { getCandidateByPos } from "../redux/actions/candidates";
import { Link, useHistory } from "react-router-dom";
import CandidateCard from "../components/CandidateCard/CandidateCard";
import styles from "../components/buttons/buttons.module.css";
import SideBarSection from "../components/SideNav/Sidebar";
import { posts } from "../constants";
import { deleteAllVotes } from "../redux/actions/votes";
import { checkNext } from "../utils/voteValue";
import { getNextPage } from "../constants";

const VotingScreen = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { position } = useParams();
  let candidates = useSelector((store) => store.candidates);
  const vote = useSelector((store) => store.votes[position]);
  const handleNext = () => {
    if (checkNext(vote, position)) {
      history.push(`/${getNextPage[position]}`);
    }
  };
  useEffect(() => {
    dispatch(getCandidateByPos(pos2idMap[position], position));
    //Web3 part over
  }, [position]);

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
              candidates[position] &&
              candidates[position].map((candidate, i) => {
                candidate = { ...candidate, pos: position };
                return (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                );
              })}
          </ul>
          <div className="flex ml-10 gap-2 ">
            <button
              className={styles.none}
              onClick={() => dispatch(deleteAllVotes(position))}
            >
              None of the above
            </button>
            {position !== "girl" && (
              <button
                disabled={!checkNext(vote, position)}
                className={`${styles.button2} ${
                  !checkNext(vote, position) && "cursor-not-allowed opacity-50"
                }`}
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingScreen;
