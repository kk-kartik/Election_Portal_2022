import { GET_USER } from "../constants";
import * as api from "../api";

export const getUser = () => async (dispatch) => {
  try {
    const data = await api.fetchUserData();
    console.log(data);
    dispatch({ type: GET_USER, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};
