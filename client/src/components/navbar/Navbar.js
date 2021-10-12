import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../redux/actions/authAction";
import "./navbar.scss";

const Navbar = ({ bgColor, color, borderBottom }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div
      className={`navbar ${isScrolled && "scrolled"}`}
      style={{
        backgroundColor: bgColor,
        color: color,
        borderBottom: borderBottom,
      }}
    >
      <div className="left">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="Netflix logo"
          />
        </Link>
        {auth.token && location.pathname !== "/notfound" && (
          <>
            <Link to="/">
              <span>Homepage</span>
            </Link>
            <Link to="/series">
              <span>Series</span>
            </Link>
            <Link to="/movies">
              <span>Movies</span>
            </Link>
            <span>New and Popular</span>
            <span>My List</span>
          </>
        )}
      </div>
      {auth.token && location.pathname !== "/notfound" && (
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="Navbar avatar"
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      )}
      {!auth.token && location.pathname !== "/login" && (
        <Link to="/login" className="auth">
          <span>Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
