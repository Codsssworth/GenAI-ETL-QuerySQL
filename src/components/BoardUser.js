import React, { useState, useEffect } from 'react';
import AuthService from '../services/auth.service'; // Adjust the path based on your project structure
import { Routes, Route, Link } from "react-router-dom";

const BoardUser = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const username = AuthService.getUsername();
    console.log(username)
    if (username) {
      setContent(` Welcome back, ${username}!`);
    } else {
      setContent("No user logged in.");
    }
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        
        <div>
        <Link to={"/QueryMaker"} className="navbar-brand">
          edit profile
        </Link>
        </div>
        <div>
        <Link to={"/QueryMaker"} className="navbar-brand">
          do a barrel roll
        </Link>
        </div>

      </header>

    <div>
       {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" Component={<Home />} />
      </Routes>  */}
    </div>

    </div>
  );
};

export default BoardUser;
