import React, { useState, useEffect } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { origin } from "../../assests/origin";
function Signup() {
  const Detail = {
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [userDetails, setuserDetails] = useState(Detail); //store user details.
  const [error, seterror] = useState(""); // to store error.

  // so error disappears in 5 seconds.
  useEffect(() => {
    const timer = setTimeout(() => {
      seterror("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  // form data handling.
  const handleChange = (e) => {
    let item = e.target.name;
    console.log(item);
    let updatedDetails = userDetails;
    updatedDetails[`${item}`] = e.target.value;

    setuserDetails((userDetails) => ({
      ...userDetails,
      ...updatedDetails,
    }));
  };

  //form data submitting and signing up a new user.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userDetails.password !== userDetails.confirmPassword) {
      seterror("Password and Confirm Password must be same");
    } else {
      try {
<<<<<<< HEAD
        await axios.post(`${origin}/users/signUp`, userDetails);
=======
        await axios.post(
          "https://the-floating-library.onrender.com/users/signUp",
          userDetails
        );
>>>>>>> 84bbd951cc3e2e55ded856dc1be5a362dd51813b
        alert("Submitted successfully!");
        // TODO : try to empty fields without reload.
        window.location.reload();
      } catch (error) {
        seterror("ACCOUNT WITH SAME USERNAME EXISTS!");
        // console.log(error, " hi");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Sign Up
        <br />
        Make an account, go ahead its free
      </h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username" className={styles.label}>
          <span>Name</span>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={userDetails.username}
            placeholder="Username"
            required
          />
        </label>
        <label htmlFor="password" className={styles.label}>
          <span>Password</span>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={userDetails.password}
            placeholder="Password"
            required
          />
        </label>
        <label htmlFor="confirmPassword" className={styles.label}>
          <span>Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={userDetails.confirmPassword}
            placeholder="Confirm Password"
            required
          />
        </label>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
        <h2 className={styles.title}>
          Existing User? <Link to="/Login">Log In</Link>
        </h2>
      </form>
      {error.length !== 0 && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default Signup;
