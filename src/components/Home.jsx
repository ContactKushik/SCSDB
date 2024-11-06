import React, { useEffect, useState } from "react";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import axios from "../utils/axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loader from "./templates/Loader";

const Home = () => {
  document.title = "📺SCSDB | Home";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");
  const [isSidenavVisible, setIsSidenavVisible] = useState(true);

  const getHeaderWallpaper = async () => {
    try {
      const [moviesResponse, tvResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/trending/movie/day`),
        axios.get(`https://api.themoviedb.org/3/trending/tv/day`),
      ]);
      const combinedTrending = [
        ...moviesResponse.data.results,
        ...tvResponse.data.results,
      ];
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
    getTrending();
  }, [category]);

  useEffect(() => {
    const handleResize = () => setIsSidenavVisible(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    handleResize(); // Run initially
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return wallpaper && trending ? (
    <>
      {isSidenavVisible && <Sidenav />}
      <div
        className={`h-full overflow-auto overflow-x-hidden scrollbar-custom ${
          isSidenavVisible ? "w-[80%]" : "w-full"
        } md:w-[80%]`} // Ensures same width on laptops as the second code
      >
        <Topnav />
        <Header data={wallpaper} />
        <div className="flex flex-col md:flex-row justify-between p-5 gap-4 md:gap-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-300">
            Trending
          </h1>
          <Dropdown
            title="filter"
            options={["all", "tv", "movie"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="px-3 md:px-5">
          <HorizontalCards data={trending} />
        </div>
        <hr className="border-[1px] border-zinc-700 mt-4" />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Home;
