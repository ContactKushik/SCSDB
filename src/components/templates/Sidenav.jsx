import React from 'react'
import { NavLink } from 'react-router-dom';
import "remixicon/fonts/remixicon.css";
const Sidenav = () => {
  return (
    <div className="w-[20%] h-screen bg-zinc-800 border-r-2 border-zinc-600 p-5  flex flex-col overflow-hidden ">
      <h1 className="text-2xl ">
        <i className="ri-tv-fill text-[#6556CD] mr-2"></i>
        <span className="font-bold">SCSDB</span>
      </h1>
      <nav className="flex flex-col text-xl gap-2">
        <h1 className="mt-10 font-semibold mb-2">New Feeds</h1>
        <NavLink to="/trending" className="hover:bg-[#6556CD] hover:text-white p-5 text-zinc-300 rounded-md duration-200">
          <i className="ri-fire-line mr-1"></i>Trending
        </NavLink>
        <NavLink to="/popular" className="hover:bg-[#6556CD] hover:text-white p-5 text-zinc-300 rounded-md duration-200">
          <i className="ri-bard-line mr-1"></i>Popular
        </NavLink>
        <NavLink to="/movies" className="hover:bg-[#6556CD] hover:text-white p-5 text-zinc-300 rounded-md duration-200">
          <i className="ri-movie-2-line mr-2"></i>Movies
        </NavLink>
        <NavLink to="/tv" className="hover:bg-[#6556CD] hover:text-white p-5 text-zinc-300 rounded-md duration-200">
          <i className="ri-tv-2-line mr-1"></i>TV Shows
        </NavLink>
        <NavLink to="/person" className="hover:bg-[#6556CD] hover:text-white p-5 text-zinc-300 rounded-md duration-200">
          <i className="ri-team-line mr-1"></i>People
        </NavLink>
      </nav>
      <hr className="border-[1px] border-zinc-700" />
      <nav className="flex flex-col  gap-2 text-xl">
        <h1 className="mt-5 font-semibold ">Know Us</h1>
        <NavLink to='/about' className="hover:bg-[#6556CD] hover:text-white px-5 py-3 text-zinc-300 rounded-md duration-200">
          <i className="mr-1 ri-information-2-line"></i>About
        </NavLink>
        <NavLink to="/contact" className="hover:bg-[#6556CD] hover:text-white px-5 text-zinc-300 rounded-md duration-200 py-3">
          <i className="ri-customer-service-2-line mr-1"></i>Contact Us
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidenav