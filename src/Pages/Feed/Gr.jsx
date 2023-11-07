import { useState } from "react";
import Following from "../../components/Following/Following";
import ForYou from "../../components/ForYou/ForYou";
import styles from "./Feed.module.css";
import { Route, NavLink, Routes, Link, Outlet } from "react-router-dom";
function Feed() {
  const [index, setindex] = useState(1);
  return (
    // <BrowserRouter>
    <div className={styles.feed}>
      <div className={styles.header}>
        <Link to="foryou" onClick={() => setindex(1)}>
          <div
            className={`${styles.option} ${index == 1 ? styles.active : ""}`}
          >
            For You
          </div>
        </Link>
        <Link to="following" onClick={() => setindex(2)}>
          <div
            className={`${styles.option} ${index == 2 ? styles.active : ""}`}
          >
            Following
          </div>
        </Link>
      </div>
      <br />
      <div className={styles.feedOptions}>
        <Routes>
          <Route path="foryou" element={<ForYou />} />
          {/* <Route path="following" element={<Following />} /> */}
        </Routes>
      </div>
    </div>
    // </BrowserRouter>
  );
}

export default Feed;
