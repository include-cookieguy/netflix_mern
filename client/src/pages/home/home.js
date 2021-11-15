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

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const { auth, genre, search } = useSelector((state) => state);

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
