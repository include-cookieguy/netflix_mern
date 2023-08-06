import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import EpisodeItem from "../episode-item/EpisodeItem";
import "./episode.scss";

const Episode = ({ movie }) => {
  const { auth } = useSelector((state) => state);
  const [season, setSeason] = useState(1);
  const [episodeOfSeason, setEpisodeOfSeason] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);

  useLayoutEffect(() => {
    if (season !== 0) {
      const epOfSeason = movie.seasons.filter((e) => e.seasonName === season);
      setEpisodeOfSeason(epOfSeason[0].seasonContent);
    } else if (season === 0) {
      setEpisodeOfSeason(movie.seasons);
    }
  }, [season, movie]);

  const handleSelectSeason = (e) => {
    setSeason(parseInt(e.target.value));
    setShowDropDown(false);
  };

  return (
    <div className="episode">
      <div className="epsiode-header">
        <h2>Episodes</h2>
        <div className="button-dropdown">
          <button
            className={`dropdown-toggle ${showDropDown && "rotate"}`}
            onClick={() => setShowDropDown(!showDropDown)}
          >
            {season ? `Season ${season}` : "See All Episodes"}
          </button>

          {showDropDown && (
            <ul className="dropdown-menu">
              {movie.seasons.map((e, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  onClick={handleSelectSeason}
                  value={index + 1}
                >
                  Season {index + 1}{" "}
                  <span className="dropdown-item-length">
                    {" "}
                    (
                    {e.seasonContent.length > 1
                      ? e.seasonContent.length + " Episodes"
                      : e.seasonContent.length + " Episode"}
                    )
                  </span>
                </li>
              ))}
              <div className="breaker"></div>
              <li
                className="dropdown-item"
                value={0}
                onClick={handleSelectSeason}
              >
                See All Episodes
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="episode-container">
        {season
          ? episodeOfSeason.map((e, index) => (
              <EpisodeItem
                key={index}
                episode={e}
                index={index}
                movie={movie}
              />
            ))
          : episodeOfSeason.map((e, index) => (
              <div key={index} className="epsiode-all-episodes">
                <h3>Season {e.seasonName}</h3>
                {Array.isArray(e.seasonContent) &&
                  e.seasonContent.map((eChild, index) => (
                    <EpisodeItem
                      movie={movie}
                      key={eChild._id}
                      episode={eChild}
                      index={index}
                    />
                  ))}
              </div>
            ))}
      </div>
    </div>
  );
};

export default Episode;
