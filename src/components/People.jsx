import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidenav from "./templates/Sidenav";
import axios from "../utils/axios";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./templates/Card";
import Loader from "./templates/Loader";

const People = () => {
  document.title = "SCSDB | People";
  const navigate = useNavigate();
    const [category, setCategory] = useState("popular");
    // const [duration, setDuration] = useState("day");
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    const getMovie = async () => {
      try {
        const { data } = await axios.get(`/person/${category}`, {
          params: { page },
        });

        // If there are results, append them to people, otherwise set hasMore to false
        if (data.results.length > 0) {
         
          setPeople((prev) => [...prev, ...data.results]);
          setPage((prevPage) => prevPage + 1); // Increment page for the next fetch
        } else {
          setHasMore(false); // No more data to load
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    useEffect(() => {
      // Resetting people data and page on category or duration change
      setPeople([]);
      setPage(1);
      setHasMore(true); // Reset the hasMore state
      getMovie();
    }, [category]);
  return people? (
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
                onClick={() => navigate("/")}
              ></i>
              Celebrity
              <span className="text-zinc-600">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </h1>
            
          </div>
        </div>
        <div>
          <InfiniteScroll
            loader={<h1>Loading...</h1>}
            dataLength={people.length}
            next={getMovie}
            hasMore={hasMore}
            
            scrollableTarget="scrollableDiv"
          >
            <Card data={people} title="person"/>
          </InfiniteScroll>
        </div>
      </div>
    </>
    ):(<Loader/>)
};

export default People;
