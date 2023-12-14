import { React, useContext, useEffect, useState } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
// import { Posts } from "../../dummyData";

// export default function Feed() {
//   return (
//     <div className="feed">
//       <div className="feedWrapper">
//         <Share />
//         {Posts.map((p) => (
//           <Post key={p.id} post={p} />
//         ))}
//       </div>
//     </div>
//   );
// }

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!user) {
          throw new Error("User not available");
        }
        const res = username
          ? await axios.get("//localhost:3000/api/post/profile/" + user?.username)
          : await axios.get("//localhost:3000/api/post/timeline/" + user?.id);
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt); //sorts the posts by date/time, newest first then older ones after
          })
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts(); //what am i missing here
  }, [username, user]); //user instead of user.id
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user?.username) && <Share />}
        {/* if user = username, view the Share. so you can only see the share box on your own profile  */}
        {posts.map((p) => (
          <Post key={p.id} post={p} /> //key bc using map. p.id bc all posts have an id.
        ))}
      </div>
    </div>
  );
}
