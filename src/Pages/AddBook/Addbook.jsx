import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./addbook.module.css";
import { Link } from "react-router-dom";
import { origin } from "../../assests/origin";
function Addbook() {
  const [authors, setauthors] = useState([]);
  const [genres, setgenres] = useState([]);
  var details = {
    title: "",
    author: `${authors[0]}`,
    summary: "",
    isbn: "",
    genre: genres[0],
  };

  const [bookdetails, setbookdetails] = useState(details);
  const getAuthors = async () => {
<<<<<<< HEAD
    const response = await axios.get(`${origin}/catalog/authors`);
=======
    const response = await axios.get(
      "https://the-floating-library.onrender.com/catalog/authors"
    );
>>>>>>> 84bbd951cc3e2e55ded856dc1be5a362dd51813b
    setauthors(response.data);
    let data = response.data;
    details.author = data[0];
    setbookdetails((bookdetails) => ({
      ...bookdetails,
      ...details,
    }));
  };
  const getGenres = async () => {
<<<<<<< HEAD
    const response = await axios.get(`${origin}/catalog/genres`);
=======
    const response = await axios.get(
      "https://the-floating-library.onrender.com/catalog/genres"
    );
>>>>>>> 84bbd951cc3e2e55ded856dc1be5a362dd51813b
    setgenres(response.data);
    let data = response.data;
    details.genre = data[0];
    setbookdetails((bookdetails) => ({
      ...bookdetails,
      ...details,
    }));
  };

  useEffect(() => {
    getAuthors();
    getGenres();
  }, []);

  const handleChange = (e) => {
    let updateDetails = bookdetails;
    let name = e.target.name;
    let item = e.target.value;
    if (name === "author" || name === "genre") {
      item = JSON.parse(item);
    }
    updateDetails[`${e.target.name}`] = item;

    setbookdetails((bookdetails) => ({
      ...bookdetails,
      ...updateDetails,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    await axios.post(`${origin}/catalog/book/create`, bookdetails, {
      withCredentials: true,
      headers: { Authorization: `${localStorage.getItem("token")}` },
    });
=======
    await axios.post(
      "https://the-floating-library.onrender.com/catalog/book/create",
      bookdetails,
      {
        withCredentials: true,
        headers: { Authorization: `${localStorage.getItem("token")}` },
      }
    );
>>>>>>> 84bbd951cc3e2e55ded856dc1be5a362dd51813b
    alert("book added successfully!");
    window.location.reload();
    // console.log(bookdetails);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Fill this form, to ADD the book to your database
      </h1>
      <form className={styles.addform}>
        <label htmlFor="author">
          <span className={styles.labels}>Author:</span>
          {authors.length !== 0 ? (
            <select
              name="author"
              id="author"
              onChange={handleChange}
              className={styles.select}
              value={JSON.stringify(bookdetails.author)}
            >
              {authors.map((author, index) => (
                <option value={JSON.stringify(author)} key={index}>
                  {author.first_name + " " + author.family_name}
                </option>
              ))}
            </select>
          ) : (
            <></>
          )}

          <Link to="/Addauthor" className={styles.links}>
            Add author
          </Link>
        </label>
        <label htmlFor="title">
          <span className={styles.labels}>Title of Book:</span>
          <input
            type="text"
            name="title"
            className={styles.textfield}
            value={bookdetails.title}
            onChange={handleChange}
            placeholder="Enter Title"
          />
        </label>
        <label htmlFor="summary">
          <span className={styles.labels}>Summary</span>
          <input
            type="text"
            name="summary"
            id="pages"
            className={styles.textfield}
            onChange={handleChange}
            value={bookdetails.summary}
            placeholder="Enter Summary"
          />
        </label>

        <label htmlFor="genre">
          <span className={styles.labels}>Genre:</span>
          {genres.length !== 0 ? (
            <select
              name="genre"
              id="genre"
              onChange={handleChange}
              value={JSON.stringify(bookdetails.genre)}
              className={styles.select}
            >
              {/* <option value="genre">genre</option> */}
              {genres.map((genre, index) => (
                <option value={JSON.stringify(genre)} key={index}>
                  {genre.name}
                </option>
              ))}
            </select>
          ) : (
            <></>
          )}
          <Link to="/Addgenre" className={styles.links}>
            Add genre
          </Link>
        </label>
        <button onClick={handleSubmit} className={styles.button}>
          Add book
        </button>
      </form>
    </div>
  );
}

export default Addbook;
