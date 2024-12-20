import { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { handleError } from "../utils/handleError";

export default function Home() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user/my-details");
      setIsLoggedin(true);
      setUserData(response.data.user);
    } catch (error) {
      if (error.response.status === 401) {
        setIsLoggedin(false);
      }
      handleError(error);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div>{isLoggedin ? <>{userData.username}</> : "You are not logged in"}</div>
  );
}
