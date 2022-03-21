import { GET_IMPORTANT_DATES } from "../constants";
import * as api from "../api";

export const getImportantDates = () => async (dispatch) => {
  try {
    const data = await api.fetchImportantDates();
    dispatch({ type: GET_IMPORTANT_DATES, payload: data.data 
    });
  } catch (error) {
    console.log(error.message);
  }
};
