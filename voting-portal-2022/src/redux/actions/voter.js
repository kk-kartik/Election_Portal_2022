import { SET_VOTERID_VALID, CHECK_VOTERID } from "../constants";
import * as api from "../../api";

export const setVoterIdValid = (isValid,voterId)=> {
    return { type: SET_VOTERID_VALID, payload: {isValid,voterId} };
}

export const checkVoterId = (voterid) => async (dispatch) => {
  try {
    const data = await api.checkVoterID(voterid);
    console.log("check voterid: ", data);
    dispatch({ type: CHECK_VOTERID, payload:  data.data});
  } catch (error) {
    console.log("checkVoterId action error: ", error.message);
  }
};

