import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRegisterCheck from "../hooks/useRegisterCheck";

const RegistrationRoute = ({ children }) => {
  const isRegistered = useRegisterCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
      navigate("/", { replace: true });
    }
  }, [isRegistered]);

  return children;
};

export default RegistrationRoute;
