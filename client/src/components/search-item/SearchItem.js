import React, { useState } from "react";
import { Link } from "react-router-dom";
import useMyList from "../../hooks/useMyList";
import useVideo from "../../hooks/useVideo";
import "./search-item.scss";

const SearchItem = ({ movie, getMovie, setShowModal }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [save, addMovieToFav] = useMyList(movie._id);
  const typeMedia = useVideo("image", showOverlay);

  const handleModal = () => {
    setShowModal(true);
    getMovie(movie);
  };

  return (
    <div
      className="hover-search-item"
      onMouseLeave={() => setShowOverlay(false)}
      onMouseEnter={() => setShowOverlay(true)}
    >
      <div className="boxart-item">
        {typeMedia === "image" ? (
          <img src={movie.posterSm} alt="boxart" />
        ) : (
          <video className="video" autoPlay src={movie.trailer} />
        )}
      </div>

      <button className="show-details" onClick={handleModal}>
        <span>
          <i className="fas fa-angle-down"></i>
        </span>
      </button>

      <div className="info-movie">
        <div className="item-overview">
          <img
            className="item-overview-title"
            src={movie.posterTitle}
            alt="title poster"
          />
          <div className="item-overview-metadata">
            <span className="metadata-rating">HD</span>
            <span className="metadata-maturity">{movie.limitAge}+</span>
            <span>
              {movie.imdb} <b className="imdb">IMDb</b>
            </span>
            <span className="metadata-maturity">{movie.year}</span>
          </div>
          <div className="item-overview-synopsis">
            {movie.genre.split(", ").join(" · ")}
          </div>
        </div>
        <div className="item-actions">
          <div className="item-action-buttons">
            <div>
              <span className="play">
                <Link to={{ pathname: "/watch", state: { movie: movie } }}>
                  <i className="fas fa-play"></i>
                </Link>
              </span>
            </div>
            <div
              onClick={addMovieToFav}
              title={save ? "Remove from My List" : "Add to My List"}
            >
              <span>
                {save ? (
                  <i className="fas fa-check"></i>
                ) : (
                  <i className="fas fa-plus"></i>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
