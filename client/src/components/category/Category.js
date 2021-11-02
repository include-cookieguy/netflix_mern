import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import "./category.scss";

const Category = ({ type }) => {
  const dispatch = useDispatch();
  const genre = useRef("");
  const handleGenre = (e) => {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    genre.current = e.target.value;
    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          loading: false,
        },
      });
    }, 1310);
  };

  useEffect(() => {
    genre.current = "";
  }, [type]);

  useEffect(() => {
    dispatch({ type: GLOBALTYPES.GENRE, payload: genre.current });
  }, [genre.current, dispatch]);

  return (
    <div className="category">
      <span>{type === "movie" ? "Movies" : "Series"}</span>
      <select
        name="genre"
        id="genre"
        onChange={handleGenre}
        ref={genre}
        value={genre.current}
      >
        <option disabled defaultValue value="Genre">
          Genre
        </option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Animation">Animation</option>
        <option value="Comedy">Comedy</option>
        <option value="Crime">Crime</option>
        <option value="Drama">Drama</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Historical">Historical</option>
        <option value="Horror">Horror</option>
        <option value="Romance">Romance</option>
        <option value="Sci-fi">Sci-fi</option>
        <option value="Thriller">Thriller</option>
        <option value="Western">Western</option>
      </select>
    </div>
  );
};

export default Category;
