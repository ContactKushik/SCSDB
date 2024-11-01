import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Card from './templates/Card';
import Dropdown from './templates/Dropdown';
import Sidenav from './templates/Sidenav';
import Topnav from './templates/Topnav';
import Loader from './templates/Loader';

const Popular = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("tv");
    // const [duration, setDuration] = useState("day");
    const [popular, setPopular] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    const getTrending = async () => {
      try {
        const { data } = await axios.get(`/${category}/popular`, {
          params: { page },
        });

        // If there are results, append them to popular, otherwise set hasMore to false
        if (data.results.length > 0) {
            
          setPopular((prev) => [...prev, ...data.results]);
          setPage((prevPage) => prevPage + 1); // Increment page for the next fetch
        } else {
          setHasMore(false); // No more data to load
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    useEffect(() => {
      // Resetting popular data and page on category or duration change
      setPopular([]);
      setPage(1);
      setHasMore(true); // Reset the hasMore state
      getTrending();
    }, [category]);
  return popular ?(
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
              Popular {category.charAt(0).toUpperCase() + category.slice(1)}s
            </h1>
            <div className="flex gap-2">
              <Dropdown
                options={["movie", "tv"]}
                func={(e) => setCategory(e.target.value)}
                title={"category"}
              />
            </div>
          </div>
        </div>
        <div>
          <InfiniteScroll
            loader={<h1>Loading...</h1>}
            dataLength={popular.length}
            next={getTrending}
            hasMore={hasMore}
            className=""
            scrollableTarget="scrollableDiv"
          >
            <Card data={popular} />
          </InfiniteScroll>
        </div>
      </div>
    </>
  ):(<Loader/>);
}

export default Popular