/* eslint-disable react/prop-types */
import styles from "./PostCard.module.css";
import pfp from "../../assests/pfp.png";
import bkimg from "../../assests/bookimg.jpg";
import { origin } from "../../assests/origin";
import {
  BiCategory,
  BiSolidLeftArrowCircle,
  BiSolidRightArrowCircle,
} from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";

import { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
function PostCard({
  _id,
  images,
  likes,
  comments,
  user,
  timestamp,
  content,
  loading,
}) {
  const [like, setlike] = useState(false);
  const [ptr, setptr] = useState(0);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [viewComments, setViewComments] = useState(false);
  const [addComment, setAddComment] = useState("");
  const [showComments, setShowComments] = useState(
    comments.map((comment) => comment.text)
  );
  const currentUser = useContext(UserContext);
  // console.log(currentUser);
  const credentials = {
    withCredentials: true,
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  };
  const getMinutesPassed = (timestamp) => {
    const currentTime = new Date();
    const postTime = new Date(timestamp);
    const timeDifference = Math.floor((currentTime - postTime) / (1000 * 60));
    return timeDifference;
  };
  // checking for likes.
  useEffect(() => {
    likes.forEach((userId) => {
      if (userId === currentUser._id) {
        setlike(true);
        return;
      } else setlike(false);
    });
  }, [likes, currentUser]);

  const handlePtr = (e) => {
    let n = images.length - 1;
    console.log(ptr);
    if (e.target.id === styles.left) {
      if (ptr == 0) {
        setptr(n);
      } else {
        setptr(ptr - 1);
      }
    } else {
      if (ptr == n) {
        setptr(0);
      } else setptr(ptr + 1);
    }
  };
  const likePost = async () => {
    await axios.get(`${origin}/users/user/like/${_id}`, {
      ...credentials,
    });
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${origin}/users/user/comment/${_id}`,
        {
          comment: addComment,
        },
        {
          ...credentials,
        }
      );
      setShowComments([...showComments, addComment]);
      setAddComment("");
    } catch (error) {
      console.log(error);
    }
  };
  const minutesPassed = getMinutesPassed(timestamp);
  const createMarkup = (htmlString) => ({ __html: htmlString });
  return (
    <>
      {loading && (
        <div className={styles.loadingContainer}>
          <FaSpinner className={styles.spinner} />
          loading...
        </div>
      )}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={`${styles.head} ${styles.items}`}>
            <div className={styles.pfp}>
              <div className={styles.userpfp}>
                <img src={pfp} alt="" />
              </div>
              <div className={styles.userfeature}>
                <p>{user.username}</p>
                <p>{minutesPassed} minutes ago...</p>
              </div>
            </div>
            <div className={styles.userOptions}>
              <BiCategory />
            </div>
          </div>
          <div className={`${styles.content} ${styles.items}`}>
            <BiSolidLeftArrowCircle
              className={styles.arrow}
              id={styles.left}
              onClick={handlePtr}
            />
            <div className={styles.contentImg}>
              <img
                src={`https://res.cloudinary.com/dqg2lqugz/image/upload/${images[ptr]}`}
              />
            </div>
            <BiSolidRightArrowCircle
              className={styles.arrow}
              id={styles.right}
              onClick={handlePtr}
            />
            <div
              className={styles.contentTxt}
              dangerouslySetInnerHTML={createMarkup(content)}
            />
          </div>
          <div className={`${styles.foot} ${styles.items}`}>
            <div className={styles.footOptions}>
              <div className={styles.likeWrapper}>
                {like == false ? (
                  <AiOutlineHeart
                    className={styles.like}
                    onClick={() => {
                      likePost();
                      setLikeCount(likeCount + 1);
                      setlike(true);
                    }}
                  />
                ) : (
                  <AiFillHeart
                    className={styles.like}
                    onClick={() => {
                      setlike(false);
                      likePost();
                      setLikeCount(likeCount - 1);
                    }}
                  />
                )}{" "}
                <p>{likeCount}</p>
              </div>
              <div className={styles.comment}>
                <FaRegCommentDots
                  onClick={() => setViewComments(!viewComments)}
                />
                <p>{showComments.length}</p>
              </div>
            </div>
            {viewComments ? (
              <div className={styles.commentSection}>
                {showComments.length != 0 &&
                  showComments.map((comment, index) => {
                    return <li key={index}>{comment}</li>;
                  })}
              </div>
            ) : (
              <></>
            )}
            <form onSubmit={handleCommentSubmit}>
              <label htmlFor="comment"></label>
              <input
                type="text"
                placeholder="Add Comment"
                name="comment"
                value={addComment}
                onChange={(e) => setAddComment(e.target.value)}
              />
              <button type="submit">btn</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;
