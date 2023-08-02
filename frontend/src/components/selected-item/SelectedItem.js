import React, { useState } from "react";

import Recommend from "../recommend/Recommend";
import Details from "../details/Details";
import "./selected-item.scss";

const SelectedItem = ({ currentSlide, closeInformationWindow }) => {
  const [menuOption, setMenuOption] = useState("general-info");

  return (
    <div className="additional-information">
      <div
        className={`ai-background ${
          menuOption !== "general-info" ? "dim" : null
        }`}
      >
        <div className={`ai-background-shadow`} />
        <div
          className="ai-background-image"
          style={{
            backgroundImage: `url(${currentSlide.poster})`,
          }}
        />

        <div className="ai-background-nav-shadow"></div>
      </div>

      {currentSlide ? (
        <React.Fragment>
          <div className="ai-content-area">
            <div className="ai-content-area-container">
              <h3>
                <div>{currentSlide.title}</div>
              </h3>

              {menuOption === "general-info" ? (
                <div className="jaw-bone-common">
                  <div className="metadata">
                    <span className="imdb">
                      <a
                        href={`https://www.imdb.com/title`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-imdb"></i>
                      </a>
                    </span>
                    <span className="score">{currentSlide.imdb}</span>
                    <span className="year">{currentSlide.release_date}</span>
                    <span className="duration">50 cm/s</span>
                  </div>

                  <div className="synopsis">{currentSlide.overview}</div>

                  <div className="actions">
                    <div className="play-link">
                      <button className="hasLabel">
                        <span className="play-icon">
                          <i className="fas fa-play"></i>
                        </span>
                        <span>Play</span>
                      </button>
                    </div>

                    <button className="hasLabel play-link-secondary">
                      <span className="play-icon">
                        <i className="fas fa-plus"></i>
                      </span>
                      <span>My list</span>
                    </button>
                  </div>

                  <div className="meta-lists">
                    <p className="inline-list">
                      <span>Featuring:</span>
                      Cac va Buoi
                    </p>
                    <p className="inline-list">
                      <span>Genres:</span>
                      Cac va Buoi
                    </p>
                  </div>
                </div>
              ) : menuOption === "similar" ? (
                <Recommend additionalMovieInfo={currentSlide} />
              ) : menuOption === "details" ? (
                <Details additionalMovieInfo={currentSlide} />
              ) : null}

              <ul className="menu">
                <li
                  className={`${menuOption === "general-info" && "current"}`}
                  onClick={() => setMenuOption("general-info")}
                >
                  <div className="menu-button">General Information</div>
                  <span></span>
                </li>
                <li
                  className={`${menuOption === "similar" && "current"}`}
                  onClick={() => setMenuOption("similar")}
                >
                  <div className="menu-button">More Like This</div>
                  <span></span>
                </li>
                <li
                  className={`${menuOption === "details" && "current"}`}
                  onClick={() => setMenuOption("details")}
                >
                  <div className="menu-button">
                    About <b style={{ color: "#fff" }}>{currentSlide.title}</b>
                  </div>
                  <span></span>
                </li>
              </ul>
            </div>

            <button
              className="ai-close-button"
              onClick={() => closeInformationWindow()}
            >
              <span>
                <i className="fas fa-times"></i>
              </span>
            </button>
          </div>
        </React.Fragment>
      ) : (
        <div className="ai-content-area">
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default SelectedItem;
