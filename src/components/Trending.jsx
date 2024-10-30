import React, { useEffect, useState } from "react";
import Topnav from "./templates/Topnav";
import Sidenav from "./templates/sidenav";
import { useNavigate } from "react-router-dom";
import Dropdown from "./templates/Dropdown";
import axios from "../utils/axios";
import Card from "./templates/Card";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // To control the loading more logic

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}`, {
        params: { page },
      });

      // If there are results, append them to trending, otherwise set hasMore to false
      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results]);
        setPage((prevPage) => prevPage + 1); // Increment page for the next fetch
      } else {
        setHasMore(false); // No more data to load
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    // Resetting trending data and page on category or duration change
    setTrending([]);
    setPage(1);
    setHasMore(true); // Reset the hasMore state
    getTrending();
  }, [category, duration]); // Dependencies trigger fetch on change

  return (
    <>
      <Sidenav />
      <div
        className="w-[80%] h-full overflow-auto overflow-x-hidden scrollbar-custom"
        id="scrollableDiv"
      >
        <Topnav />
        <div className="w-full px-10 py-5">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold flex items-end gap-3">
              <i
                className="ri-arrow-left-line text-2xl hover:text-[#7463df]"
                onClick={() => navigate(-1)}
              ></i>
              Trending
            </h1>
            <div className="flex gap-2">
              <Dropdown
                options={["all", "movie", "tv"]}
                func={(e) => setCategory(e.target.value)} // Set category on change
                title={"category"}
              />
              <Dropdown
                options={["day", "week"]}
                func={(e) => setDuration(e.target.value)} // Set duration on change
                title={"duration"}
              />
            </div>
          </div>
        </div>
        <div>
          <InfiniteScroll
            loader={<h1>Loading...</h1>}
            dataLength={trending.length}
            next={getTrending}
            hasMore={hasMore}
            className="mt-2 flex flex-wrap gap-5 justify-center items-start shrink-0"
            scrollableTarget="scrollableDiv"
          >
            <Card data={trending} />
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Trending;
