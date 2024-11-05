import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const HorizontalCards = ({ data, title,fnc }) => {
  const noimg =
    "https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg";
  return (
    <div className="min-h-[40dvh] w-full">
      <div className="w-full flex overflow-x-auto no-scrollbar">
        {data.map((ele, i) => (
          <Link
            to={`/${ele.media_type}/details/${ele.id}`}
            key={i}
            className="min-w-[35dvh] mr-5 min-h-[30dvh] bg-zinc-900 rounded overflow-hidden shadow-lg shadow-zinc-900"
          >
            <img
              src={
                ele.backdrop_path || ele.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      ele.backdrop_path || ele.profile_path || ele.posters_path
                    }`
                  : noimg // Replace with a valid placeholder image path
              }
              alt="Movie or TV Show"
              className="your-css-classes-here  h-[25dvh] object-cover " // Add any necessary CSS classes
            />
            <div className="p-2">
              <h1 className="text-xl font-semibold text-zinc-100 ">
                {ele.title ||
                  ele.name ||
                  ele.original_title ||
                  ele.original_name}
              </h1>
              <p className="mt-2 text-zinc-400">
                {ele.overview
                  ? `${ele.overview.slice(0, 200)}${
                      ele.overview.length > 200 ? "..." : ""
                    }`
                  : "Data not available"}{" "}
                {ele.overview && ele.overview.length > 200 && (
                  <span className="text-blue-500">more</span>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
