import { GET_POS } from "../constants";

const POS = (positons = [], action) => {
  switch (action.type) {
    case GET_POS:
      return action.payload;
    default:
      return positons;
  }
};

export default POS;
