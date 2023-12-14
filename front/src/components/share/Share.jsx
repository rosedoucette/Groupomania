import React, { useContext, useRef, useState } from "react";
import "./share.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { FaFolderPlus, FaLocationArrow, FaSmile, FaTag } from "react-icons/fa";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user.id,
      desc: desc.current.value, //using this current value bc desc is a useRef item as defined above
    };
    const data = new FormData();
    data.append("userId", user.id);
    data.append("desc", desc.current.value);
    if (file) {
      const fileName = Date.now() + file.name; //gives each img an individual name using date and numbers. ex. 122434img.png or 543221img.png
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName; //for newPost img you will indicate the file name/identifier using fileName
    }
    try {
      await axios.post("//localhost:3000/api/post/back/upload", data); //referencing the "/back/upload" from post request from back/index.js
    } catch (err) {
      // console.log(err);
    }
  };
  if (!user) {
    return null;
  }
  return (
    // console.log(user.profilePicture),
    (
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "avatar.png"
              }
              alt=""
            />
            <input
              placeholder={"What's on your mind " + user.username + "?"}
              className="shareInput"
              ref={desc}
            />
          </div>
          <hr className="shareHr" />
          {file && (
            <div className="shareImgContainer">
              <img
                className="shareImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <button className="shareCancelImg" onClick={() => setFile(null)}>
                Cancel
              </button>
            </div>
          )}
          <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <FaFolderPlus
                  style={{ color: "tomato" }}
                  className="ShareIcon"
                />
                <span className="shareOptionText">Photo or Video</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <div className="shareOption">
                <FaTag style={{ color: "blue" }} className="ShareIcon" />
                <span className="shareOptionText">Tag</span>
              </div>
              <div className="shareOption">
                <FaLocationArrow
                  style={{ color: "green" }}
                  className="ShareIcon"
                />
                <span className="shareOptionText">Location</span>
              </div>
              <div className="shareOption">
                <FaSmile style={{ color: "goldenrod" }} className="ShareIcon" />
                <span className="shareOptionText">Feelings</span>
              </div>
            </div>
            <button className="shareButton" type="submit">
              Share
            </button>
          </form>
        </div>
      </div>
    )
  );
}
