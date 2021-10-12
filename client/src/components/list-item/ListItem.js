import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import "./list-item.scss";

const ListItem = ({ index, item }) => {
  const inititalMovie = {
    poster: "",
    trailer: "",
    duration: "",
    limitAge: "",
    year: "",
    desc: "",
    genre: "",
  };
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState(() => {
    return inititalMovie;
  });
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await getDataAPI("movie/get/" + item, auth.token);
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item, auth.token]);

  return (
    <Link to={{ pathname: "/watch", state: { movie: movie } }}>
      <div
        className="list-item"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      >
        <img src={movie.poster} alt="Movie items" />
        {isHovered && (
          <div>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="item-info">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="item-info-top">
                <span>{movie.duration}</span>
                <span className="limit-age">+{movie.limitAge}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
