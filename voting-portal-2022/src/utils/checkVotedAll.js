export const checkVotedAll = (votes, voterInfo) => {
  let done = false;
  console.log("I'm votes", votes);

  Object.keys(votes).forEach((pos) => {
    if (pos !== "err" && pos === "welfare") {
      done = votes[pos] !== 0;
    }
  });
  return done;
};
