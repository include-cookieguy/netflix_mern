import {
  Add,
  Check,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./favourite-item.scss";
import useMyList from "../../hooks/useMyList";

const ListItem = ({ index, movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [save, addMovieToFav] = useMyList(movie._id);

  return (
    <div
      className="fav-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
    >
      <img src={movie.posterSm} alt="Movie items" />

      {isHovered && (
        <div>
          <Link to={{ pathname: "/watch", state: { movie: movie } }}>
            <video src={movie.trailer} autoPlay={true} loop />
          </Link>
          <div className="item-info">
            <div className="icons">
              <Link to={{ pathname: "/watch", state: { movie: movie } }}>
                <PlayArrow className="icon" />
              </Link>
              <span title="Add to your favourite list" onClick={addMovieToFav}>
                {save ? <Check className="icon" /> : <Add className="icon" />}
              </span>
              <ThumbUpOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="item-info-top">
              <span>{movie.duration}</span>
              <span>
                {movie.imdb} <b className="imdb">IMDb</b>
              </span>
              <span>{movie.year}</span>
              <span className="borderd">{movie.limitAge}+</span>
              <span className="borderd">HD</span>
            </div>
            <div className="desc">{movie.desc}</div>
            <div className="genre">{movie.genre.split(", ").join(" · ")}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListItem;
