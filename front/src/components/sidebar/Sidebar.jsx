import React from "react";
import "./sidebar.css";
import { FaBookmark, FaCalendarDay, FaGraduationCap, FaQuestionCircle, FaRss } from "react-icons/fa";

import { users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <FaRss className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <FaBookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <FaQuestionCircle className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <FaCalendarDay className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <FaGraduationCap className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <li>
            {users.map((u) => (
              <CloseFriend key={u.id} user={u} />
            ))}
            {/* For each user, it's gonna return our new component 'CloseFriend' */}
          </li>
        </ul>
      </div>
    </div>
  );
}
