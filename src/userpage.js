import React, { useState, useEffect } from "react";
import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";
import UserService from "./services/user.service";




const Userpage = () => {
    const [content, setContent] = useState("");
  
    useEffect(() => {
      UserService.getPublicContent().then(
        (response) => {
          setContent(response.data);
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
  
          setContent(_content);
        }
      );
    }, []);
  
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState();
  
    useEffect(() => {
        console.log("userpageedddde")
      const user = AuthService.getCurrentUser();
      console.log(user)
  
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
      <div className="container">
        <header className="jumbotron">
          <h3>looged uset</h3>
          
        </header>

        <div className="navbar-nav mr-auto">
          

          {currentUser && (
            <li className="nav-item">
              wooompa
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              doompa
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              goompa
            </li>
          )}
        </div>

        </div>

    
);
};

export default Userpage;
