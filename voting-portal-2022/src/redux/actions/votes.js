import {
  ADD_VOTE,
  ADD_VOTES,
  DELETE_VOTE,
  DELETE_ALL_VOTES,
  POST_ALL_VOTES,
  GET_VOTE_COUNT,
} from "../constants";
import * as api from "../../api";

export const getVoteCount = () => async (dispatch) => {
  try {
    const res = await api.getVoteCount();
    const data = await res.json();
    //console.log("BY position: ", data);
    dispatch({ type: GET_VOTE_COUNT, payload: data });
  } catch (error) {
    console.log("[getVoteCount action error] :", error.message);
  }
};

export const postAllVotes = (votes) => async (dispatch) => {
  try {
    const res = await api.postAllVotes(votes); //votes is an array with candidate id []
    const data = await res.json();

    dispatch({ type: POST_ALL_VOTES, payload: data });
  } catch (err) {
    console.log("[postAllVotes action error] :", err.message);
  }
};
