import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { getDataAPI } from "../../utils/fetchData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./featured.scss";

const Featured = ({ type }) => {
  const [bigMovie, setBigMovie] = useState({});
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    const getBigMovie = async () => {
      try {
        const res = await getDataAPI(`movie/random?type=${type}`, auth.token);
        setBigMovie(res.data.movie[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getBigMovie();
  }, [auth.token, type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option disabled>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={bigMovie.poster} alt="Movie background" />
      <div className="info">
        {/* <img
          src="https://toppng.com/uploads/preview/clip-art-royalty-free-stock-avenger-png-for-free-download-avengers-infinity-war-logo-11563078371paziravl4y.png"
          alt="Movie name"
        /> */}
        <span className="desc">{bigMovie.desc}</span>
        <div className="buttons">
          <Link to={{ pathname: "/watch", state: { movie: bigMovie } }}>
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
