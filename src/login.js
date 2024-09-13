import "./login.css"
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Userpage from "./userpage";
import TextToSqlConverter from "./components/TexttoSQL";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

const LoginPage = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [uname, setCurrentUsername] = useState(undefined);
 

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const username = AuthService.getUsername();
    setCurrentUsername(username)

    if (user) {
      setCurrentUser(user);
      const roles = user.roles || [];  // Ensure roles is an array
      setShowModeratorBoard(roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(roles.includes("ROLE_ADMIN"));
    }else {
      setCurrentUser(null);
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(null);
  };

  return (
    
    <div>
      
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          AutoDB
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {/* {currentUser && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )} */}

          {/* {currentUser && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Query Engines
              </Link>
            </li>
          )} */}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                {uname}
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
           
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default LoginPage;