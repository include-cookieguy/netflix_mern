import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import SearchList from "../../components/search-list/SearchList";
import "./watch-again.scss";

const WatchAgain = () => {
  return (
    <div className="again">
      <Navbar />
      <SearchList />
      <Footer />
    </div>
  );
};

export default WatchAgain;
