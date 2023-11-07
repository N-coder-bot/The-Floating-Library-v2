import { useState, useEffect } from "react";
import { origin } from "../../assests/origin";
import styles from "./Tab.module.css";
import axios from "axios";
import PostCard from "../../components/PostCard/PostCard";
import { useInView } from "react-intersection-observer";
function Tab({ op1 }) {
  const [posts1, setposts1] = useState([]);
  const [posts2, setposts2] = useState([]);
  const { ref: myRefTab, inView: inViewTab } = useInView();
  const [page1, setpage1] = useState(0);
  const [page2, setpage2] = useState(0);
  //   const [postsSize, setPostsSize] = useState(0);

  const credentials = {
    withCredentials: true,
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  };
  const getAllPosts = async () => {
    const response = await axios.get(
      `${origin}/users/user/getAllPosts?limit=4&skip=${page1 * 4}`,
      credentials
    );
    // console.log(response.data);
    const newPosts1 = [...posts1, ...response.data.posts];
    setposts1(newPosts1);
    console.log(newPosts1);
    setpage1(page1 + 1);
  };
  const getFollowingPosts = async () => {
    const response = await axios.get(
      `${origin}/users/user/followingPosts?limit=4&skip=${page2 * 4}`,
      credentials
    );

    // console.log(response.data);
    const newPosts2 = [...posts2, ...response.data.posts];
    setposts2(newPosts2);
    console.log(newPosts2);
    setpage2(page2 + 1);
  };
  useEffect(() => {
    if (posts2.length === 0 && op1 == 2) {
      getFollowingPosts();
    }
    if (posts1.length === 0 && op1 == 1) {
      getAllPosts();
    }
  }, []);
  useEffect(() => {
    if (inViewTab && op1 == 1) {
      getFollowingPosts();
    }
    if (inViewTab && op1 == 2) {
      getAllPosts();
    }
  }, [inViewTab]);

  return (
    <div className={styles.wrapper}>
      {op1
        ? posts1.map((post) => {
            if (post == undefined) return <></>;
            return (
              <div ref={myRefTab} key={post._id}>
                <PostCard
                  _id={post._id}
                  images={post.image}
                  likes={post.likes}
                  comments={post.comments}
                  user={post.user}
                  timestamp={post.timestamp}
                  content={post.content}
                  loading={false}
                />
              </div>
            );
          })
        : posts2.map((post) => {
            if (post == undefined) return <></>;
            return (
              <div ref={myRefTab} key={post._id}>
                <PostCard
                  _id={post._id}
                  images={post.image}
                  likes={post.likes}
                  comments={post.comments}
                  user={post.user}
                  timestamp={post.timestamp}
                  content={post.content}
                  loading={false}
                />
              </div>
            );
          })}
    </div>
  );
}

export default Tab;
