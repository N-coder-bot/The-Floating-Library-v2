import styles from "./AddGenre.module.css";
import { useState } from "react";
import axios from "axios";
import { origin } from "../../assests/origin";

function AddGenre() {
  const details = {
    name: "",
  };
  const handleChange = (e) => {
    let updateDetails = genreDetails;
    updateDetails[`${e.target.name}`] = e.target.value;
    setgenreDetails((genreDetails) => ({
      ...genreDetails,
      ...updateDetails,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    await axios.post(`${origin}/catalog/genre/create`, genreDetails, {
      withCredentials: true,
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
=======
    await axios.post(
      "https://the-floating-library.onrender.com/catalog/genre/create",
      genreDetails,
      {
        withCredentials: true,
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
>>>>>>> 84bbd951cc3e2e55ded856dc1be5a362dd51813b
    alert("Genre Added to Collection Successfully!");
    window.location.reload();
    // console.log(response);
  };
  const [genreDetails, setgenreDetails] = useState(details);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fill this form to ADD a new GENRE</h1>
      <form className={styles.addform} onSubmit={handleSubmit}>
        <label htmlFor="name">
          <span className={styles.labels}>Genre:</span>
          <input
            type="text"
            name="name"
            required={true}
            onChange={handleChange}
            value={genreDetails.name}
            placeholder="Enter New Genre"
            className={styles.textfield}
          />
        </label>
        <button type="submit" className={styles.button}>
          Add Genre
        </button>
      </form>
    </div>
  );
}

export default AddGenre;
