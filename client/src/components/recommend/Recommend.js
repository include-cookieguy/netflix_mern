import React, { useEffect, useState } from "react";
import { getDataAPI } from "../../utils/fetchData";
import RecommendItem from "../recommend-item/RecommendItem";
import "./recommend.scss";

const Recommend = ({ movieCurrent }) => {
  const [recommendList, setRecommendList] = useState([]);

  useEffect(() => {
    const getRecommend = async () => {
      try {
        const res = await getDataAPI(`lists/recommend/${movieCurrent._id}`);

        const recommend = res.data[0].result;

        const filterRecommend = recommend.filter(
          (e) => e._id !== movieCurrent._id
        );

        // suffle array
        for (let i = filterRecommend.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [filterRecommend[i], filterRecommend[j]] = [
            filterRecommend[j],
            filterRecommend[i],
          ];
        }

        setRecommendList(filterRecommend);
      } catch (err) {
        console.log(err);
      }
    };
    getRecommend();
  }, [movieCurrent._id]);

  return (
    <div className="menu-similar">
      {!movieCurrent.isSeries && <div className="breaker"></div>}
      <h2>More Like This</h2>
      <div className="menu-similar-content">
        {recommendList.map((e, index) => (
          <RecommendItem key={index} movie={e} />
        ))}
      </div>
    </div>
  );
};

export default Recommend;
