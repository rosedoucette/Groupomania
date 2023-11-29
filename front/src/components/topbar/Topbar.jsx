import React, { useContext } from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaBell, FaComment, FaSearch, FaUser } from "react-icons/fa";

export default function Topbar() {

  const { user } = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src="/assets/CompanyLogos/icon-white.png" alt="" className="logo" />
        </Link>
      </div>
      <div className="topbarCenter"></div>
      <div className="searchbar">
        <FaSearch className="searchIcon" />
        <input placeholder="Search for friends, posts, or video" className="searchInput" />
      </div>
      <div className="topbarRight"></div>
      <div className="topbarLinks">
        <span className="topbarLink">Homepage</span>
        <span className="topbarLink">Timeline</span>
      </div>
      <div className="topbarIcons">
        <div className="topbarIconItem">
          <FaUser />
          <span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
          <FaComment />
          <span className="topbarIconBadge">2</span>
        </div>
        <div className="topbarIconItem">
          <FaBell />
          <span className="topbarIconBadge">1</span>
        </div>
      </div>
      <Link to={`/profile/${user?.username}`}>
        <img src={
          user?.profilePicture
            ? "//localhost:3000/api/images/" + user.profilePicture
            : "//localhost:3000/api/images/avatar.png"}
          alt="" className="topbarImg" />
      </Link>
    </div>
  );
}
