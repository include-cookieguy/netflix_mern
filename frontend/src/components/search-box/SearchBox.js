import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../utils/fetchData";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const SearchBox = ({ searchQuery }) => {
  const [resultSearch, setResultSearch] = useState([]);
  const { auth, search } = useSelector((state) => state);
  const debounceSearch = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (debounceSearch.current) {
      clearTimeout(debounceSearch.current);
    }

    debounceSearch.current = setTimeout(() => {
      const startTime = Date.now();
      const getSearch = async () => {
        try {
          if (searchQuery) {
            const res = await axiosInstance.get(
              `movie/search${
                searchQuery
                  ? "?searchString=" + searchQuery
                  : "?searchString=''"
              }`,
              auth.token
            );

            const timeQuery = Date.now() - startTime;

            setResultSearch(res.data);

            dispatch({
              type: GLOBALTYPES.GETSEARCH,
              payload: {
                data: res.data,
                query: searchQuery,
                timeQuery: timeQuery,
              },
            });
          } else {
            dispatch({
              type: GLOBALTYPES.GETSEARCH,
              payload: {
                query: "",
              },
            });
          }
        } catch (err) {
          console.log(err);
        }
      };
      getSearch();
    }, 250);
  }, [searchQuery, auth.token, dispatch]);
  return <div></div>;
};

export default SearchBox;
