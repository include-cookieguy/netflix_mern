import React from "react";
import { Link } from "react-router-dom";
import "./episode-item.scss";

const EpisodeItem = ({ movie, episode, index }) => {
  const { title, desc, thumbnail, duration } = episode;
  return (
    <Link to={{ pathname: "/watch", state: { movie: movie } }}>
      <div className="episode-item-container">
        <div className="episode-item-title_index">{index + 1}</div>
        <div className="episode-item-thumbnail">
          <div className="ptrack-content">
            <img src={thumbnail} alt="thumbnail" />
          </div>
          <div className="play-icon">
            <svg viewBox="0 0 24 24" className="titleCard-playSVG">
              <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
        <div className="episode-item-info">
          <div className="info-title">
            <span className="title_text">{title}</span>
            <span className="title_duration">{duration}m</span>
          </div>
          <p className="info-desc">{desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default EpisodeItem;
