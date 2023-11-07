import styles from "./App.module.css";
import "./assests/fonts/SF-Pro-Display-Thin.ttf";
import "./assests/fonts/SF-Pro-Display-Black.ttf";
import "./assests/fonts/SF-Pro-Display-Medium.ttf";
import "./assests/fonts/SF-Pro-Display-Light.ttf";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Signup from "./Pages/Signup/Signup";
import Addbook from "./Pages/AddBook/Addbook";
import AddAuthor from "./Pages/AddAuthor/AddAuthor";
import Profile from "./Pages/Profile/Profile";
import Unauthorized from "./Pages/Unauthorized/Unauthorized";
import AddGenre from "./Pages/AddGenre/AddGenre";
import Login from "./Pages/Login/Login";

import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import Post from "./components/AddPost/Post";
import ForYou from "./components/ForYou/ForYou";
import Following from "./components/Following/Following";
import Feed from "./Pages/Feed/Feed";
import PeopleToFollow from "./components/PeopleToFollow/PeopleToFollow";
import Layout from "./Pages/Layout/Layout";

function App() {
  const user = useContext(UserContext);
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    if (user) setLogged(true);
    else setLogged(false);
  }, [user]);

  return (
    <Router>
      <div className={styles.header}>
        <h1 id={styles.title}>The Floating Library</h1>
        <div className={styles.options}>
          {!logged ? (
            <>
              <Link to="/Login">Login</Link>
              <Link to="/SignUp">Signup</Link>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location = "/";
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      <div className={styles.container}>
        {logged && <Layout />}
        <Routes>
          <Route exact path="/SignUp" element={<Signup />} />
          {logged ? (
            <>
              <Route exact path="/Addbook" element={<Addbook />} />
              <Route exact path="/Addauthor" element={<AddAuthor />} />
              <Route exact path="/Addgenre" element={<AddGenre />} />
              <Route exact path="/Profile" element={<Profile />} />
              <Route exact path="/Post" element={<Post />} />
              <Route exact path="/Feed" element={<Feed />} />
              <Route path="*" element={<Unauthorized />} />
            </>
          ) : (
            <>
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/" element={<Home />} />
            </>
          )}
        </Routes>
        {logged && <PeopleToFollow />}
      </div>
    </Router>
  );
}

export default App;
