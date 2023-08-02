import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./favourite-item.scss";
import useMyList from "../../hooks/useMyList";
import useVideo from "../../hooks/useVideo";

const FavouriteItem = ({ movie, setShowModal, getMovie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [save, addMovieToFav] = useMyList(movie._id);
  const typeMedia = useVideo("image", isHovered);

  const handleModal = () => {
    setShowModal(true);
    getMovie(movie);
  };

  return (
    <div
      className="fav-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="boxart">
        {movie.poster ? (
          typeMedia === "image" ? (
            <img src={movie.posterSm} alt="boxart" />
          ) : (
            <video className="video" autoPlay src={movie.trailer} />
          )
        ) : (
          <img style={{ background: "black" }} alt="boxart" />
        )}
      </div>

      <button className="show-details" onClick={handleModal}>
        <span>
          <i className="fas fa-angle-down"></i>
        </span>
      </button>

      <div>
        <div>
          <div>
            <img src={movie.posterTitle} alt="title poster" />
            <div>
              <span>HD</span>
              <span>{movie.limitAge}+</span>
              <span>
                {movie.imdb} <b className="imdb">IMDb</b>
              </span>
              <span>{movie.year}</span>
            </div>
            <div>{movie.genre.split(", ").join(" · ")}</div>
          </div>
          <div>
            <div>
              <div>
                <span>
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
        <div className="item-chevron"></div>
      </div>
    </div>
  );
};

export default FavouriteItem;
