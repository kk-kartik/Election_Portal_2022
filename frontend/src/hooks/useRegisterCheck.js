import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useRegisterCheck = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const userData = useSelector((store) => store.auth);

  const checkRegistration = async () => {
    if (
      userData.euser.degree !== undefined &&
      userData.euser.degree !== ""
    ) {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
  };

  useEffect(() => {
    checkRegistration();
  }, []);

  return isRegistered;
};

export default useRegisterCheck;
