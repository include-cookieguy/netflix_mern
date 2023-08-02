import { Link } from "react-router-dom";
import React, { useRef, useState, useContext } from "react";
import SliderContext from "../slider/context";
import "./slider-item.scss";
import useVideo from "../../hooks/useVideo";
import useMyList from "../../hooks/useMyList";

function SliderItem({
  data,
  hover,
  reset,
  transform,
  origin,
  idMovie,
  poster,
  setShowModal,
  getMovie,
}) {
  const ref = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [save, addMovieToFav] = useMyList(data.id);

  const typeMedia = useVideo("image", showOverlay);

  const sliderWrapper = useContext(SliderContext);

  const onHover = (e) => {
    if (!sliderWrapper.currentSlide) {
      hover(e);
      setShowOverlay(true);
    }
  };

  const onHoverLeave = (e) => {
    reset(e);
    setShowOverlay(false);
  };

  const handleModal = () => {
    setShowModal(true);
    getMovie(data);
  };

  const isActive =
    sliderWrapper.currentSlide && sliderWrapper.currentSlide.id === idMovie;

  const translate = `translateX(${transform})`;

  const styled = {
    transform: translate,
    transformOrigin: origin,
    transition: "all 0.5s ease-in-out",
  };

  return (
    <div
      style={styled}
      data-id={idMovie}
      className={`slider-item ${poster === true ? "poster" : "card"}`}
      ref={ref}
      onMouseLeave={(e) => onHoverLeave(e)}
      onMouseEnter={(e) => onHover(e)}
    >
      <div className="boxart-container">
        <div className="boxart">
          {poster === false ? (
            <React.Fragment>
              {data.poster ? (
                typeMedia === "image" ? (
                  <img src={data.posterSm} alt="boxart" />
                ) : (
                  <video className="video" autoPlay src={data.trailer} />
                )
              ) : (
                <img style={{ background: "black" }} alt="boxart" />
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {data.poster ? (
                <img src={data.posterCard} alt="boxart" />
              ) : (
                <img style={{ background: "black" }} alt="boxart" />
              )}
            </React.Fragment>
          )}
        </div>
      </div>

      <button className="show-details" onClick={handleModal}>
        <span>
          <i className="fas fa-angle-down"></i>
        </span>
      </button>

      {poster === false && (
        <div className={`item-overlay ${showOverlay ? "open" : ""}`}>
          <div className="item-wrapper">
            <div className="item-overview">
              <img
                className="item-overview-title"
                src={data.posterTitle}
                alt="title poster"
              />
              <div className="item-overview-metadata">
                <span className="metadata-rating">HD</span>
                <span className="metadata-maturity">{data.limitAge}+</span>
                <span>
                  {data.imdb} <b className="imdb">IMDb</b>
                </span>
                <span className="metadata-maturity">{data.year}</span>
              </div>
              <div className="item-overview-synopsis">
                {data.genre.split(", ").join(" · ")}
              </div>
            </div>
            <div className="item-actions">
              <div className="item-action-buttons">
                <div>
                  <span className="play">
                    <Link to={{ pathname: "/watch", state: { movie: data } }}>
                      <i className="fas fa-play"></i>
                    </Link>
                  </span>
                </div>
                <div
                  onClick={addMovieToFav}
                  title={save ? "Remove from My List" : "Add to My List"}
                >
                  <span>
                    {save ? (
                      <i className="fas fa-check"></i>
                    ) : (
                      <i className="fas fa-plus"></i>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="item-chevron"></div>
        </div>
      )}

      {isActive && <div className="mark" />}
    </div>
  );
}

export default SliderItem;
