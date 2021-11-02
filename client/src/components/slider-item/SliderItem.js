// // import {
// //   Add,
// //   Check,
// //   PlayArrow,
// //   ThumbDownOutlined,
// //   ThumbUpOutlined,
// // } from "@material-ui/icons";
// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getDataAPI } from "../../utils/fetchData";
// // import "./list-item.scss";
// // import { addToFav, deleteToFav } from "../../redux/actions/userAction";
// // import InfoModal from "../infomodal/InfoModal";
// // const ListItem = ({ index, item, setInfoModal }) => {
// //   const inititalMovie = {
// //     posterSm: "",
// //     trailer: "",
// //     duration: "",
// //     limitAge: "",
// //     year: "",
// //     desc: "",
// //     genre: "",
// //   };
// //   const { auth, user } = useSelector((state) => state);
// //   const [isHovered, setIsHovered] = useState(false);

// //   useEffect(() => {
// //     const getMovie = async () => {
// //       try {
// //         const res = await getDataAPI("movie/get/" + item, auth.token);
// //         setMovie(res.data);
// //       } catch (err) {
// //         console.log(err);
// //       }
// //     };
// //     getMovie();
// //   }, [item, auth.token]);

// //   return (
// //     <div className="list-item">
// //       <img src={movie.posterSm} alt="Movie items" />
// //       {/* <Link to={{ pathname: "/watch", state: { movie: movie } }}>
// //             <video src={movie.trailer} autoPlay={true} loop />
// //           </Link> */}

// // export default ListItem;

// import { getDataAPI } from "../../utils/fetchData";
// import InfoModal from "../../components/infomodal/InfoModal";
// import "./slider-item.scss";

// function SliderItem({ data, hover, reset, transform, origin, idMovie, poster }) {
//   const ref = useRef(null);
//   const inititalMovie = {
//     posterSm: "",
//     trailer: "",
//     duration: "",
//     limitAge: "",
//     year: "",
//     desc: "",
//     genre: "",
//   };
//   const [save, setSave] = useState(false);
//   const [movie, setMovie] = useState(() => {
//     return inititalMovie;
//   });
//   const [feature, setFeature] = useState("image");
//   const [hoverItem, setHoverItem] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const { auth, user } = useSelector((state) => state);

//   const dispatch = useDispatch();
//   const mapMovieId = user.favouriteMovie.map((e) => e._id);

//   const addMovieToFav = () => {
//     if (save) {
//       dispatch(deleteToFav(data.id, auth));
//     } else {
//       dispatch(addToFav(data.id, auth));
//     }
//   };

//   useEffect(() => {
//     if (mapMovieId.includes(data.id)) {
//       setSave(true);
//     } else {
//       setSave(false);
//     }
//   }, [save, data.id, user, mapMovieId]);

//   useEffect(() => {
//     const getMovie = async () => {
//       try {
//         const res = await getDataAPI("movie/get/" + data.id, auth.token);
//         setMovie(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMovie();
//   }, [auth.token, data.id]);

//   useEffect(() => {
//     if (feature === "image" && hoverItem) {
//       var timeFeature = setTimeout(() => {
//         setFeature("video");
//       }, 1310);
//     } else if (feature === "video" && !hoverItem) {
//       setFeature("image");
//     }

//     return () => {
//       clearTimeout(timeFeature);
//     };
//   }, [feature, hoverItem]);

//   const onHover = (e) => {
//     hover(e);
//     setHoverItem(true);
//   };

//   const onHoverLeave = (e) => {
//     reset(e);
//     setHoverItem(false);
//   };

//   const translate = `translateX(${transform})`;

//   const styled = {
//     transform: translate,
//     transformOrigin: origin,
//     transition: "all 0.3s ease-in-out",
//   };

//   return (
//     <div
//       style={styled}
//       data-id={idMovie}
//       className={`slider-item ${poster === true ? "poster" : "card"}`}
//       ref={ref}
//       onMouseLeave={(e) => onHoverLeave(e)}
//       onMouseEnter={(e) => onHover(e)}
//     >
//       <div className="boxart-container">
//         <div className="boxart">
//           <Link to={{ pathname: "/watch", state: { movie: movie } }}>
//             {poster === false ? (
//               <React.Fragment>
//                 {movie.posterSm ? (
//                   feature === "image" ? (
//                     <img src={movie.posterSm} alt="boxart" />
//                   ) : (
//                     <video className="video" autoPlay src={movie.trailer} />
//                   )
//                 ) : (
//                   <img style={{ background: "black" }} alt="boxart" />
//                 )}
//               </React.Fragment>
//             ) : (
//               <React.Fragment>
//                 {movie.posterSm ? (
//                   feature === "image" ? (
//                     <img src={movie.posterSm} alt="boxart" />
//                   ) : (
//                     <video className="video" autoPlay src={movie.trailer} />
//                   )
//                 ) : (
//                   <img style={{ background: "black" }} alt="boxart" />
//                 )}
//               </React.Fragment>
//             )}
//           </Link>

//           {hoverItem && (
//             <div className="item-info" onClick={() => setShowModal(true)}>
//               <div className="icons">
//                 <Link to={{ pathname: "/watch", state: { movie: movie } }}>
//                   <PlayArrow className="icon arrow" />
//                 </Link>
//                 <span
//                   idMovie="Add to your favourite list"
//                   onClick={addMovieToFav}
//                 >
//                   {save ? <Check className="icon" /> : <Add className="icon" />}
//                 </span>
//                 <ThumbUpOutlined className="icon" />
//                 <ThumbDownOutlined className="icon" />
//               </div>
//               <div>
//                 <div className="item-info-top">
//                   <span>
//                     {movie.imdb} <b className="imdb">IMDb</b>
//                   </span>
//                   <span className="borderd">{movie.limitAge}+</span>
//                   <span className="borderd">HD</span>
//                   <span>{movie.year}</span>
//                 </div>
//                 <div className="genre">
//                   {movie.genre.split(", ").join(" · ")}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       {showModal && <InfoModal setInfoModal={setShowModal} bigMovie= />}

//       {/* {poster === false && (
//         <div className={`item-overlay`}>
//           <div className="item-wrapper">
//             <div className="item-overview">
//               <div className="item-overview-play">
//                 <span>
//                   <i className="fas fa-play-circle"></i>
//                 </span>
//               </div>
//               <div className="item-overview-metadata">
//                 <span className="metadata-rating">New</span>
//                 <span className="metadata-maturity">Age 18+</span>
//               </div>
//               <div className="item-overview-synopsis">{movie.genre}</div>
//             </div>
//             <div className="item-actions">
//               <div className="item-action-buttons">
//                 <div>
//                   <span>
//                     <i className="fas fa-thumbs-up"></i>
//                   </span>
//                 </div>
//                 <div>
//                   <span>
//                     <i className="fas fa-plus"></i>
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="item-chevron"></div>
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// }

// export default SliderItem;

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
                <img src={data.poster} alt="boxart" />
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
