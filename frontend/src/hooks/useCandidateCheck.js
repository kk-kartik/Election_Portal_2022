import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useCandidateCheck = () => {
  const [isCandidate, setIsCandidate] = useState(true);
  const candidateData = useSelector((store) => store.candidate);

  console.log("chalaaaa", candidateData);

  const checkCandidate = async () => {
    if(candidateData.id!==undefined){
        setIsCandidate(true);
    }else{
        setIsCandidate(false);
    }
  };

  useEffect(() => {
    checkCandidate();
  }, [candidateData]);

  return isCandidate;
};

export default useCandidateCheck;
