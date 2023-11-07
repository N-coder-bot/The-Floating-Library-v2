import { useState, useEffect } from "react";
import { origin } from "../../assests/origin";
import styles from "./ForYou.module.css";
import axios from "axios";
import PostCard from "../../components/PostCard/PostCard";
import { useInView } from "react-intersection-observer";
function ForYou() {
  const [posts, setposts] = useState([]);
  const { ref: myRefForYou, inView: inViewForYou } = useInView();
  const [page, setpage] = useState(0);
  //   const [postsSize, setPostsSize] = useState(0);

  const credentials = {
    withCredentials: true,
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  };
  const getAllPosts = async () => {
    const response = await axios.get(
      `${origin}/users/user/getAllPosts?limit=4&skip=${page * 4}`,
      credentials
    );
    // console.log(response.data);
    const newPosts = [...posts, ...response.data.posts];
    setposts(newPosts);
    console.log(newPosts);
    setpage(page + 1);
  };
  useEffect(() => {
    if (posts.length === 0) {
      getAllPosts();
    }
  }, []);
  useEffect(() => {
    if (inViewForYou) {
      getAllPosts();
    }
  }, [inViewForYou]);

  return (
    <div className={styles.wrapper}>
      {posts.map((post) => {
        if (post == undefined) return <></>;
        return (
          <div ref={myRefForYou} key={post._id}>
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

export default ForYou;
