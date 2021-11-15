import { ArrowBackOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React from "react";
import "./watch.scss";
import { useLocation } from "react-router";
import ReactNetflixPlayer from "react-netflix-player";

const Watch = () => {
  const location = useLocation();

  return (
    <div className="watch">
      <div className="back">
        <Link to="/">
          <div>
            <i className="fas fa-arrow-left"></i>
            Home
          </div>
        </Link>
      </div>
      <div className="video">
        <ReactNetflixPlayer
          src={location.state.movie.video}
          primaryColor={"#E50914"}
          autoPlay={true}
          playerLanguage={"en"}
        />
      </div>
    </div>
  );
};

export default Watch;
