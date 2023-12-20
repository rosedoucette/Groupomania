import React, { useContext, useState } from "react";
import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaBell, FaComment, FaSearch, FaUser } from "react-icons/fa";
import axios from "axios";

export default function Topbar() {

  const { user, dispatch } = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    // Perform logout logic, e.g., clearing user data from local storage and updating context
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Stop the event from bubbling up and triggering the Link for profile and for the dropdown
    setDropdownVisible(!dropdownVisible);
  };

  const handleDeleteAccount = async () => {
    try {
      // Make a delete request using Axios
      const response = await axios.delete(`//localhost:3000/api/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YOUR_AUTH_TOKEN}`, // Replace with your actual authentication token
        },
      });

       // Check the response status or data for success
    if (response.status === 200) {
      // Account deleted successfully
      // Perform additional actions if needed, such as logging out the user

      // After successful deletion, perform logout
      handleLogout();
    } else {
      // Handle other response statuses or display an error message
      console.error("Account deletion failed:", response.data);
    }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

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
      <div className="topbarProfile" onClick={handleClick}>
      {/* <Link to={`/profile/${user?.username}`}> */}
        <img src={
          user?.profilePicture
            ? "//localhost:3000/api/images/" + user.profilePicture
            : "//localhost:3000/api/images/avatar.png"}
          alt="" className="topbarImg" />
      {/* </Link> */}
      {dropdownVisible && (
          <div className="profileDropdown">
            <Link to={`/profile/${user?.username}`} className="dropdownItem">
              Profile
            </Link>
            <span className="dropdownItem" onClick={handleLogout}>
              Logout
            </span>
            <span className="dropdownItem" onClick={handleDeleteAccount}>
              Delete Account
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
