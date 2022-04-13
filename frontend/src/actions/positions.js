import { GET_POS, GET_CANDIDATE_FROM_POS } from "../constants";
import * as api from "../api";

export const getPos = () => async (dispatch) => {
  try {
    const data = await api.fetchPos();
    dispatch({ type: GET_POS, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};
export const getCandidateFromPosition = (id) => async (dispatch) => {
  try {
      // console.log(id);
      const { data } = await api.getCandidateByPosition(id);
      dispatch({ type: GET_CANDIDATE_FROM_POS, payload: {id: id , data: data} });
  } catch (error) {
      console.log(error.message);
  }
};

