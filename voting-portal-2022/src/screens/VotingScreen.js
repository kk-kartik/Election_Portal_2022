import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { pos2idMap } from "../constants";
import { getCandidateByPos } from "../redux/actions/candidates";
import { Link } from "react-router-dom";
import CandidateCard from "../components/CandidateCard/CandidateCard";

import SideBarSection from "../components/SideNav/Sidebar";

const VotingScreen = () => {
  const dispatch = useDispatch();
  const { position } = useParams();
  const candidates = useSelector((store) => store.candidates);

  useEffect(() => {
    dispatch(getCandidateByPos(pos2idMap[position], position));
  }, [position]);

  console.log("votingScreen candidates: ", candidates);

  return (
    <div className="">
        <SideBarSection
          posts={[
            {
              title: "Vice President",
              subposts: [
                {
                  title: "",
                  path: "vicepresident",
                },
              ],
            },
            {
              title: "Board Secretary",
              subposts: [
                {
                  title: "Sports",
                  path: "sports",
                },
                {
                  title: "Welfare",
                  path: "welfare",
                },
                {
                  title: "Technical",
                  path: "technical",
                },
                {
                  title: "HAB",
                  path: "hab",
                },
                {
                  title: "Sail",
                  path: "sail",
                },
                {
                  title: "SWC",
                  path: "swc",
                },
                {
                  title: "Cultural",
                  path: "cultural",
                },
              ],
            },
            {
              title: "Senator",
              subposts: [
                {
                  title: "UG Senator",
                  path: "ug",
                },
                {
                  title: "PG Senator",
                  path: "pg",
                },
                {
                  title: "Girl Senator",
                  path: "girl",
                },
              ],
            },
          ]}
        />
      <div className="ml-80">
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
              return <CandidateCard person={candidate} />;
            })}
        </ul>
      </div>
      </div>
    </div>

  );
};

export default VotingScreen;
