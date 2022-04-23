export const checkVotedAll = (votes) => {
  let done = true;
  Object.keys(votes).forEach((pos) => {
    if (pos !== "err") {
      if (pos === "ug" || pos === "pg") {
        done =
          done &&
          ((votes[pos].length <= 7 && votes[pos].length>0) || votes[pos][0] < 0);
      } else if (pos === "girl") {
        done =
          done &&
          ((votes[pos].length <= 3 && votes[pos].length > 0) ||
            votes[pos][0] < 0);
      } else {
        done = done && votes[pos] !== 0;
      }
    }
  });
  return done;
};
