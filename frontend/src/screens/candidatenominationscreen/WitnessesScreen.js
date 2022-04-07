import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "../Register/RegisterForm";
import WitnessDataForm from "../Register/WitnessDataForm";
import styles from "../Register/RegisterScreen.module.css";
import { useNavigate } from "react-router-dom";
import { SET_CANDIDATE_DATA } from "../../constants";
import useNominate from "../../hooks/useNominate";
import SaveAndNext from "./SaveAndNext";

const WitnessesScreen = () => {
  const { candidate, error, message, updateNomination, loading } =
    useNominate();

  const [proposedByData, setProposedyData] = useState(null);
  const [secondedByData, setSecondedByData] = useState(null);
  const [signs, setSigns] = useState({});

  const submitData = async () => {
    const data = {
      ...signs,
      proposed_by: proposedByData || candidate.proposed_by,
      seconded_by: secondedByData || candidate.seconded_by,
    };
    updateNomination(data, "/nominate/verification");
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
          {/* <div className="font-semibold text-s text-gray-800">Signature :</div> */}
          {/* <input
            accept="image/*"
            type="file"
            id="select-image"
            name="proposed_by_sign"
            onChange={onChange}
          /> */}
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
          {/* <div className="font-semibold text-s text-gray-800">Signature :</div>
          <input
            accept="image/*"
            type="file"
            id="select-image"
            name="seconded_by_sign"
            onChange={onChange}
          /> */}
        </div>
      </div>
      <SaveAndNext
        error={error}
        message={message}
        loading={loading}
        submit={submitData}
      />
    </div>
  );
};
export default WitnessesScreen;
