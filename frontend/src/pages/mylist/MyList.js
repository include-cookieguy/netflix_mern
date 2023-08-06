import Slider from "../../components/slider/Slider";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { removeAll } from "../../redux/actions/userAction";
import { axiosAuth } from "../../utils/fetchData";
import "./mylist.scss";

const MyList = () => {
  const [myList, setMyList] = useState([]);
  const [listsForRecommend, setListsForRecommend] = useState([]);
  const dispatch = useDispatch();
  const { auth, user } = useSelector((state) => state);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axiosAuth.get(`lists`);
        setListsForRecommend(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [auth.token]);

  useEffect(() => {
    setMyList([{ result: user.favouriteMovie }]);
  }, [user.favouriteMovie]);

  const deleteAllFav = () => {
    dispatch(removeAll(auth));
  };

  return (
    <div className="favourite-list">
      <Navbar />
      <div className="container-favouritelist">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "100px 60px 0px 60px",
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
          <h1 className="header-favourite">My List</h1>
        </div>
        <button onClick={deleteAllFav} className="delete-all">
          Delete All <i className="fas fa-trash-alt"></i>
        </button>
        <div className="movie-list">
          {myList.map((list, index) => (
            <Slider data={list.result} poster={true} key={index} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyList;
