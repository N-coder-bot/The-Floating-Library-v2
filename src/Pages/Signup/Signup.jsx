import React, { useState, useEffect } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { origin } from "../../assests/origin";
import { FaSpinner } from "react-icons/fa";
function Signup() {
  const Detail = {
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [userDetails, setuserDetails] = useState(Detail); //store user details.
  const [error, seterror] = useState(""); // to store error.
  const [progress, setprogress] = useState(0);
  const [loading, setloading] = useState(false);
  const progressConfig = (e) => {
    let currentProgress = Math.round((e.loaded * 100) / e.total);
    setprogress(currentProgress);
  };
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
    setloading(true);

    if (userDetails.password !== userDetails.confirmPassword) {
      seterror("Password and Confirm Password must be same");
    } else {
      try {
        await axios.post(`${origin}/users/signUp`, userDetails, {
          onUploadProgress: progressConfig,
        });
        alert("Submitted successfully!");
        setloading(false);
        // TODO : try to empty fields without reload.
      } catch (error) {
        setloading(false);
        seterror("ACCOUNT WITH SAME USERNAME EXISTS!");
        // console.log(error, " hi");
      }
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          Loading...{progress}%
          <FaSpinner />
        </div>
      ) : (
        <></>
      )}
      <h1 className={`${loading ? styles.inactive : styles.title}`}>
        Sign Up
        <br />
        Make an account, go ahead its free
      </h1>

      <form
        className={`${loading ? styles.inactive : styles.form}`}
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="username"
          className={`${loading ? styles.inactive : styles.label}`}
        >
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
        <label
          htmlFor="password"
          className={`${loading ? styles.inactive : styles.label}`}
        >
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
        <label
          htmlFor="confirmPassword"
          className={`${loading ? styles.inactive : styles.label}`}
        >
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
        <button
          type="submit"
          className={`${loading ? styles.inactive : styles.button}`}
        >
          Sign Up
        </button>
        <h2 className={`${loading ? styles.inactive : styles.title}`}>
          Existing User? <Link to="/Login">Log In</Link>
        </h2>
      </form>
      {error.length !== 0 && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default Signup;
