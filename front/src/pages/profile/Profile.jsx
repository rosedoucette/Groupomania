import React from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function ProfilePictureUpload() {
  const [profileUserImage, setProfileUserImage] = useState(
    "default-profile-image.jpg"
  );

  const handleFileChange = (e) => {
    const fileInput = e.target;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setProfileUserImage(e.target.result);
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  return (
    <div>
      {
        <input
          type="file"
          onChange={(e) => {
            console.log(e.target);
            console.log(e.target.value);
            console.log(e.target.files);
          }}
        />
      }
      <input
        type="file"
        id="profilePictureInput"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Display the chosen image */}
      <img
        className="profileUserImg"
        src={user.coverPicture ? PF + user.coverPicture : PF + "/avatar.png"}
        alt="Profile Image"
        style={{ maxWidth: "300" }}
      />
    </div>
  );
}

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  // console.log(user);
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await axios.get(`/users?username=${username}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user;", error);
        navigate("/login");
      }
    };
    checkAuthentication();
  }, [username, navigate]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await axios.get(`/users?username=${username}`);
  //       setUser(res.data); //set the user state with fetched data
  //     } catch (error) {
  //       //Handle error
  //       // setPosts(res.data);
  //       console.error("Error fetching user:", error);
  //     }
  //   };
  //   fetchUser();
  // }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "/coverPicture.png"
                } //if you wanted logic for the picture then change to...{user.coverPicture ? PF+user.coverPicture : PF+"profiles/(insert blank cover photo)"}..if cover picture then use, if no cover picture then use this blank
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "/avatar.png"
                } //removed {`${PF}profiles/Profile1.png`} from both
                alt=""
              />
              <input
                type="file"
                onChange={(e) => {
                  console.log(e.target);
                  console.log(e.target.value);
                  console.log(e.target.files);
                }} //this is what makes the choose file button lol
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username="username" />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

//consider useNavigate here as well//
