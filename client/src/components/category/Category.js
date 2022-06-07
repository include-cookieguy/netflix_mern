import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import "./category.scss";

const Category = ({ type }) => {
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);
  const genreList = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Historical",
    "Horror",
    "Romance",
    "Sci-fi",
    "Thriller",
    "Western",
  ];
  const [genre, setGenre] = useState("Genres");

  const handleGenre = (e) => {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    setGenre(e.target.textContent);
    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          loading: false,
        },
      });
    }, 1500);
    setShowDropDown(false);
  };

  useEffect(() => {
    setGenre("Genres");
  }, [type]);

  useEffect(() => {
    if (genre !== "Genres") {
      dispatch({ type: GLOBALTYPES.GENRE, payload: genre });
    } else {
      dispatch({ type: GLOBALTYPES.GENRE, payload: "" });
    }
  }, [genre, dispatch]);

  return (
    <div className="category">
      <span className="title-cate">
        {type === "movie" ? "Movies" : "Series"}
      </span>
      <div className="button-dropdown">
        <button
          className={`dropdown-toggle ${showDropDown && "rotate"}`}
          onClick={() => setShowDropDown(!showDropDown)}
        >
          {genre}
        </button>

        {showDropDown && (
          <ul className="dropdown-menu">
            {genreList.map((e, index) => (
              <li
                data-value={e}
                className="dropdown-item"
                onClick={handleGenre}
                key={index}
              >
                {e}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Category;
