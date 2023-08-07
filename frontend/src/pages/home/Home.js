import React from "react";
import { useState, useEffect } from "react";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Slider from "../../components/slider/Slider";
import Navbar from "../../components/navbar/Navbar";
import { axiosAuth } from "../../utils/fetchData";
import "./home.scss";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { useSelector, useDispatch } from "react-redux";
import SearchList from "../../components/search-list/SearchList";
import { useLocation } from "react-router";

const dataTopList = [
  "https://www.themoviedb.org/t/p/w220_and_h330_face/z885tJn5kkUHppjIK1g2Q54iTff.jpg",
  "https://www.themoviedb.org/t/p/original/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg",
  "https://www.themoviedb.org/t/p/w220_and_h330_face/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
  "https://www.themoviedb.org/t/p/w220_and_h330_face/iigTJJskR1PcjjXqxdyJwVB3BoU.jpg",
  "https://www.themoviedb.org/t/p/w220_and_h330_face/p7oImOiZAUF4DCreZuE11hWJRyA.jpg",
  "https://www.themoviedb.org/t/p/w220_and_h330_face/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
  "https://www.themoviedb.org/t/p/original/5UaYsGZOFhjFDwQh6GuLjjA1WlF.jpg",
  "https://www.themoviedb.org/t/p/w220_and_h330_face/z1K4mJwISETia59rrnMdXxzoSrZ.jpg",
  "https://www.themoviedb.org/t/p/w220_and_h330_face/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg",
  "https://www.themoviedb.org/t/p/w220_and_h330_face/kKN1Klhdxhbiwe8TBXIs6NYPr4C.jpg"
]

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [featureLoaded, setFeaturedLoaded] = useState(false);
  const { auth, genre, search, user } = useSelector((state) => state);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        setFeaturedLoaded(false)
        const res = await axiosAuth.get(
          `lists${type ? "?type=" + type : ""}${
            type && genre ? "&genre=" + genre : ""
          }`
        );
        setLists(res.data);
        if (featureLoaded) {
          dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre, featureLoaded]);

  useEffect(() => {
    dispatch({ type: GLOBALTYPES.GENRE, payload: '' });
  }, [type, dispatch])

  const handleChangeLoaded = (loaded) => {
    setFeaturedLoaded(loaded)
  }

  return (
    <div className="home">
      <Navbar />
      {!search.searchInput ? (
        <React.Fragment>
          <Featured type={type} handleChangeLoaded={handleChangeLoaded} />
          <div style={{paddingTop: 50}}></div>
          <Slider mainTitle="Top 10 in Netflix Today" data={dataTopList} top={true} />
          {user.watchAgain.length > 0 && location.pathname === "/" && (
            <Slider
              mainTitle={`Continue watching for ${auth.user.username}`}
              data={user.watchAgain}
              poster={false}
              watchAgain={true}
              type='again'
            />
          )}
          {user.favouriteMovie.length > 0 && (
            <Slider
              mainTitle={`${auth.user.username}'s Favourite List`}
              data={user.favouriteMovie}
              poster={true}
              type='mylist'
            />
          )}
          {lists.map((list, index) => (
            <Slider
              mainTitle={list.title}
              data={list.result}
              poster={false}
              key={index}
              genre={list.genre}
              type={list.type}
            />
          ))}
        </React.Fragment>
      ) : (
        <SearchList />
      )}
      <Footer />
    </div>
  );
};

export default Home;
