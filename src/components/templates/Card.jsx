import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({data}) => {
    const noimg =
      "https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg";
  return (
    <>
      {data.map((c, i) => (
        <Link key={i} className="w-[30vh] flex-none shrink-0">
          <img
            src={
              c.poster_path||c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.poster_path||c.backdrop_path || c.profile_path
                  }`
                : noimg
            }
            className="w-[30vh] object-cover"
            alt=""
          />

          {c.title || c.name || c.original_title || c.original_name}
        </Link>
      ))}
    </>
  );
}

export default Card