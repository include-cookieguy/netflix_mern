import { ArrowBackOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React from "react";
import "./watch.scss";
import { useLocation } from "react-router";

const Watch = () => {
  const location = useLocation();

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className="video"
        autoPlay
        controls
        src={location.state.movie.video}
      />
    </div>
  );
};

export default Watch;
