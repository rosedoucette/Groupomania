import React from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user] = useState({}); //removed setUser [user, setUser]
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      // setPosts(res.data);
      console.log(res)
    };
    fetchUser();
  }, [username]);

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
                src={user.coverPicture ? PF + user.coverPicture : PF + "/coverPicture.png"} //if you wanted logic for the picture then change to...{user.coverPicture ? PF+user.coverPicture : PF+"profiles/(insert blank cover photo)"}..if cover picture then use, if no cover picture then use this blank
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.coverPicture ? PF + user.coverPicture : PF + "/avatar.png"} //removed {`${PF}profiles/Profile1.png`} from both
                alt=""
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
