import { GET_USER } from "../constants";

const FAQ = (userData = null, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    default:
      return userData;
  }
};

export default FAQ;
