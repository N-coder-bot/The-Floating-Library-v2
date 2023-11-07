import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { origin } from "../assests/origin";
const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`${origin}/users/user`, {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
=======
        const response = await axios.get(
          "https://the-floating-library.onrender.com/users/user",
          {
            withCredentials: true,
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
>>>>>>> 84bbd951cc3e2e55ded856dc1be5a362dd51813b
        console.log(response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.log("Error fetching user:", error);
        setUser(null);
      }
    };
    fetchUser();
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export { UserContext, UserProvider };
