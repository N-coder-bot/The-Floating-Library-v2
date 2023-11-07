import React, { useState } from "react";
import styles from "./PeopleToFollow.module.css";

function PeopleToFollow() {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className={`${styles.people} ${hovered ? styles.hovered : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className={styles.title}>People to Follow</h2>
      <p className={styles.description}>Discover amazing people and ideas.</p>
    </div>
  );
}

export default PeopleToFollow;
