import { useState } from "react";
import Following from "../../components/Following/Following";
import ForYou from "../../components/ForYou/ForYou";
import styles from "./Feed.module.css";

function Feed() {
  const [index, setIndex] = useState(1);

  const handleTabClick = (tabIndex) => {
    setIndex(tabIndex);
  };

  return (
    <div className={styles.feed}>
      <div className={styles.header}>
        <div
          className={`${styles.option} ${index === 1 ? styles.active : ""}`}
          onClick={() => handleTabClick(1)}
        >
          For You
        </div>
        <div
          className={`${styles.option} ${index === 2 ? styles.active : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Following
        </div>
      </div>
      <div>
        <div className={`${index === 1 ? "" : styles.hide}`}>
          <ForYou />
        </div>
        <div className={`${index === 2 ? "" : styles.hide}`}>
          <Following />
        </div>
      </div>
    </div>
  );
}

export default Feed;
