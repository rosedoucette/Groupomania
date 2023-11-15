import React, { useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import { AuthContext } from "../../context/AuthContext";
import { redirect, useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });
  if (!user) return null;

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar user={user} profile={false} />
      </div>
    </>
  );
}

//check if user exists before rendering the topbar here//
//useNavigate here
