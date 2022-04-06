import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "../Register/RegisterForm";
import WitnessDataForm from "../Register/WitnessDataForm";
import styles from "../Register/RegisterScreen.module.css";
import { useNavigate } from "react-router-dom";
import { SET_CANDIDATE_DATA } from "../../constants";

const WitnessesScreen = () => {
  const candidate = useSelector((store) => store.candidate);
  const [proposedByData, setProposedyData] = useState(null);
  const [secondedByData, setSecondedByData] = useState(null);
  const [signs, setSigns] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const submitData = async () => {
    if (!candidate) {
      navigate("/", { replace: true });
    }

    try {
      dispatch({
        type: SET_CANDIDATE_DATA,
        data: {
          ...signs,
          proposed_by: proposedByData || candidate.proposed_by,
          seconded_by: secondedByData || candidate.seconded_by,
        },
      });
      navigate("/nominate/verification");
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.detail ||
          "Something went wrong!Please try logging in again."
      );
    }
  };

  const onChange = (e) => {
    setSigns((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-6">
          <div className="font-semibold text-m text-gray-800">
            Proposed by :
          </div>
          <br />
          <WitnessDataForm
            data={
              proposedByData ||
              (candidate?.proposed_by ? candidate.proposed_by : {})
            }
            setData={setProposedyData}
          />
          <br />
          <div className="font-semibold text-s text-gray-800">Signature :</div>
          <input
            accept="image/*"
            type="file"
            id="select-image"
            name="proposed_by_sign"
            onChange={onChange}
          />
        </div>

        <div className="p-6">
          <div className="font-semibold text-m text-gray-800">
            Seconded by :
          </div>
          <br />
          <WitnessDataForm
            data={
              secondedByData ||
              (candidate?.proposed_by ? candidate.seconded_by : {})
            }
            setData={setSecondedByData}
          />
          <br />
          <div className="font-semibold text-s text-gray-800">Signature :</div>
          <input
            accept="image/*"
            type="file"
            id="select-image"
            name="seconded_by_sign"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm">Apply changes before proceeding</p>
        <button className={styles.button} onClick={submitData}>
          Save & Next
        </button>
      </div>
    </div>
  );
};
export default WitnessesScreen;
