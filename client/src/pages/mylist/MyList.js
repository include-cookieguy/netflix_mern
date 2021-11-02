import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavouriteItem from "../../components/favourite-item/FavouriteItem";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { getFav, removeAll } from "../../redux/actions/userAction";
import "./mylist.scss";

const MyList = () => {
  const [myList, setMyList] = useState([]);
  const dispatch = useDispatch();
  const { auth, user } = useSelector((state) => state);

  useEffect(() => {
    setMyList(user.favouriteMovie);
  }, [auth.token, user.favouriteMovie]);

  const deleteAllFav = () => {
    dispatch(removeAll(auth));
  };

  return (
    <div className="favourite-list">
      <Navbar />
      <div className="container-favouritelist">
        <p>My List</p>
        <button onClick={deleteAllFav} className="delete-all">
          <i className="fas fa-trash-alt"></i> Delete All
        </button>
        <div className="movie-list">
          {myList &&
            myList.map((movie, index) => (
              <FavouriteItem key={index} index={index} movie={movie} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyList;
