import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import Featured from '../../components/featured/Featured';
import Footer from '../../components/footer/Footer';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import { postDataAPI } from '../../utils/fetchData';
import './home.scss';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const dispatch = useDispatch();

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(localStorage.getItem('access_token'));
      console.log(decodedToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers['authorization'] = 'Bearer ' + data.access_token;
        localStorage.setItem('access_token', data.access_token);
      }

      console.log(config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axiosJWT.get(
          `/api/lists${type ? '?type=' + type : ''}${
            genre ? '&genre=' + genre : ''
          }`,
          {
            headers: {
              authorization: 'Bearer ' + localStorage.getItem('access_token'),
            },
          }
        );
        console.log(res);
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  const refreshToken = async () => {
    try {
      const res = await postDataAPI('refresh_token');
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} />
      {lists.map((list, index) => (
        <List list={list} key={index} />
      ))}
      <Footer />
    </div>
  );
};

export default Home;
