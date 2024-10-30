import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({data}) => {
    const noimg =
      "https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg";
  return (
    <>
      <div className="mt-2 flex flex-wrap gap-5 justify-center items-start shrink-0 overflow-x-hidden">
        {data.map((c, i) => (
          <Link key={i} className="w-[30vh] flex-none shrink-0 relative">
            <img
              src={
                c.poster_path || c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      c.poster_path || c.backdrop_path || c.profile_path
                    }`
                  : noimg
              }
              className="w-[30vh] object-cover"
              alt=""
            />
            {c.vote_average && (
              <div className="absolute right-[-8%] bottom-[75%] rounded-full text-xl font-semibold bg-[#6556CD] text-white w-[8vh] h-[8vh] flex justify-center items-center shadow-lg shadow-zinc-800 z-30">
                {(c.vote_average * 10).toFixed()}
                <sup className="text-sm font-bold">%</sup>
              </div>
            )}
            <h1 className="text-xl text-zinc-400 font-semibold">
              {c.title || c.name || c.original_title || c.original_name}
            </h1>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Card