import { React, useContext } from "react";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "../src/pages/login/Login";
import Register from "../src/pages/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {

  const { user } = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />} />

        {/* if you are logged in, go to homepage. if not, go to register page */}

        <Route path="/login" element={<Login />} />


        <Route path="/register" element={<Register />} />


        <Route path="/profile:username" element={<Profile />} />


        {/* Router/Routes/Route...helps us to Routes between the pages using different Urls */}
      </Routes>
    </Router>
  );
}

export default App;
