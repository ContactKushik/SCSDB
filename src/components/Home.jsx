import React, { useEffect, useState } from 'react'
import Sidenav from './templates/sidenav';
import Topnav from './templates/Topnav';
import axios from '../utils/axios';
import Header from './templates/Header';
import { RiH1 } from 'react-icons/ri';
const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const getHeaderwallpaper = async () => {
    try {
      const [moviesResponse, tvResponse] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=YOUR_API_KEY`
        ),
        axios.get(
          `https://api.themoviedb.org/3/trending/tv/day?api_key=YOUR_API_KEY`
        ),
      ]);

      const moviesData = moviesResponse.data;
      const tvData = tvResponse.data;

      // Combine results and choose a random wallpaper
      const combinedTrending = [...moviesData.results, ...tvData.results];
      const randomWallpaper =
        combinedTrending[Math.floor(Math.random() * combinedTrending.length)];

      setWallpaper(randomWallpaper);
      // console.log("Selected Wallpaper Data:", randomWallpaper);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };
  // console.log(wallpaper);

  useEffect(() => {
    (!wallpaper && getHeaderwallpaper());
    // console.log(wallpaper);
  }, []);
  return wallpaper?(
    <>
        <Sidenav/>
        <div className='w-[80%] h-full '>
          <Topnav/>
          <Header data={wallpaper}/>
        </div>
    </>
  ):<h1>Loading</h1>
}

export default Home