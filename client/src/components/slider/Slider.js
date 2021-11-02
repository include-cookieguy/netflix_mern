import React, { useRef, useState } from "react";
import SelectedItem from "../selected-item/SelectedItem";
import SliderItem from "../slider-item/SliderItem";
import SliderContext from "./context";

import useWindowWidth from "../../hooks/useWindowWidth";
import useSlider from "../../hooks/useSlider";
import "./slider.scss";
import InfoModal from "../infomodal/InfoModal";

function Slider({ mainTitle, data, poster }) {
  const width = useWindowWidth();
  const ref = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [movieModal, setMovieModal] = useState({});

  const {
    moveSection,
    selectSlide,
    scaleTiles,
    resetSize,
    sliderPages,
    slideProps,
    hasPrev,
    hasNext,
    content,
    currentSlide,
    paginationIndicator,
  } = useSlider(width, ref, 20, data, poster);

  const contextValue = {
    currentSlide,
  };

  return (
    <SliderContext.Provider value={contextValue}>
      <div className="sliderBox">
        <h2 className="slider-header">
          <a href={"/"}>
            <div>{mainTitle}</div>
            <div className="see-more">Explore more</div>
            <div className="see-more-chevron">
              <i className="fas fa-chevron-right"></i>
            </div>
          </a>
        </h2>

        <div className="slider-container">
          <div className="slider">
            <ul className="pagination-indicator">
              {sliderPages > 0 ? paginationIndicator(sliderPages) : ""}
            </ul>

            <div className="sliderMask showPeek">
              <div
                className={`slider-content ${currentSlide ? "open" : ""}`}
                ref={ref}
                {...slideProps}
              >
                {content.map((item) => {
                  return (
                    <SliderItem
                      key={item.id}
                      idMovie={item.id}
                      data={item}
                      hover={scaleTiles}
                      reset={resetSize}
                      transform={item.transform}
                      origin={item.origin}
                      onSelectSlide={selectSlide}
                      poster={poster}
                      setShowModal={setShowModal}
                      getMovie={(movie) => setMovieModal(movie)}
                    />
                  );
                })}
              </div>
            </div>

            {hasNext && (
              <span
                className="handle handleNext"
                onClick={() => moveSection("right")}
              >
                <strong>
                  <i className="fas fa-chevron-right"></i>
                </strong>
              </span>
            )}

            {hasPrev && (
              <span
                className="handle handlePrev"
                onClick={() => moveSection("left")}
              >
                <strong>
                  <i className="fas fa-chevron-left"></i>
                </strong>
              </span>
            )}

            {/* GO BACK TO ZERO */}
            {hasPrev && hasNext === false ? (
              <span
                className="handle handleNext"
                onClick={() => moveSection("reset")}
              >
                <strong>
                  <i className="fas fa-undo"></i>
                </strong>
              </span>
            ) : null}
          </div>
        </div>

        {/* {currentSlide && (
          <SelectedItem
            currentSlide={currentSlide}
            closeInformationWindow={closeInformationWindow}
          />
        )} */}
      </div>
      {showModal && (
        <InfoModal
          infoModal={showModal}
          setInfoModal={setShowModal}
          bigMovie={movieModal}
          recommend={content}
        />
      )}
    </SliderContext.Provider>
  );
}

export default Slider;
