import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Close } from "@material-ui/icons";
import "./infomodal.scss";
import useVideo from "../../hooks/useVideo";
import Recommend from "../recommend/Recommend";
import useMyList from "../../hooks/useMyList";
import Episode from "../episode/Episode";

const InfoModal = ({ infoModal, setInfoModal, bigMovie, recommend }) => {
  const ref = useRef();
  const [save, addMovieToFav] = useMyList(bigMovie._id);

  const typeMedia = useVideo("image", infoModal);

  useEffect(() => {
    const escapeKey = (event) => {
      if (event.keyCode === 27) {
        setInfoModal(false);
      }
    };

    const clickOutSide = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      setInfoModal(false);
    };

    // Prevent scolling
    document.querySelector("html").style.overflow = "hidden";
    document.addEventListener("keydown", escapeKey);
    document.addEventListener("mousedown", clickOutSide);

    return () => {
      document.querySelector("html").style.overflowY = "visible";
      document.removeEventListener("keydown", escapeKey);
      document.removeEventListener("mousedown", clickOutSide);
    };
  }, [setInfoModal]);

  return (
    <div className="modal-backdrop">
      <div className="modal-container" ref={ref}>
        <div className="modal-trailer">
          <div className="close" onClick={() => setInfoModal(false)}>
            <Close />
          </div>
          {typeMedia === "image" ? (
            <img src={bigMovie.poster} className="poster-trailer" alt="mov" />
          ) : (
            <video className="poster-trailer" autoPlay src={bigMovie.trailer} />
          )}
          <div className="info-trailer">
            <img
              src={bigMovie.posterTitle}
              alt="Movie name"
              className="poster-title-trailer"
            />
            <div className="buttons">
              <Link to={{ pathname: "/watch", state: { movie: bigMovie } }}>
                <button className="play">
                  <i className="fas fa-play" style={{ fontSize: "14px" }}></i>
                  <span>Play</span>
                </button>
              </Link>
              <span className="function-btn">
                <span
                  title="Add to your favourite list"
                  onClick={addMovieToFav}
                >
                  {save ? (
                    <i className="fas fa-check"></i>
                  ) : (
                    <i className="fas fa-plus"></i>
                  )}
                </span>

                <i className="far fa-thumbs-up"></i>
                <i className="far fa-thumbs-down"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="modal-movie">
          <p className="modal-title">
            About <b>{bigMovie.title}</b>
          </p>
          <div className="modal-about">
            <div className="description">
              <div className="about-info">
                <span>
                  {bigMovie.imdb} <b className="imdb">IMDb</b>
                </span>
                <span>{bigMovie.year}</span>
                <span className="borderd">{bigMovie.limitAge}+</span>
                <span className="borderd">HD</span>
                {bigMovie.isSeries && (
                  <span>
                    {bigMovie.seasons.length > 1
                      ? bigMovie.seasons.length + " Seasons"
                      : bigMovie.seasons.length + " Season"}
                  </span>
                )}
              </div>
              <p className="descr">{bigMovie.desc}</p>
            </div>

            <div className="cast-genre">
              <p style={{ color: "#777777" }}>
                Casts: <span style={{ color: "#fff" }}>{bigMovie.actors}</span>
              </p>
              <p style={{ color: "#777777" }}>
                Genres: <span style={{ color: "#fff" }}>{bigMovie.genre}</span>
              </p>
            </div>
          </div>
          {bigMovie.isSeries && <Episode movie={bigMovie} />}
          <Recommend movieCurrent={bigMovie} recommend={recommend} />
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
