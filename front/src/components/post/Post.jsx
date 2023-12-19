import React, { useState, useEffect, useContext } from "react";
import "./post.css";
// import { users } from "../../dummyData";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";

export default function Post({ post }) {
  console.log(post);

  const [like, setLike] = useState(post.likes);
  // inside useState, the post.likes references the inital state, so the number from the dummy data//
  const [isLiked, setIsLiked] = useState(false);
  // inside useState, the false references the inital state, as the post hasn't been liked yet//
  const [user] = useState({}); //removed setUser
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes && post.likes.includes(currentUser.id)); //_id to id
  }, 
  // This modification checks if post.likes is truthy (not null or undefined) before attempting to use includes. 
  // If post.likes is not defined, it won't attempt to execute includes, avoiding the TypeError.
  [currentUser.id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`//localhost:3000/api/users?userId=${post.userId}`);
      // setPosts(res.data)
      console.log(res);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("//localhost:3000/api/post/" + post.id + "/like", { userId: currentUser.id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    // the logic states that if a post hasn't been liked, it will add a like when clicked. If it has been liked already, it will subtract a like when clicked//
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user?.username}`}>
              {/* Link should allow click on profile img to link to profile page */}
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "avatar.png"
                } //use profile pic?... :if no profile pic, use avatar photo
                alt=""
              />
              {/* Such a long about way of finding the profile pic as well */}
            </Link>
            <span className="postUserName">{user.username}</span>
            {/* why such a long about way of finding user Id? */}
            <span className="postDate">{buildFormatter(post.createdAt)}</span>
            {/* createdAt needs to be added to table */}
          </div>
          <div className="postTopRight"></div>
          <FaEllipsisV />
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {/* ? because not all posts may have a desc */}
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            {/* img src changed to accomodate PF (public folder) accommodations */}
            <span className="postLikeCounter">{post.likes ? post.likes.length: 0}</span>
          {/* This code checks if post.likes is truthy (not null or undefined). 
          If it is truthy, it accesses post.likes.length; otherwise, it defaults to 0. 
          This way, you won't encounter the error when post.likes is not defined. */}
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">Comments: {post.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
