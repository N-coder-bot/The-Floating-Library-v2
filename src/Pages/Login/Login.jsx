import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { origin } from "../../assests/origin";
function Login() {
  const Detail = {
    username: "",
    password: "",
  };
  const [userDetails, setuserDetails] = useState(Detail);
  const [error, seterror] = useState("");
  const handleChange = (e) => {
    let item = e.target.name;
    let updatedDetails = userDetails;
    updatedDetails[`${item}`] = e.target.value;

    setuserDetails((userDetails) => ({
      ...userDetails,
      ...updatedDetails,
    }));
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      seterror("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userDetails);
    try {
<<<<<<< HEAD
      const response = await axios.post(`${origin}/users/login`, userDetails, {
        withCredentials: true,
      });
=======
      const response = await axios.post(
        "https://the-floating-library.onrender.com/users/login",
        userDetails,
        {
          withCredentials: true,
        }
      );
>>>>>>> 84bbd951cc3e2e55ded856dc1be5a362dd51813b
      alert("Submitted successfully!");
      localStorage.setItem("token", response.data.token);
      window.location = "/Feed";
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (error.response.data.msg === "could not find user") {
          seterror("Could not find user.");
        } else {
          seterror("Invalid password.");
        }
      } else {
        seterror("An error occurred. Please try again later.");
      }
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login to your Account.</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username" className={styles.label}>
          <span>Name</span>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={userDetails.name}
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
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <h2 className={styles.title}>
        Don't have an account? <Link to="/SignUp">Sign Up</Link>
      </h2>
      {error.length !== 0 && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default Login;
