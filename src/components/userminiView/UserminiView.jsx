/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./UserminiView.module.css";
import { origin } from "../../assests/origin";
import pfp from "../../assests/pfp.png";
import axios from "axios";
function UserminiView({ user }) {
  //--- Credentials and configs -----------------------------------------------------------------------------------------
  const credentials = {
    withCredentials: true,
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  };
  // --------------------------------------------------------------------------------------
  const [following, setFollowing] = useState(false);
  const handleFollow = async () => {
    const data = { id: user._id };
    const response = await axios.post(`${origin}/users/user/follow`, data, {
      ...credentials,
    });
    // console.log(response.data);
    setFollowing(response.data.follow);
  };
  return (
    <div className={styles.container}>
      <div className={styles.pfp}>
        <img src={pfp} alt="" />
      </div>
      <div>
        <p>{user.username}</p>
        <br />
        <p> followers:{user.followers.length}</p>
        <button onClick={handleFollow}>
          {following ? `following` : `follow`}
        </button>
      </div>
    </div>
  );
}

export default UserminiView;
