import { InfoOutlined } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import Category from "../category/Category";
import { axiosAuth } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import InfoModal from "../infomodal/InfoModal";
import "./featured.scss";

const Featured = ({ type, listRandom }) => {
  const [bigMovie, setBigMovie] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [muted, setMuted] = useState(true);
  const [effectTitle, setEffectTitle] = useState(false);
  const [feature, setFeature] = useState("image");
  const { auth, genre } = useSelector((state) => state);
  const [pathName, setPathName] = useState("/");
  const [genreChange, setGenreChange] = useState("");
  const videoRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getBigMovie = async () => {
      try {
        const res = await axiosAuth.get(
          `movie/random${type ? "?type=" + type : ""}${
            type && genre ? "&genre=" + genre : ""
          }`
        );

        setBigMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBigMovie();
  }, [type, genre]);

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

  const rendered = () => {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  }

  const rendering = () => {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    requestAnimationFrame(rendered)
  }

  return (
    <div className="featured">
      {type && <Category type={type} />}
      {feature === "image" ? (
        <img onLoad={() => requestAnimationFrame(rendering)} src={bigMovie.poster} alt="Movie background" className="poster" />
      ) : (
        <video
          ref={videoRef}
          className="video"
          autoPlay
          muted={muted}
          src={bigMovie.trailer}
        />
      )}
      <div className="muted" onClick={() => {
        setMuted(preMuted => !preMuted);
        if (videoRef.current && videoRef.current.muted) {
          videoRef.current.muted = !muted;
        }
        }}>
      <i className={muted ? "fas fa-volume-xmark" : "fas fa-volume-high"}></i>
      </div>
      <div className={`info ${effectTitle && "effect"}`}>
        {bigMovie.posterTitle ? <img src={bigMovie.posterTitle} alt="Movie name" className="title" /> : <div></div>}
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
