import React from "react";
import { Link } from "react-router-dom";
import useMyList from "../../hooks/useMyList";
import "./recommend-item.scss";

const RecommendItem = ({ movie }) => {
  const [save, addMovieToFav] = useMyList(movie._id);
  return (
    <div className="similar-movie">
      <img src={movie.posterSm} alt="recommend things" />

      <div className="similar-movie-content">
        <div className="similar-movie-addition">
          <span className="age-recommend">{movie.limitAge}+</span>
          <span>
            {movie.imdb} <b className="imdb">IMDB</b>
          </span>

          <div className="recommend-mylist">
            <span>
              <Link to={{ pathname: "/watch", state: { movie: movie } }}>
                <i className="fas fa-play"></i>
              </Link>
            </span>
            <span
              onClick={addMovieToFav}
              title={save ? "Remove from My List" : "Add to My List"}
            >
              {save ? (
                <i className="fas fa-check"></i>
              ) : (
                <i className="fas fa-plus"></i>
              )}
            </span>
          </div>
        </div>
        <p style={{ marginTop: "15px", fontSize: "2rem" }}>{movie.title}</p>
        <div>{movie.desc}</div>
      </div>
    </div>
  );
};

export default RecommendItem;
