import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from '../services/auth.service'; 

const BoardAdmin = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const username = AuthService.getUsername();
    console.log(username)
    if (username) {
      setContent(` lets do some quering , ${username}!`);
    } else {
      setContent("No user logged in.");
    }
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <span>
        <div>
        <Link to={"/QueryMaker"} className="navbar-brand">
          Query maker 1
        </Link>
        </div>
        <div>
        <Link to={"/QueryMaker"} className="navbar-brand">
        Query maker 2
        </Link>
        </div>
        <div>
        <Link to={"/QueryMaker"} className="navbar-brand">
        Query maker 2
        </Link>
        </div>
        <div>
        <Link to={"/QueryMaker"} className="navbar-brand">
        Query maker 4
        </Link>
        </div>
      </span>
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

export default BoardAdmin;
