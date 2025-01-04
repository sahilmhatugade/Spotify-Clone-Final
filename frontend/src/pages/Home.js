import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";

const Home = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <Dashboard searchKeyword={searchKeyword} />
      <Footer/>
    </div>
  );
};

export default Home;
