import { React, useContext, useEffect, useState } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
// import { Posts } from "../../dummyData";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get("posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt); //sorts the posts by date/time, newest first then older ones after
      })
      );
    };
    fetchPost();
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {/* if user = username, view the Share. so you can only see the share box on your own profile  */}
        {posts.map((p) => (
          <Post key={p._id} post={p} /> //key bc using map. p.id bc all posts have an id.
        ))}
      </div>
    </div>
  );
}
