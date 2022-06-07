import { InfoOutlined } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import Category from "../category/Category";
import { getDataAPI } from "../../utils/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import InfoModal from "../infomodal/InfoModal";
import "./featured.scss";

const Featured = ({ type, listRandom }) => {
  const [bigMovie, setBigMovie] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [effectTitle, setEffectTitle] = useState(false);
  const [feature, setFeature] = useState("image");
  const { auth, genre } = useSelector((state) => state);
  const [pathName, setPathName] = useState("/");
  const [genreChange, setGenreChange] = useState("");
  const videoRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();

  const toggleMuted = () => {
    videoRef.current.muted = true;
  };

  useEffect(() => {
    const getBigMovie = async () => {
      //`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""
      try {
        const res = await getDataAPI(
          `movie/random${type ? "?type=" + type : ""}${
            type && genre ? "&genre=" + genre : ""
          }`,
          auth.token
        );

        setBigMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBigMovie();
  }, [auth.token, type, genre]);

  useEffect(() => {
    const effectTimeout = setTimeout(() => {
      setEffectTitle(true);
    }, 6000);
    if (feature === "image") {
      var featureTimeout = setTimeout(() => {
        setFeature("video");
      }, 3500);
    }
    if (pathName !== location.pathname || genreChange !== genre) {
      setFeature("image");
      setEffectTitle(false);
      setGenreChange(genre);
      setPathName(location.pathname);
    }

    return () => {
      clearTimeout(effectTimeout);
      clearTimeout(featureTimeout);
    };
  }, [location.pathname, pathName, feature, dispatch, genre, genreChange]);

  useEffect(() => {
    if (feature === "video") {
      let options = {
        rootMargin: "0px",
        threshold: [0.25, 0.75],
      };

      let handlePlay = (entries, observer) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          }
        });
      };

      let observer = new IntersectionObserver(handlePlay, options);
      observer.observe(videoRef.current);
    }
  }, [feature]);

  useEffect(() => {
    if (videoRef.current) {
      if (feature === "video" && infoModal) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [feature, infoModal]);

  return (
    <div className="featured">
      {type && <Category type={type} />}
      {feature === "image" ? (
        <img src={bigMovie.poster} alt="Movie background" className="poster" />
      ) : (
        <video
          ref={videoRef}
          className="video"
          autoPlay
          src={bigMovie.trailer}
        />
      )}
      <div className={`info ${effectTitle && "effect"}`}>
        <img src={bigMovie.posterTitle} alt="Movie name" className="title" />
        <p className="desc">{bigMovie.desc}</p>
        <div className="buttons">
          <Link to={{ pathname: "/watch", state: { movie: bigMovie } }}>
            <button className="play">
              <i className="fas fa-play" style={{ fontSize: "14px" }}></i>
              <span>Play</span>
            </button>
          </Link>
          <button className="more" onClick={() => setInfoModal(true)}>
            <InfoOutlined />
            <span> More Info</span>
          </button>
          {infoModal && (
            <InfoModal
              infoModal={infoModal}
              setInfoModal={setInfoModal}
              bigMovie={bigMovie}
            />
          )}
        </div>
      </div>
      <span className="age">{bigMovie.limitAge}+</span>
    </div>
  );
};

export default Featured;
