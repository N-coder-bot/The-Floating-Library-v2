import React, { useState, useEffect } from "react";
import styles from "./PeopleToFollow.module.css";
import axios from "axios";
import UserminiView from "../userminiView/UserminiView";
import { origin } from "../../assests/origin";
function PeopleToFollow() {
  const [users, setusers] = useState([]);
  const fetchUsers = async () => {
    //--- Credentials and configs -----------------------------------------------------------------------------------------
    const credentials = {
      withCredentials: true,
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.get(
      `${origin}/users/getAllUsers`,
      credentials
    );
    setusers(response.data.users);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(users);

  return (
    <div className={`${styles.people}`}>
      <h2 className={styles.title}>People to Follow</h2>
      <p className={styles.description}>Discover amazing people and ideas.</p>
      {users.map((user) => {
        return <UserminiView key={user._id} user={user} />;
      })}
    </div>
  );
}

export default PeopleToFollow;
