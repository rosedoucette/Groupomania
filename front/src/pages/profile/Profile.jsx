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

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user] = useState({}); //removed setUser [user, setUser]
  const username = useParams().username;
  // console.log(user);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      // setPosts(res.data);
      console.log(res);
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
              {/* <script>
    Function to handle file selection and update profileUserImg
    document.getElementById('profilePictureInput').addEventListener('change', function (e) {
        var fileInput = e.target;
        var profileUserImg = document.getElementById('profileUserImg');

        // Check if a file is selected
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();

            // Set up the reader to load the selected image
            reader.onload = function (e) {
                // Update the src attribute of profileUserImg
                profileUserImg.src = e.target.result;
            };

            // Read the selected file as a data URL
            reader.readAsDataURL(fileInput.files[0]);
        }
    });
</script> */}
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
