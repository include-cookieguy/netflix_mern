import React, { useEffect, useRef, useState } from "react";
import { getDataAPI } from "../../utils/fetchData";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const SearchBox = ({ searchQuery }) => {
  const [resultSearch, setResultSearch] = useState([]);
  const { auth } = useSelector((state) => state);
  const debounceSearch = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (debounceSearch.current) {
      clearTimeout(debounceSearch.current);
    }

    debounceSearch.current = setTimeout(() => {
      const getSearch = async () => {
        try {
          const res = await getDataAPI(
            `movie/search${
              searchQuery ? "?searchString=" + searchQuery : "?searchString=''"
            }`,
            auth.token
          );

          setResultSearch(res.data);
          dispatch({
            type: GLOBALTYPES.GETSEARCH,
            payload: { data: res.data, query: searchQuery },
          });
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
