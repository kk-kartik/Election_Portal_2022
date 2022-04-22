import { SET_VOTERID_VALID, CHECK_VOTERID } from "../constants";

const initialState = {
  isVoterIdValid: false,
  voterId: "",
  gender: "",
};

const voterId = (voterId = initialState, action) => {
  switch (action.type) {
    case SET_VOTERID_VALID:
      return {
        ...voterId,
        isVoterIdValid: action.isValid,
        voterId: action.voterId,
      };
    case CHECK_VOTERID:
        return {
          ...voterId,
          isVoterIdValid: action.isValid,
          voterId: action.voterId,
          gender: action.gender
        };  
    default:
      return voterId;
  }
};

export default voterId;
