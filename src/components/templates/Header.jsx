import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
    
  const noimg =
    "https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg";

  return (
    <div
      className="w-full h-1/2 flex flex-col justify-end p-10 items-start"
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(${
          data.backdrop_path || data.profile_path
            ? `https://image.tmdb.org/t/p/original/${
                data.backdrop_path || data.profile_path
              }`
            : noimg
        })`,
        backgroundPosition: "top 100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-5xl font-bold text-zinc-100 flex items-end">
        {data.title || data.name || data.original_title || data.original_name}
      </h1>
      <p className="w-1/2 mt-2 text-zinc-400">
        {data.overview
          ? `${data.overview.slice(0, 200)}...`
          : "Data not available"}{" "}
        <Link className="text-blue-500">more</Link>
      </p>
      
      <p className="mt-2">
        {data.media_type === "movie" && data.release_date && (
          <>
            <i className="ri-megaphone-fill text-yellow-500 mr-1"></i>
            {data.release_date}
            &nbsp;&nbsp;
          </>
        )}
        {data.media_type === "movie" ? (
          <>
            <i className="ri-film-line mr-1"></i>
            MOVIE
          </>
        ) : (
          <>
            <i className="ri-slideshow-2-line mr-1"></i>
            T.V.
          </>
        )}
      </p>
      <Link className="mt-3 p-2 bg-[#6556CD] rounded flex items-center font-sm font-semibold ">
        <i className="ri-play-circle-fill text-2xl font-normal"></i>&nbsp;Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
