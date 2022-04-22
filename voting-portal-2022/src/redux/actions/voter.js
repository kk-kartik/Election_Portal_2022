import { SET_VOTERID_VALID, CHECK_VOTERID } from "../constants";
import * as api from "../../api";

export const setVoterIdValid = (isValid, voterId) => {
  return { type: SET_VOTERID_VALID, payload: { isValid, voterId } };
};

export const checkVoterId = (voterid) => async (dispatch) => {
  try {
    const data = await api.checkVoterID(voterid);
    console.log("check voterid: ", data);
    const { degree, status, gender } = data.data;
    console.log({ degree, status, gender });
    dispatch({
      type: CHECK_VOTERID,
      payload: { gender, isVoterIdValid: status, degree, voterId: "dkafjlkd" },
    });
    return { degree, status, gender };
  } catch (error) {
    console.log("checkVoterId action error: ", error.message);
    return new Error(
      "Something went wrong, please check your Voter Id and try again!"
    );
  }
};
