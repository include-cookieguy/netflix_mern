import { Link } from "react-router-dom";
import React from "react";
import "./watch.scss";
import { useLocation } from "react-router";
import ReactNetflixPlayer from "react-netflix-player";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createWatchAgain,
  deleteWatchAgain,
  updateWatchAgain,
} from "../../redux/actions/userAction";

const Watch = () => {
  const location = useLocation();
  const { auth, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const progressBar = document.querySelector(".progress-bar");
    return () => {
      if (progressBar.value > 20) {
        if (progressBar.value === progressBar.max) {
          dispatch(deleteWatchAgain(auth, location.state.movie._id));
        } else {
          const foundMovie = user.watchAgain.filter(
            (e) => e._id === location.state.movie._id
          );

          if (foundMovie.length === 0) {
            const watchAgainMovie = {
              ...location.state.movie,
              pausedAt: progressBar.value,
              movieLength: progressBar.max,
            };
            dispatch(createWatchAgain(auth, watchAgainMovie));
          } else {
            const watchAgainMovie = {
              ...location.state.movie,
              pausedAt: progressBar.value,
              movieLength: progressBar.max,
            };
            dispatch(updateWatchAgain(auth, watchAgainMovie));
          }
        }
      }
    };
  }, [dispatch, location.state.movie, user.watchAgain, auth]);

  return (
    <div className="watch">
      <div className="back">
        <Link to="/">
          <div>
            <i className="fas fa-arrow-left"></i>
            Home
          </div>
        </Link>
      </div>
      <div className="video">
        <ReactNetflixPlayer
          src={location.state.movie.video}
          primaryColor={"#E50914"}
          autoPlay={true}
          playerLanguage={"en"}
          title={location.state.movie.title}
          subTitle={location.state.movie.title}
          titleMedia={location.state.movie.title}
          startPosition={
            user.watchAgain.filter((e) => e._id === location.state.movie._id)
              .length === 1 &&
            user.watchAgain.filter((e) => e._id === location.state.movie._id)[0]
              .pausedAt
          }
        />
      </div>
    </div>
  );
};

export default Watch;
