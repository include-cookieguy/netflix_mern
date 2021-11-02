import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFav, deleteToFav } from "../redux/actions/userAction";

export default function useMyList(id) {
  const [save, setSave] = useState(false);
  const dispatch = useDispatch();
  const { auth, user } = useSelector((state) => state);
  const mapMovieId = user.favouriteMovie.map((e) => e._id);

  const addMovieToFav = () => {
    if (save) {
      dispatch(deleteToFav(id, auth));
    } else {
      dispatch(addToFav(id, auth));
    }
  };

  useEffect(() => {
    if (mapMovieId.includes(id)) {
      setSave(true);
    } else {
      setSave(false);
    }
  }, [save, id, user, mapMovieId]);

  return [save, addMovieToFav];
}
