import { useState, useEffect } from "react";
import { verifyLogin } from "../api/index";

const useAuthCheck = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLogin = async () => {
    if (document.cookie.includes("electiontoken")) {
      setIsLoggedIn(true);
    } else {
      const res = await verifyLogin();
      setIsLoggedIn(res.data.isLoggedIn);
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return isLoggedIn;
};

export default useAuthCheck;
