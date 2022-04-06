import { GET_POS } from "../constants";
import * as api from "../api";

export const getPos = () => async (dispatch) => {
  try {
    const data = await api.fetchPos();
    dispatch({ type: GET_POS, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};
