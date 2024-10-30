import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
    const [query, setquery] = useState("");
    const [searches, setsearches] = useState(null);
    const noimg =
      "https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg";
    const getSearches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`);
            setsearches(data.results);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getSearches();
    }, [query]);

    return (
      <div className="w-full h-[10vh] relative flex justify-center items-center gap-2 ">
        <div className="relative w-[70%]">
          {/* Wrapping icon and input in a flex container */}
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
                onClick={() => setquery("")}
                className="ri-close-large-line absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 cursor-pointer"
              ></i>
            )}
          </div>

          {/* Dropdown div */}
          <div className="z-50 absolute w-full max-h-[50vh] bg-zinc-700 top-[89%] mt-2 rounded shadow-lg overflow-auto scrollbar-custom">
            {searches &&
              searches.map((s, i) => (
                <Link
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
                    <p className="text-sm  font-normal text-zinc-400">
                      {s.overview || "Data not available"}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
};

export default Topnav;
