import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import SearchBox from "../search-box/SearchBox";
import "./navbar.scss";

const Navbar = ({ bgColor, color, borderBottom }) => {
  const { auth, search } = useSelector((state) => state);
  const dispatch = useDispatch();
  const path = [
    {
      nameSite: "/",
      navName: "Home",
      active: false,
    },
    {
      nameSite: "/series",
      navName: "Series",
      active: false,
    },
    {
      nameSite: "/movies",
      navName: "Movies",
      active: false,
    },
    {
      nameSite: "/again",
      navName: "Watch Again",
      active: false,
    },
    {
      nameSite: "/mylist",
      navName: "My List",
      active: false,
    },
  ];
  const [pathName, setPathName] = useState(path);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const pageCurrent = pathName.filter((e) => {
      if (e.nameSite === location.pathname) {
        e.active = true;
      } else {
        e.active = false;
      }
      return e;
    });
    setPathName(pageCurrent);
    dispatch({ type: GLOBALTYPES.GENRE, payload: "" });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    if (search.searchInput) {
      dispatch({
        type: GLOBALTYPES.GETSEARCH,
        payload: { data: [], query: "" },
      });
    }
    window.scrollTo(0, 0);
    setSearchQuery("");
    const fakeLoading = setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          loading: false,
        },
      });
    }, 800);
    return () => clearTimeout(fakeLoading);
  }, [location.pathname, dispatch, search.searchQuery]);

  return (
    <div
      className={`navbar`}
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
        {auth.token &&
          pathName.map((e, i) => (
            <Link to={`${e.nameSite}`} key={i}>
              <span className={`${e.active && "active-nav"}`}>{e.navName}</span>
            </Link>
          ))}
      </div>
      {auth.token && (
        <div className="right">
          {["/", "/series", "/movies"].includes(location.pathname) && (
            <div className="search">
              <Search className="icon-search" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Titles, actors"
                className="search-box"
              />
              <SearchBox searchQuery={searchQuery} />
            </div>
          )}
          <span>KID</span>
          <Notifications className="icon" />
          <img src={auth.user.profilePic} alt="Navbar avatar" />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      )}
      {!auth.token && (
        <Link to="/login" className="auth">
          <span>Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
