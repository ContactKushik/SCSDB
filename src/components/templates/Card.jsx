import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data, title }) => {
  const noimg =
    "https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg";

  return (
    <div className="p-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          key={i}
          className="relative block"
        >
          <div className="relative aspect-[2/3]">
            <img
              src={
                c.poster_path || c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${
                      c.poster_path || c.backdrop_path || c.profile_path
                    }`
                  : noimg
              }
              className="w-full h-full object-cover rounded-lg"
              alt=""
            />
            {/* Render the vote badge only if vote_average is available and greater than 0 */}
            {c.vote_average > 0 && (
              <div className="absolute right-1 top-1 rounded-3xl text-sm md:text-xl font-semibold bg-[#6556CD] text-white w-8 h-8 flex justify-center items-center shadow-md md:p-7 p-5">
                {(c.vote_average * 10).toFixed()}%
              </div>
            )}
          </div>
          <h1 className="text-sm md:text-xl mt-1 text-zinc-400 font-semibold line-clamp-1">
            {c.title || c.name || c.original_title || c.original_name}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default Card;
