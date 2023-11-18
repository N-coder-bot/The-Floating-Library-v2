/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Layout.module.css";
import { Link } from "react-router-dom";

function Layout() {
  const [index, setIndex] = useState(1);

  return (
    <div className={styles.navigation}>
      <ul className={styles.options}>
        <Link onClick={() => setIndex(1)} to="/Feed">
          <div
            className={`${styles.option} ${index === 1 ? styles.active : ""}`}
          >
            Feed
          </div>
        </Link>
        <Link to="/Profile" onClick={() => setIndex(2)}>
          <div
            className={`${styles.option} ${index === 2 ? styles.active : ""}`}
          >
            Profile
          </div>
        </Link>
        <Link to="/Post" onClick={() => setIndex(3)}>
          <div
            className={`${styles.option} ${index === 3 ? styles.active : ""}`}
          >
            Post
          </div>
        </Link>
        <Link to="/AddBook" onClick={() => setIndex(4)}>
          <div
            className={`${styles.option} ${index === 4 ? styles.active : ""}`}
          >
            Add Book
          </div>
        </Link>
        <Link to="/AddAuthor" onClick={() => setIndex(5)}>
          <div
            className={`${styles.option} ${index === 5 ? styles.active : ""}`}
          >
            Add Author
          </div>
        </Link>
        <Link to="/AddGenre" onClick={() => setIndex(6)}>
          <div
            className={`${styles.option} ${index === 6 ? styles.active : ""}`}
          >
            Add Genre
          </div>
        </Link>
      </ul>
    </div>
  );
}

export default Layout;
