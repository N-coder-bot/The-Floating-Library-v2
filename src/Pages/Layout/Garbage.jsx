// const [toggle, setToggle] = useState(0);
//   const [page1, setpage1] = useState(1); // this keeps track of posts for "All" posts in the database.
//   const [page2, setpage2] = useState(1); // this keeps track of posts of people who you are "following" in the database.
//   const [loading1, setLoading1] = useState(false);
//   const [loading2, setLoading2] = useState(false);
//   const [prevPosts1, setPrevPosts1] = useState([]);
//   const [prevPosts2, setPrevPosts2] = useState([]);
//   //--- Credentials and configs -----------------------------------------------------------------------------------------
//   const credentials = {
//     withCredentials: true,
//     headers: {
//       Authorization: `${localStorage.getItem("token")}`,
//     },
//   };
//   const handleToggle = (e) => {
//     if (e.target.id == styles.forYou) {
//       if (toggle == 1) setToggle(0);
//     }
//     if (e.target.id == styles.following) {
//       if (toggle == 0) setToggle(1);
//     }
//   };
//   const getAllPosts = async () => {
//     try {
//       setLoading1(true);
//       const response = await axios.get(
//         `${origin}/users/user/getAllPosts?limit=4&skip=${(page1 - 1) * 4}`,
//         credentials
//       );
//       const newPosts = response.data.posts;
//       setPrevPosts1([...prevPosts1, ...newPosts]);
//       setpage1(page1 + 1);
//       setLoading1(false);
//     } catch (error) {
//       console.log("Error Fetching posts ", error);
//     }
//   };
//   const getFollowPosts = async () => {
//     try {
//       setLoading2(true);
//       const response = await axios.get(
//         `${origin}/users/user/followingPosts?limit=4&skip=${(page2 - 1) * 4}`,
//         credentials
//       );
//       const newPosts = response.data.posts;
//       setPrevPosts2([...prevPosts2, ...newPosts]);
//       setpage2(page2 + 1);
//       setLoading2(false);
//     } catch (error) {
//       console.log("Error Fetching posts ", error);
//     }
//   };
//   useEffect(() => {
//     getAllPosts();
//     getFollowPosts();
//   }, []);
//   const { ref: myRefForYou, inView: inViewForYou } = useInView();
//   const { ref: myRefFollowing, inView: inViewFollowing } = useInView();
//   useEffect(() => {
//     console.log(inViewForYou);
//     if (inViewForYou && toggle === 0) {
//       getAllPosts();
//     }
//     if (inViewFollowing && toggle === 1) {
//       getFollowPosts();
//     }
//   }, [inViewForYou, inViewFollowing]);
