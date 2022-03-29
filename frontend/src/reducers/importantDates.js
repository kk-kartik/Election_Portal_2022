import { GET_IMPORTANT_DATES } from "../constants";

const importantDates = (dates = [], action) => {
  switch (action.type) {
    case GET_IMPORTANT_DATES:
      return action.payload;
    default:
      return dates;
  }
};

export default importantDates;
