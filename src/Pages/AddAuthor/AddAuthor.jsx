import { useState, useEffect } from "react";
import styles from "./addauthor.module.css";
import axios from "axios";
import { origin } from "../../assests/origin";
function AddAuthor() {
  const details = {
    first_name: "",
    family_name: "",
    date_of_birth: "",
    date_of_death: "",
  };
  const [authorDetails, setAuthorDetails] = useState(details);

  const handleChange = (e) => {
    let item = e.target.name;
    let value = e.target.value;
    let updatedDetails = authorDetails;
    updatedDetails[`${item}`] = value;

    setAuthorDetails((authorDetails) => ({
      ...authorDetails,
      ...updatedDetails,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
<<<<<<< HEAD
    await axios.post(`${origin}/catalog/author/create`, authorDetails, {
      withCredentials: true,
      headers: {
        Authorization: `${token}`,
      },
    });
=======
    await axios.post(
      "https://the-floating-library.onrender.com/catalog/author/create",
      authorDetails,
      {
        withCredentials: true,
        headers: {
          Authorization: `${token}`,
        },
      }
    );
>>>>>>> 84bbd951cc3e2e55ded856dc1be5a362dd51813b
    alert("Author added successfully");
    window.location.reload();
    // console.log(response.data);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Fill this form to ADD Author to your database!
      </h1>
      <form className={styles.form}>
        <label htmlFor="first_name" className={styles.label}>
          <span className={styles.labels}>First Name</span>
          <input
            type="text"
            name="first_name"
            value={authorDetails.first_name}
            onChange={handleChange}
            className={styles.textfield}
            placeholder="First Name"
          />
        </label>
        <label htmlFor="family_name" className={styles.label}>
          <span className={styles.labels}>Last Name</span>
          <input
            type="text"
            name="family_name"
            value={authorDetails.family_name}
            onChange={handleChange}
            className={styles.textfield}
            placeholder="Last Name"
          />
        </label>
        <label htmlFor="date_of_birth" className={styles.label}>
          <span className={styles.labels}>Date Of Birth:</span>
          <input
            type="date"
            name="date_of_birth"
            value={authorDetails.date_of_birth}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="date_of_death" className={styles.label}>
          <span className={styles.labels}>Date Of Death:</span>
          <input
            type="date"
            name="date_of_death"
            value={authorDetails.date_of_death}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleSubmit} className={styles.button}>
          Add Author
        </button>
      </form>
    </div>
  );
}

export default AddAuthor;
