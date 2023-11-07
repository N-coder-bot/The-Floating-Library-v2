/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import styles from "./Home.module.css";
import book from "../../assests/img_book.jpg";
import { useEffect, useState } from "react";
function Home({ logged }) {
  useEffect(() => {
    // Check if it's the first visit.

    const isFirstVisit = localStorage.getItem("isFirstVisit") === null;

    if (isFirstVisit) {
      localStorage.setItem("isFirstVisit", "false");
    } else {
      // disabling animations on consequent visits.
      const elements = document.querySelectorAll("*");

      elements.forEach((element) => {
        element.style.animation = "none"; // this is necessary to remove animation.
        element.style.opacity = 1; // this is so the elements are by default in opacity 1.
      });
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardText}>
          <h1>
            The ideal platform for authors to share exciting announcements about
            their books.
          </h1>
        </div>
        <div>
          <img src={book} alt="book image" />
        </div>
      </div>
    </div>
  );
}

export default Home;
