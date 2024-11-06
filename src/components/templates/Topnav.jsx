import axios from '../../utils/axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import 'remixicon/fonts/remixicon.css' // Ensure remix icons are available
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'

const Topnav = () => {
  const [query, setquery] = useState('')
  const [searches, setsearches] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false) // state for hamburger menu
  const noimg =
    'https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`)
      setsearches(data.results)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    getSearches()
  }, [query])

  // Animation for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        '.mobile-menu-item',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 }
      )
    }
  }, [isMenuOpen])

  const navigate = useNavigate()

  return searches ? (
    <div className="sticky top-0 z-50 w-full h-[10vh] flex items-center justify-between px-4 md:px-10 bg-zinc-800">
      {/* TV Icon on the left side */}
      <div
        className="text-2xl text-[#6556CD] block md:hidden"
        onClick={() => navigate('/')}
      >
        <i className="ri-tv-line"></i>
      </div>

      {/* Centered Search Bar */}
      <div className="relative w-full max-w-md mx-4 md:mx-8">
        <div className="flex items-center relative">
          <i className="ri-search-2-line text-2xl absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 min-w-[2rem]"></i>
          <input
            value={query}
            onChange={(e) => setquery(e.target.value)}
            type="text"
            className="bg-zinc-700 w-full text-lg text-zinc-200 p-2 pl-10 md:pl-12 rounded-md border-none outline-none"
            placeholder="Search..."
          />
          {query.length > 0 && (
            <i
              onClick={() => setquery('')}
              className="ri-close-line absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 cursor-pointer"
            ></i>
          )}
        </div>

        {/* Dropdown div */}
        {query.length > 0 && (
          <div className="z-50 absolute w-full max-h-[50vh] bg-zinc-700 top-[89%] mt-2 rounded shadow-lg overflow-auto scrollbar-custom">
            {searches &&
              searches.map((s, i) => (
                <Link
                  to={`/${s.media_type}/details/${s.id}`}
                  key={i}
                  className="w-[100%] p-2 flex justify-start items-start border-2 border-zinc-400 rounded hover:bg-zinc-800 font-semibold duration-200 gap-5"
                >
                  <img
                    src={
                      s.poster_path || s.backdrop_path || s.profile_path
                        ? `https://image.tmdb.org/t/p/original/${
                            s.poster_path || s.backdrop_path || s.profile_path
                          }`
                        : noimg
                    }
                    alt=""
                    className="h-[100px] object-cover rounded-md"
                  />
                  <div>
                    <span>
                      {s.title || s.name || s.original_title || s.original_name}
                    </span>
                    <p className="text-sm font-normal text-zinc-400">
                      {s.overview || 'Data not available'}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>

      {/* Hamburger Menu Icon for Mobile */}
      <div
        className="text-2xl md:hidden cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className={isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[10vh] right-0 w-full   bg-zinc-800 md:hidden flex justify-around items-start p-3 gap-4 shadow-lg ">
          <div className="left flex flex-col gap-3">
            <h1 className="text-[#6556CD]">New Feeds</h1>
            <Link
              to="/trending"
              className="mobile-menu-item text-lg text-zinc-300 hover:text-white"
            >
              <i className="ri-fire-line mr-1"></i>Trending
            </Link>
            <Link
              to="/popular"
              className="mobile-menu-item text-lg text-zinc-300 hover:text-white"
            >
              <i className="ri-bard-line mr-1"></i>Popular
            </Link>
            <Link
              to="/movies"
              className="mobile-menu-item text-lg text-zinc-300 hover:text-white"
            >
              <i className="ri-movie-2-line mr-1"></i>Movies
            </Link>
            <Link
              to="/tv"
              className="mobile-menu-item text-lg text-zinc-300 hover:text-white"
            >
              <i className="ri-tv-2-line mr-1"></i>TV Shows
            </Link>
            <Link
              to="/person"
              className="mobile-menu-item text-lg text-zinc-300 hover:text-white"
            >
              <i className="ri-team-line mr-1"></i>People
            </Link>
          </div>
          <div className="right flex flex-col gap-3">
            <h1 className="text-[#6556CD]">Know Us</h1>
            <Link
              to="/about"
              className="mobile-menu-item text-lg text-zinc-300 hover:text-white"
            >
              <i className="ri-information-2-line mr-1"></i>About
            </Link>
            <Link
              to="/contact"
              className="mobile-menu-item text-lg text-zinc-300 hover:text-white"
            >
              <i className="ri-customer-service-2-line mr-1"></i>Contact Us
            </Link>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Loader />
  )
}

export default Topnav
