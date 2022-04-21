import {
  ADD_VOTE,
  DELETE_VOTE,
  DELETE_ALL_VOTES,
  POST_ALL_VOTES,
  GET_VOTE_COUNT,
} from "../constants";
import { removeByValue } from "../../utils/removeByValue";

const initialState = {
  vicepresident: 0,
  sports: 0,
  welfare: 0,
  technical: 0,
  hab: 0,
  sail: 0,
  swc: 0,
  cultural: 0,
  ug: [],
  pg: [],
  girl: [],
};

const votes = (votes = initialState, action) => {
  const updatedVotes = { ...votes };
  const pos = action.payload?.pos;
  const id = action.payload?.id;
  const data = action.payload?.data;

  switch (action.type) {
    case ADD_VOTE:
      updatedVotes[pos] = id;
      return updatedVotes;

    case DELETE_VOTE:
      if (pos === "ug" || pos === "pg" || pos === "girl") {
        const arr = [...updatedVotes[pos]];
        updatedVotes[pos] = removeByValue(arr, id);
      } else {
        updatedVotes[pos] = 0;
      }
      return updatedVotes;

    case DELETE_ALL_VOTES:
      return initialState;

    case POST_ALL_VOTES:
      return data;

    case GET_VOTE_COUNT:
      return data;
    default:
      return votes;
  }
};

export default votes;
