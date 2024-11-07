import React, { useEffect, useState } from "react";
import Topnav from "./templates/Topnav";
import Sidenav from "./templates/Sidenav";
import { useNavigate } from "react-router-dom";
import Dropdown from "./templates/Dropdown";
import axios from "../utils/axios";
import Card from "./templates/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./templates/Loader";

const Trending = () => {
  document.title = "SCSDB | Trending";
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}`, {
        params: { page },
      });

      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    setTrending([]);
    setPage(1);
    setHasMore(true);
    getTrending();
  }, [category, duration]);

  return trending.length > 0 ? (
    <>
      <Sidenav />
      <div
        className="w-full sm:w-[80%] h-full overflow-auto overflow-x-hidden scrollbar-custom"
        id="scrollableDiv"
      >
        <Topnav />
        <div className="w-full px-4 md:px-10 py-5 sm:px-10 md:pl-0">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex justify-between md:justify-normal w-full mb-3 md:mb-0">
              <div className="left">
                <button
                  className="text-1xl md:text-3xl font-semibold flex items-center md:items-end gap-1 rounded-lg pr-2 pl-0 md:pl-5"
                  onClick={() => navigate(-1)}
                >
                  <i className="ri-arrow-left-line text-xl md:text-3xl hover:text-[#7463df] cursor-pointer"></i>
                </button>
              </div>
              <div className="right">
                <h1 className="text-1xl md:text-3xl font-semibold flex items-center md:items-end gap-3 pr-5 md:pr-0">
                  Trending
                </h1>
              </div>
            </div>
            <div className="flex gap-2 sm:px-10 w-[55vh] md:w-full px-10 flex:wrap sm:items-start md:pr-0">
              <Dropdown
                options={["all", "movie", "tv"]}
                func={(e) => setCategory(e.target.value)}
                title={category}
              />
              <Dropdown
                options={["day", "week"]}
                func={(e) => setDuration(e.target.value)}
                title={duration}
              />
            </div>
          </div>
        </div>
        <div className="md:px-5 px-0">
          <InfiniteScroll
            loader={<h1>Loading...</h1>}
            dataLength={trending.length}
            next={getTrending}
            hasMore={hasMore}
            scrollableTarget="scrollableDiv"
          >
            <Card data={trending} title={category} />
          </InfiniteScroll>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Trending;
