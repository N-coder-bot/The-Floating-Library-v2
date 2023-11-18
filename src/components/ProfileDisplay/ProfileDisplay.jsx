/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./ProfileDisplay.module.css";
import axios from "axios";
import { origin } from "../../assests/origin";

import { FaSpinner } from "react-icons/fa";

function ProfileDisplay({ user }) {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [progress, setprogress] = useState(0);
  const [pfp, setpfp] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);
  const apiKey = "428979275235316";
  const cloudName = "dqg2lqugz";
  const progressConfig = (e) => {
    let currentProgress = Math.round((e.loaded * 100) / e.total);
    setprogress(currentProgress);
  };
  const credentials = {
    withCredentials: true,
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" && password === "") {
      setError("Atleast one field must not be empty");

      return;
    } else {
      try {
        const data = { username, password };
        await axios.put(`${origin}/users/updateUser/${user._id}`, data, {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        window.location.reload();
      } catch (error) {
        if (error.response.data.msg === "ALREADY EXISTS!") {
          setError("Username Already Exists, try different name");
        }
      }
    }
  };
  const handleImageChange = (e) => {
    setpfp(e.target.files);
  };
  const handleImgSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const formData = new FormData();
    const url = "https://api.cloudinary.com/v1_1/" + cloudName + "/auto/upload";
    // getting signature to access cloudinary.
    const signatureResponse = await axios.get(
      `${origin}/users/user/getSignature`,
      credentials
    );
    if (signatureResponse.status != 200) {
      throw "error getting response";
    }
    // after getting signed in, just store the public Ids in the mongodb database.
    let publicId = null;
    let file = pfp[0];
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", signatureResponse.data.timestamp);
    formData.append("signature", signatureResponse.data.signature);
    formData.append("folder", "images");
    try {
      // post request to cloudinary to store images in the folder on CDN.
      const cloudinaryResponse = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: progressConfig,
      });
      // console.log(cloudinaryResponse.data);
      publicId = cloudinaryResponse.data.public_id;
    } catch (error) {
      console.error(error);
    }
    try {
      // store public id in mongodb database.
      if (publicId != null) {
        const addImg = {
          image: publicId,
        };
        await axios.post(`${origin}/users/user/addProfilePhoto`, addImg, {
          ...credentials,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
      console.log("done");
    }
  };
  return (
    <>
      <h1 className={styles.title}>Hey {`${user.username}`} :) </h1>
      <div className={styles.options}>
        {!toggle1 && (
          <button
            type="button"
            className={styles.btn}
            onClick={() => {
              setToggle1(true);
              setToggle2(false);
            }}
          >
            Edit Credentials
          </button>
        )}
        {toggle1 && (
          <>
            <button
              type="button"
              className={styles.btn}
              onClick={() => {
                setToggle1(false);
              }}
              id={styles.goback}
            >
              {`<-`}
            </button>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.wrapper}>
                <label htmlFor="username" className={styles.credentials}>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="new username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className={styles.wrapper}>
                <label htmlFor="password" className={styles.credentials}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className={styles.btn} type="submit">
                Save Changes
              </button>
            </form>
          </>
        )}
        {!toggle2 && (
          <button
            type="button"
            className={styles.btn}
            onClick={() => {
              setToggle2(true);
              setToggle1(false);
            }}
          >
            Edit Profile picture
          </button>
        )}
        {loading ? (
          <div className={styles.loadingContainer}>
            <FaSpinner className={styles.spinner} />
            Uploading...{progress}%
          </div>
        ) : (
          <>
            {toggle2 && (
              <div className={styles.view}>
                <input
                  type="file"
                  id={styles.images}
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <button onClick={handleImgSubmit} className={styles.btn}>
                  confirm
                </button>
              </div>
            )}
          </>
        )}
        {error.length !== 0 && <div className={styles.error}>{error}</div>}
      </div>
    </>
  );
}

export default ProfileDisplay;
