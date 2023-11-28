import React, { useContext, useState } from "react";
import "./rightbar.css";
import { users } from "../../dummyData";
import Online from "../online/Online";
import { profileInfo } from "../../userDummyData";
import { useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  //took out:
  // (currentUser.followings.includes(user?.id));
  //? is called optional chaining
  //setting the initial state to follow button

  useEffect(() => {
    if (currentUser && currentUser.followings && user) {
      //added this line as a defensive coding approach
      setFollowed(currentUser.followings.includes(user?.id));
    }
  }, [currentUser, user]); //user instead of user.id

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friend/" + user.id); //going to use user from above, take the id from this line, and fetch all friends
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]); //whatever goes inside the array here is called the dependency

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user.id + "/unfollow", {
          userId: currentUser.id,
        });
        dispatch({ type: "UNFOLLOW", payload: user.id });
      } else {
        await axios.put("/users/" + user.id + "/follow", {
          userId: currentUser.id,
        });
        dispatch({ type: "FOLLOW", payload: user.id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/birthday.png" alt="" />
          <span className="birthdayText">
            <b>Conor</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = ({ profileInfo, users, user }) => {
    //objects needed?
    // console.log(user);
    // console.log(currentUser);
    return (
      <>
        {/* {user?.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <FaMinus /> : <FaPlus />}
            Follow <FaPlus />
          </button>
        )} */}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
        </div>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
        </div>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
              {/* if 1 then single, 2 then married, if nothing then nothing */}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "avatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
                {/* {users.map((u) => (
              <CloseFriend key={u.id} user={u} />
            ))} 
            instead of img & span containers above*/}
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profileInfo ? (
          <ProfileRightbar
            user={user}
            users={users}
            profileInfo={profileInfo}
          />
        ) : (
          <HomeRightbar />
        )}
        {/* logic - if on profile, do profilerightbar, if no profile then do homerightbar */}
        {/* video changed profile ? to user ? */}
      </div>
    </div>
  );
}
