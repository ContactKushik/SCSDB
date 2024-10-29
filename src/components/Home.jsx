import React, { useEffect, useState } from 'react'
import Sidenav from './templates/sidenav';
import Topnav from './templates/Topnav';
import axios from '../utils/axios';
import Header from './templates/Header';
import HorizontalCards from './templates/HorizontalCards';
const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [trendingMovie, settrendingMovie] = useState(null);
  const [trendingTv, settrendingTv] = useState(null);
  const getHeaderwallpaper = async () => {
    try {
      const [moviesResponse, tvResponse] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/trending/movie/day`
        ),
        axios.get(
          `https://api.themoviedb.org/3/trending/tv/day`
        ),
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
  const getTrendingMovie = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      
      settrendingMovie(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const getTrendingTv = async () => {
    try {
      const { data } = await axios.get(`/tv/airing_today`);

      settrendingTv(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    (!wallpaper && getHeaderwallpaper());
    (!trendingMovie && getTrendingMovie());
    (!trendingTv && getTrendingTv());
  }, []);
  return wallpaper && trendingMovie ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden scrollbar-custom">
        <Topnav />
        <Header data={wallpaper} />
        <HorizontalCards data={trendingMovie} title={"Trending"} />
        <hr className="border-[1px] border-zinc-700" />
        <HorizontalCards data={trendingTv} title={"Airing Today"} />
      </div>
    </>
  ) : (
    <h1>Loading</h1>
  );
}

export default Home