import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { pos2idMap } from "../constants";
import { getCandidateByPos } from "../redux/actions/candidates";
import { Link } from "react-router-dom";

const VotingScreen = () => {
  const dispatch = useDispatch();
  const { position } = useParams();
  const candidates = useSelector((store) => store.candidates);

  useEffect(() => {
    dispatch(getCandidateByPos(pos2idMap[position], position));
  }, [position]);

  console.log("votingScreen candidates: ",candidates);

  return (
    <div className="p-1">
      <p>VotingScreen for {position}</p>
      <p className="mb-4">This is the main screen for voting</p>
      <Link to="/swc" className="p-2 mt-3 bg-blue-700 text-white">Link to vote for SWC (just for test)</Link>
      <div className="p-6">
        <h2 className="text-lg underline">
          Candidate list for <span className="font-bold">{position}</span> position:
        </h2>
        <ul>
          {candidates &&
            candidates[position]?.map((candidate, i) => {
              return <li key={candidate.id}>{candidate.name}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};

export default VotingScreen;
