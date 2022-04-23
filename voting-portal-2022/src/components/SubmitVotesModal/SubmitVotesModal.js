import SubmitVotesField from "../SubmitVotesField/SubmitVotesField";
import styles from "./SubmitVotesModal.module.css";
import { candidateIdToName } from "../../constants/index";
import { useDispatch, useSelector } from "react-redux";
import { postAllVotes, postVotes } from "../../redux/actions/votes";
import { votesToString } from "../../utils/voteValue";
import StatusScreen from "../../screens/StatusScreen";
import Loading from "../Loader/Loading.js";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const arrayToString = (ids) => {
  let names = "";
  ids.forEach((e) => {
    names += candidateIdToName[e];
    names += " , ";
  });

  names = names.slice(0, -3);

  return names;
};

const SubmitVotesModal = ({ votes, setModalOpen }) => {
  const dispatch = useDispatch();
  const [hasSendVote, setHasSendVote] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const history = useHistory();
  const voterInfo = useSelector(store=>store.voterInfo);


  console.log("voterid sxnls: ", voterInfo);

  const submitHandler = () => {
    console.log("voterid before submit: ", voterInfo);
    const strVotes = votesToString(votes);
    setHasSendVote(true);
    dispatch(postVotes(strVotes, voterInfo.voterId)).then((serverData) => {
      console.log("[ye status data hai ]", serverData.payload.data.status);

      // if (serverData || serverData.payload.status !== 200) {
      //   history.push({
      //     pathname: "/fail",
      //     state: {
      //       data: serverData?.payload?.data?.status,
      //     },
      //   });
      // }
      if (serverData && serverData.payload.status === 200) {
        dispatch(postAllVotes(strVotes, voterInfo.voterId)).then((data) => {
          console.log("[ye abhi ka data]", data);

          history.push({
            pathname: "/response",
            state: {
              transaction_id: data.payload.transactionHash,
              voter_id: voterInfo.voterId,
              block_id: data.payload.blockHash,
              gas: data.payload.gasUsed,
              isShow: data.payload.isShow,
            },
          });
        });
      } else {
        history.push({
          pathname: "/fail",
          state: {
            data: serverData?.payload?.data?.status,
          },
        });
      }

      console.log("[I'm from here]");
      // history.push({
      //   pathname: "/fail",
      //   state: {
      //     data: serverData,
      //   },
      // });
    });
  };
  return (
    <>
      {hasSendVote ? (
        <StatusScreen>
          <Loading text="Your votes are being added to the blockchain network" />
        </StatusScreen>
      ) : (
        <div className={`${styles.model}`}>
          <div
            className={`${styles.mainContent} lg:w-6/12 ml-auto mr-auto mt-auto mb-auto pb-6 md:w-9/12 w-11/12`}
          >
            <div className={`${styles.heading} pl-8 pt-4 pb-4`}>
              Submit your Votes
            </div>
            <div className={`${styles.form} flex flex-col ml-8 mt-5 mr-11`}>
              <SubmitVotesField
                post="Post"
                pClass="font-medium"
                candidate="Candidate"
                cClass="font-medium"
              />
              <SubmitVotesField
                post="Vice President"
                candidate={candidateIdToName[votes["vicepresident"]]}
              />
              <SubmitVotesField
                post="Hostal Affairs Board"
                candidate={candidateIdToName[votes["hab"]]}
              />
              <SubmitVotesField
                post="Students Web Commitee"
                candidate={candidateIdToName[votes["swc"]]}
              />
              <SubmitVotesField
                post="Sports Board"
                candidate={candidateIdToName[votes["sports"]]}
                cClass="text-orange-500"
              />
              <SubmitVotesField
                post="SAIL"
                candidate={candidateIdToName[votes["sail"]]}
                cClass="text-orange-500"
              />
              <SubmitVotesField
                post="Technical Board"
                candidate={candidateIdToName[votes["technical"]]}
                cClass="text-orange-500"
              />
              <SubmitVotesField
                post="PG Senate"
                candidate={arrayToString(votes["pg"])}
                long={true}
              />
              <SubmitVotesField
                post="UG Senate"
                candidate={arrayToString(votes["ug"])}
                long={true}
              />
              <SubmitVotesField
                post="Girls Senate"
                candidate={arrayToString(votes["girl"])}
                long={true}
              />
            </div>
            <div className="mr-11 ml-8 mt-5 mb-8 flex items-center">
              <input
                type="checkbox"
                id="check"
                name="check"
                className={`${styles.checkBox} w-5 h-5`}
                value={confirm}
                onChange={(e) => setConfirm((prev) => !prev)}
              ></input>
              <label for="check" className="text-base ml-2">
                I understand that I will not be able to change my votes after I
                submit
              </label>
            </div>
            <div className="flex gap-4 mr-11 ml-8">
              <button
                className={`${styles.cancelBtn} py-2.5 px-5`}
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`${styles.contBtn} py-2.5 px-5 ${
                  !confirm && "opacity-50 cursor-not-allowed"
                }`}
                onClick={submitHandler}
                disabled={!confirm}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SubmitVotesModal;
