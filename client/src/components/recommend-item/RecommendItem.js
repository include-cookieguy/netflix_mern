import React from "react";
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

          <span
            onClick={addMovieToFav}
            title={save ? "Remove from My List" : "Add to My List"}
            className="recommend-mylist"
          >
            <span>
              {save ? (
                <i className="fas fa-check"></i>
              ) : (
                <i className="fas fa-plus"></i>
              )}
            </span>
          </span>
        </div>
        <div>{movie.desc}</div>
      </div>
    </div>
  );
};

export default RecommendItem;
