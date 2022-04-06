import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCandidateCheck from "../hooks/useCandidateCheck";

const NominationRoute = ({ children }) => {
  const isCandidate = useCandidateCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCandidate) {
      navigate("/", { replace: true });
    }
  }, [isCandidate]);

  return children;
};

export default NominationRoute;
