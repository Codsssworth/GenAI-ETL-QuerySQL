import './App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./services/auth.service";
import LoginPage from './login';
import Login from './components/Login';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      <LoginPage/>
        
        <p>
          <code>The world is yours.</code> 
        </p>
        <a
          className="App-link"
          href="https://codsssworth.github.io/portfolio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          wave@me
        </a>
      </header>

      
{/* 
      <div className="container mt-3">
        <Routes>
        
          <Route exact path="/login" element={<Login />} />
          
        </Routes>
      </div> */}


    </div>
  );
}

export default App;
