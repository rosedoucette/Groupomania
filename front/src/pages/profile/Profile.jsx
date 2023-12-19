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
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export function ProfilePictureUpload({ setProfileUserImg }) {
  const handleFileChange = (e) => {
    const fileInput = e.target;

    if (fileInput.files && fileInput.files[0]) {
      // const reader = new FileReader();

      // reader.onload = (e) => {
      setProfileUserImg(fileInput.files[0]);
      // };
    }
  };

  return (
    <div>
      <input
        type="file"
        id="profilePictureInput"
        accept="image/*"
        onChange={handleFileChange}
      />
      {/* add button to submit img in the profile component. here do the axios */}
    </div>
  );
}

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const username = useParams().username;
  const [user, setUser] = useState(
    (currentUser && currentUser.username === username && currentUser) || null
  ); // if user and current user is the same as the one in the url, then just use the current user that's in context
  const [loading, setLoading] = useState(user ? false : true); //if current user is null, then no one is logged in/not the person who did log in
  const [ setProfileUserImg] = useState(null); //removed profileUserImg,
  // console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      // debugger;
      navigate("/login");
    }
  }, [loading, user]);

  useEffect(() => {
    if (!loading) return;
    const fetchUser = async () => {
      const res = await axios
        .get(`//localhost:3000/api/users?username=${username}`)
        .then((data) => {
          console.log(data);
          setUser(data);})
        .catch((error) => {
          console.log(error);
        });
      // // setPosts(res.data);
      // console.log(res);
      setLoading(false);
    };
    fetchUser();
  }, [username, loading]);

  if (!user) return <h3>User not found</h3>;
console.log(user);
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
              <ProfilePictureUpload setProfileUserImg={setProfileUserImg} />
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
