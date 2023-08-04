import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [genreLocal, setGenre] = useState("Genres");
  const { genre } = useSelector((state) => state);

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
    setGenre('Genres');
    dispatch({ type: GLOBALTYPES.GENRE, payload: '' });
  }, [type])

  useEffect(() => {
    if (genreLocal !== "Genres") {
      dispatch({ type: GLOBALTYPES.GENRE, payload: genreLocal });
    }
  }, [genreLocal, dispatch]);

  useEffect(() => {
    if (genre) {
      setGenre(genre);
    }
  }, [genre])

  return (
    <div className="category">
      <span className="title-cate">
        {type === "movies" ? "Movies" : "Series"}
      </span>
      <div className="button-dropdown">
        <button
          className={`dropdown-toggle ${showDropDown && "rotate"}`}
          onClick={() => setShowDropDown(!showDropDown)}
        >
          {genreLocal}
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
