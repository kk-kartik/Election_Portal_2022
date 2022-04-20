import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { pos2idMap } from "../constants";
import { getCandidateByPos } from "../redux/actions/candidates";
import { Link } from "react-router-dom";
import web3 from "../ethereum/webThree";
import election from "../ethereum/election";
import CandidateCard from "../components/CandidateCard/CandidateCard";
import SideBarSection from "../components/SideNav/Sidebar";
const Tx = require("ethereumjs-tx").Transaction;

const publicKey = "0xD0e203A04Eb4024Fbd90768b46E37aC67F1Cd707";
const privateKey =
  "9f94794beb1b094dfa4dd85f1190703500e5179fe4b53767dcfc785eaa4620b0";
const contractAddress = "0x4e6a5bfb44c6d243a44ed5f6704be50c38ac289f";



const VotingScreen = () => {
  const dispatch = useDispatch();
  const { position } = useParams();
  const candidates = useSelector((store) => store.candidates);

  useEffect(() => {
    dispatch(getCandidateByPos(pos2idMap[position], position));

    // Web3 transaction start
    const countVotes = async () => {
      const counts = await election.methods.voterCount().call();
      console.log(counts);
    };
    //counting total vote casted
    countVotes();

    //voting start. Votes contain encrypted vote and voterid
    const methodFunction = async () => {
      const votes = "123";
      const voterId = "12";

      const functionAbi = election.methods.store(voterId, votes).encodeABI();

      web3.eth.getTransactionCount(publicKey, function (err, nonce) {
        var details = {
          from: web3.utils.toChecksumAddress(publicKey),
          nonce: web3.utils.toHex(nonce),
          gasPrice: web3.utils.toHex(web3.utils.toWei("100", "gwei")),
          gasLimit: 500000,
          to: contractAddress,
          value: 0,
          data: functionAbi,
        };

        var tx = new Tx(details, { chain: "rinkeby" });
        tx.sign(Buffer.from(privateKey, "hex"));
        var serializedTx = tx.serialize();

        web3.eth
          .sendSignedTransaction("0x" + serializedTx.toString("hex"))
          .on("receipt", console.log)
          .on("error", console.log);
      });
    };

    methodFunction();
    //Web3 part over
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
      <Link to="/swc" className="p-2 mt-3 bg-blue-700 text-white">
        Link to vote for SWC (just for test)
      </Link>
      <div className="p-6">
        <h2 className="text-lg underline">
          Candidate list for <span className="font-bold">{position}</span>{" "}
          position:
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
