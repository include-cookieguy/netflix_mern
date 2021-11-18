// import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Slider from "../../components/slider/Slider";
import Navbar from "../../components/navbar/Navbar";
import { getDataAPI } from "../../utils/fetchData";
import "./home.scss";
// import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import SearchList from "../../components/search-list/SearchList";
import { useLocation } from "react-router";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const { auth, genre, search, user } = useSelector((state) => state);
  const location = useLocation();

  // const axiosJWT = axios.create();
  // axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     let currentDate = new Date();
  //     const decodedToken = jwt_decode(localStorage.getItem('access_token'));
  //     console.log(decodedToken);
  //     if (decodedToken.exp * 1000 < currentDate.getTime()) {
  //       const data = await refreshToken();
  //       config.headers['authorization'] = 'Bearer ' + data.access_token;
  //       localStorage.setItem('access_token', data.access_token);
  //     }

  //     console.log(config);
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await getDataAPI(
          `lists${type ? "?type=" + type : ""}${
            type && genre ? "&genre=" + genre : ""
          }`,
          auth.token
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, auth.token, genre]);

  // const refreshToken = async () => {
  //   try {
  //     const res = await postDataAPI('refresh_token');
  //     dispatch({
  //       type: GLOBALTYPES.AUTH,
  //       payload: {
  //         token: res.data.access_token,
  //         user: res.data.user,
  //       },
  //     });
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="home">
      <Navbar />
      {!search.searchInput ? (
        <React.Fragment>
          <Featured type={type} listRandom={lists} />
          <div className="top-5">
            <h1>Top 5 in Vietnam Today</h1>
            <div class="wrapper">
              <div class="item">
                <img
                  src="https://occ-0-395-58.1.nflxso.net/dnm/api/v6/Da_vleYcahiCE7JMYt8LJRyoenc/AAAABYUNVCsbNhWFLDh6trh4IddkaG98S6wf5OudTc01J8NRUSrXe-WKiqS7KWtXGWhtowD4G5HtOH676YBYyUjmgaeXgvVcl9TSJLM5nec7Dq3VrQFj1ppQZyKDbzqPvw.webp?r=dae"
                  alt="top"
                />
                <div>1</div>
              </div>
              <div class="item">
                <img
                  src="//image.tmdb.org/t/p/w220_and_h330_face/6tfT03sGp9k4c0J3dypjrI8TSAI.jpg"
                  alt="top"
                />
                <div>2</div>
              </div>
              <div class="item">
                <img
                  src="https://occ-0-395-58.1.nflxso.net/dnm/api/v6/Da_vleYcahiCE7JMYt8LJRyoenc/AAAABQyMo9FexoaHUz1nw8fetcYXqz-0mI6Dkncw6v8CsuEz3lacTX1KWVaH-VzowXW1ez5PPKS1BmEVX45X9ss0ZzQ_b-HkZQ8ajoxJC4-k6zt_BCZMkclNdspEq6v9bOS8rlYzqrxKUBof-2m9CzZZj7tobaitpYJunArSQIfz_N9ECHG089PO9iVsmis6HAfRYctycqGJ0HAj_Vwt54Gax9GbqwjQqd-5cNGxE1H1d2_O4QgiU2hrBCq39qcTr2LjncKV8lVQio4_uAMuiYg7kCIqUvpZ6K322oqCrVOkxbYmxOOLR6w-jL8cMWgYp1WezhHulAglPVlE_KfwCNdHoO5g3YFKBpzPwGKBFQqW8oDeKO-VWY4u9wUNJ6GdiJfu2GrGBevMixCTUT4v9udIkvOOVdbWgE7j6Nhl7qg97X0.webp?r=ded"
                  alt="top"
                />
                <div>3</div>
              </div>
              <div class="item">
                <img
                  src="//image.tmdb.org/t/p/w220_and_h330_face/wGFUewXPeMErCe2xnCmmLEiHOGh.jpg"
                  alt="top"
                />
                <div>4</div>
              </div>
              <div class="item">
                <img
                  src="//image.tmdb.org/t/p/w220_and_h330_face/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg"
                  alt="top"
                />
                <div>5</div>
              </div>
            </div>
          </div>
          {user.watchAgain.length > 0 && location.pathname === "/" && (
            <Slider
              mainTitle={`Continue Watching for ${auth.user.username}`}
              data={user.watchAgain}
              poster={false}
              watchAgain={true}
            />
          )}
          {user.favouriteMovie.length > 0 && (
            <Slider
              mainTitle={`${auth.user.username}'s List`}
              data={user.favouriteMovie}
              poster={true}
            />
          )}
          {lists.map((list, index) => (
            <Slider
              mainTitle={list.title}
              data={list.result}
              poster={false}
              key={index}
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
