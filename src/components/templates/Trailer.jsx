import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import Notfound from './Notfound'

const Trailer = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const category = pathname.includes('movie') ? 'movie' : 'tv'
  const ytvideo = useSelector((state) => state[category].info.videos)

  return ytvideo ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-zinc-900 bg-opacity-75">
      <button
        className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-red-500"
        onClick={() => navigate(-1)}
      >
        ×
      </button>
      <div className="w-full max-w-4xl h-3/4 sm:h-2/5 md:h-1/3 lg:h-2/4 p-2 sm:p-4">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          controls
          width="100%"
          height="100%"
          className="shadow-lg rounded"
        />
      </div>
    </div>
  ) : (
    <Notfound />
  )
}

export default Trailer
