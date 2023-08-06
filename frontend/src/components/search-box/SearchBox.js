import React, { useEffect, useRef, useState } from "react";
import { axiosAuth } from "../../utils/fetchData";
import { useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const SearchBox = ({ searchQuery }) => {
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
            const res = await axiosAuth.get(
              `movie/search${
                searchQuery
                  ? "?searchString=" + searchQuery
                  : "?searchString=''"
              }`
            );

            const timeQuery = Date.now() - startTime;

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
  }, [searchQuery, dispatch]);
  return <div></div>;
};

export default SearchBox;
