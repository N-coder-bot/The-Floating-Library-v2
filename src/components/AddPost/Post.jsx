import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Post.module.css";

import { FaSpinner } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { origin } from "../../assests/origin";

import axios from "axios";

const PostForm = () => {
  const apiKey = "428979275235316";
  const cloudName = "dqg2lqugz";
  //--- Credentials and configs -----------------------------------------------------------------------------------------
  const credentials = {
    withCredentials: true,
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  };
  const progressConfig = (e) => {
    let currentProgress = Math.round((e.loaded * 100) / e.total);
    setprogress(currentProgress);
  };
  //--- Quill format Options -----------------------------------------------------------------------------------------
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    },
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
  ];
  //--- Quill format Options -----------------------------------------------------------------------------------------
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setloading] = useState(false);
  const [progress, setprogress] = useState(0);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    // Get the selected images from the input
    const selectedImages = e.target.files;
    const newImages = [];
    for (let i = 0; i < selectedImages.length && i < 3; i++) {
      // length max 3 images.
      newImages.push(selectedImages[i]);
    }
    setImages(newImages);
  };
  const handleSubmit = async (e) => {
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
    const publicIds = [];
    for (let i = 0; i < images.length && i < 3; i++) {
      let file = images[i];
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
        publicIds.push(cloudinaryResponse.data.public_id);
      } catch (error) {
        console.error(error);
      }
    }
    try {
      // store public id in mongodb database and create a post.
      if (publicIds.length >= 1) {
        const addPostData = {
          content,
          image: publicIds,
        };
        await axios.post(`${origin}/users/user/createPost`, addPostData, {
          ...credentials,
        });
        // console.log(postResponse.data);
      } else {
        const addPostData = {
          content,
          image: null,
        };
        await axios.post(`${origin}/users/user/createPost`, addPostData, {
          ...credentials,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
      navigate("/home");
    }
  };
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loadingContainer}>
          <FaSpinner className={styles.spinner} />
          Uploading your post...{progress}%
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className={styles.form}
        >
          <ReactQuill
            value={content}
            onChange={(value) => setContent(value)}
            modules={modules}
            formats={formats}
            placeholder="Enter Atleast One sentence."
          />
          <input
            type="file"
            id={styles.images}
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <button type="submit" className={styles.btn}>
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default PostForm;
