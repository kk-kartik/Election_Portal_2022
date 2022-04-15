import React, { useEffect } from "react";
import Card from "../../Gallery/Card";
import styles from "./MoreCandidates.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCandidateData } from "../../../../actions/candidates";
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const MoreCandidates = (props) => {
  const candidates = useSelector((state) => state.candidates);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCandidateData());
  }, [dispatch]);
  //   console.log("--candidates--");
  //   console.log(candidates);
  let approved_list = [];
  candidates.forEach((element) => {
    if (element.nomination_status === "approved")
      approved_list = [...approved_list, element];
  });
  shuffle(approved_list);
  //   console.log("--approved candidates--");
  //   console.log(approved_list);
  let randomCard;
  if (approved_list.length > 0)
    randomCard = [
      <Card person={approved_list[0]} id={1} key={1} />,
      <Card person={approved_list[1]} id={2} key={2} />,
      <Card person={approved_list[2]} id={3} key={3} />,
    ];
  return (
    <>
      <span className={`${styles.heading} pt-8 pb-6`}>More Candidates</span>
      <div
        className="relative flex gap-4 overflow-scroll lg:overflow-hidden"
      >
        {randomCard}
      </div>
    </>
  );
};

export default MoreCandidates;
