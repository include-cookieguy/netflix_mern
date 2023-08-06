import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import InfoModal from "../infomodal/InfoModal";
import SearchItem from "../search-item/SearchItem";
import "./search-list.scss";

const SearchList = () => {
  const { search, user } = useSelector((state) => state);
  const [listGrid, setListGrid] = useState([]);
  const [movieModal, setMovieModal] = useState({});
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 300);
    window.scrollTo(0, 0);

    return () => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      window.scrollTo(0, 0);
      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      }, 300);
    };
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === "/again") {
      setListGrid(user.watchAgain);
    } else if (search.searchInput && location.pathname !== "/again") {
      setListGrid(search.searchList);
    }
  }, [search, user, location.pathname]);

  return (
    <div className="search-container">
      <div className="search-list">
        <div className="time-query">
          {search.searchInput ? (
            <h1 style={{ fontSize: "3.8rem" }}>
              Search Movies | Series | Actors
            </h1>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "2rem",
                  fontWeight: "300",
                  marginRight: "10px",
                }}
              >
                User &gt;
              </span>{" "}
              <h1 style={{ fontSize: "3.8rem" }}>Watch Again</h1>
            </div>
          )}
          {search.searchInput && (
            <span>
              Get <span>{search.searchList.length} results</span> related to
              your search in <span>{search.timeQuery} milliseconds</span>
            </span>
          )}
        </div>
        {listGrid.map((e, index) => (
          <div className="grid-container" key={index}>
            <SearchItem
              movie={e}
              key={index}
              getMovie={(movie) => setMovieModal(movie)}
              setShowModal={setShowModal}
            />
            {location.pathname === "/again" && (
              <div className="progress">
                <span className="progress-bar">
                  <span
                    className="progress-completed"
                    style={{
                      width: (e.pausedAt / e.movieLength) * 100 + "%",
                    }}
                  ></span>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      {showModal && (
        <InfoModal
          infoModal={showModal}
          setInfoModal={setShowModal}
          bigMovie={movieModal}
        />
      )}
    </div>
  );
};

export default SearchList;
