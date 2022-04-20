import {
  ADD_VOTE,
  DELETE_VOTE,
  DELETE_ALL_VOTES,
  POST_ALL_VOTES,
  GET_VOTE_COUNT,
} from "../constants";
import * as api from "../../api";

export const addVote = (id, pos) => {
  return { type: ADD_VOTE, payload: { id, pos } };
};

export const deleteVote = (id, pos) => {
  //pos = vicepresident, ug, pg etc.
  return { type: DELETE_VOTE, payload: id };
};

export const deleteAllVotes = () => {
  return { type: DELETE_ALL_VOTES, payload: [] };
};
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
    const res = await api.postAllVotes(votes); //votes is an string with candidate id sample - "1,2,10,33"
    const data = await res.json();

    dispatch({ type: POST_ALL_VOTES, payload: data });
  } catch (err) {
    console.log("[postAllVotes action error] :", err.message);
  }
};
