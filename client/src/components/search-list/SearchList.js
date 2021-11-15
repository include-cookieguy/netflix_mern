import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import InfoModal from "../infomodal/InfoModal";
import SearchItem from "../search-item/SearchItem";
import "./search-list.scss";

const SearchList = () => {
  const { search } = useSelector((state) => state);
  const [movieModal, setMovieModal] = useState({});
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 300);

    return () => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      }, 300);
    };
  }, [dispatch]);
  return (
    <div className="search-container">
      <div className="search-list">
        {search.searchList.map((e, index) => (
          <SearchItem
            movie={e}
            key={index}
            getMovie={(movie) => setMovieModal(movie)}
            setShowModal={setShowModal}
          />
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
