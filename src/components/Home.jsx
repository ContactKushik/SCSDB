import React, { useEffect, useState } from "react";
import Sidenav from "./templates/sidenav";
import Topnav from "./templates/Topnav";
import axios from "../utils/axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loader from "./templates/Loader";

const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeaderWallpaper = async () => {
    try {
      const [moviesResponse, tvResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/trending/movie/day`),
        axios.get(`https://api.themoviedb.org/3/trending/tv/day`),
      ]);

      const moviesData = moviesResponse.data;
      const tvData = tvResponse.data;
      const combinedTrending = [...moviesData.results, ...tvData.results];
      const randomWallpaper =
        combinedTrending[Math.floor(Math.random() * combinedTrending.length)];
      setWallpaper(randomWallpaper);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (!wallpaper) getHeaderWallpaper();
    getTrending(); // Fetch trending based on current category
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden scrollbar-custom">
        <Topnav />
        <Header data={wallpaper} />
        <div className=" flex justify-between p-5">
          <h1 className="text-3xl font-semibold text-zinc-300">Trending</h1>
          <Dropdown
            title="filter"
            options={["all", "tv", "movie"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
        <hr className="border-[1px] border-zinc-700" />
      </div>
    </>
  ) : (
    <Loader/>
  );
};

export default Home;
