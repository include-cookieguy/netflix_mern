import React, { useEffect, useState } from "react";
import RecommendItem from "../recommend-item/RecommendItem";
import "./recommend.scss";

const Recommend = ({ movieCurrent, recommend }) => {
  const [recommendList, setRecommendList] = useState([]);

  useEffect(() => {
    const filterRecommend = recommend.filter((e) => e._id !== movieCurrent._id);

    // suffle array
    for (let i = filterRecommend.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filterRecommend[i], filterRecommend[j]] = [
        filterRecommend[j],
        filterRecommend[i],
      ];
    }

    setRecommendList(filterRecommend);
  }, [movieCurrent, recommend]);

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
