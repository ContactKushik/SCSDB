import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidenav from "./templates/Sidenav";
import axios from "../utils/axios";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./templates/Card";
import Loader from "./templates/Loader";

const Tvshows = () => {
  document.title = "SCSDB | TV";
  const navigate = useNavigate();
  const [category, setCategory] = useState("top_rated");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getMovie = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}`, {
        params: { page },
      });

      if (data.results.length > 0) {
        setTv((prev) => [...prev, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    setTv([]);
    setPage(1);
    setHasMore(true);
    getMovie();
  }, [category]);

  return tv.length > 0 ? (
    <>
      <Sidenav />
      <div
        className="w-full sm:w-[80%] h-full overflow-auto overflow-x-hidden scrollbar-custom"
        id="scrollableDiv"
      >
        <Topnav />
        <div className="w-full px-4 md:px-10 py-5 sm:px-10 md:pl-0">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex justify-between md:justify-normal w-full md:w-[400px] mb-3 md:mb-0">
              <div className="left">
                <button
                  className="text-1xl md:text-3xl font-semibold flex items-center md:items-end gap-1 rounded-lg pr-2 pl-0 md:pl-5"
                  onClick={() => navigate(-1)}
                >
                  <i className="ri-arrow-left-line text-xl md:text-3xl hover:text-[#7463df] cursor-pointer"></i>
                </button>
              </div>
              <div className="right">
                <h1 className="text-1xl md:text-3xl font-semibold flex items-center gap-3 pr-5 md:pr-0">
                  TV
                  <span className="text-zinc-600">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                </h1>
              </div>
            </div>
            <div className="flex gap-2">
              <Dropdown
                options={["airing_today", "on_the_air", "popular", "top_rated"]}
                func={(e) => setCategory(e.target.value)}
                title={"category"}
              />
            </div>
          </div>
        </div>
        <div className="md:px-5 px-0">
          <InfiniteScroll
            loader={<div className="text-center py-4">Loading...</div>}
            dataLength={tv.length}
            next={getMovie}
            hasMore={hasMore}
            scrollableTarget="scrollableDiv"
          >
            <Card data={tv} title="TV" />
          </InfiniteScroll>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Tvshows;
