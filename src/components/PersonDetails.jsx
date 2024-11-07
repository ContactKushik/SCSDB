import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removePerson } from "../store/actions/personActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./templates/Loader";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";

const PersonDetails = () => {
  const noimg =
    "https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg";
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removePerson(id));
    };
  }, [dispatch, id]);

  const { info } = useSelector((state) => state.person);

  const [category, setCategory] = useState("movie");

  return info ? (
    <>
      <Sidenav />
      <div className="w-full sm:w-[80%] overflow-auto overflow-x-hidden scrollbar-custom px-4 sm:px-10">
        <div className="flex items-center mb-4 bg-zinc-800 rounded md:bg-transparent">
          <h1 className="text-3xl font-semibold flex items-center gap-3">
            <i
              className="ri-arrow-left-line text-2xl hover:text-[#7463df]"
              onClick={() => navigate("/")}
            ></i>
            <span className="hidden md:block">Person</span>
          </h1>
          <Topnav />
        </div>

        {/* Mobile-friendly layout */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* Sticky Information Div for large screens */}
          <div className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0 lg:sticky lg:top-0 md:h-[calc(100vh-80px)] overflow-auto">
            <img
              src={
                info.details.profile_path
                  ? `https://image.tmdb.org/t/p/original/${info.details.profile_path}`
                  : noimg
              }
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              alt={info.details.name}
            />
            <div className="flex flex-wrap items-center gap-2 mt-4 justify-center md:justify-start">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/name/${info.externalid.imdb_id}`}
                className="inline-block"
              >
                <img
                  src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png"
                  alt={`${info.details.name} on IMDb`}
                  className="h-6"
                />
              </a>
              {info.externalid?.facebook_id && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.facebook.com/${info.externalid.facebook_id}`}
                  className="text-2xl"
                >
                  <i className="ri-facebook-circle-fill"></i>
                </a>
              )}
              {info.externalid?.twitter_id && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://twitter.com/${info.externalid.twitter_id}`}
                  className="text-2xl"
                >
                  <i className="ri-twitter-x-line"></i>
                </a>
              )}
              {info.externalid?.instagram_id && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.instagram.com/${info.externalid.instagram_id}`}
                  className="text-2xl"
                >
                  <i className="ri-instagram-line"></i>
                </a>
              )}
              {info.externalid?.wikidata_id && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
                  className="inline-block"
                >
                  <img
                    src="/wikipedia.ico"
                    alt="Wikipedia link"
                    className="h-6"
                  />
                </a>
              )}
            </div>
            <div className="mt-4 space-y-2 text-sm md:text-base">
              <p>
                <span className="text-zinc-300 font-semibold">Known For:</span>{" "}
                {info.details.known_for_department}
              </p>
              <p>
                <span className="text-zinc-300 font-semibold">Gender:</span>{" "}
                {info.details.gender === 1 ? "Female" : "Male"}
              </p>
              <p>
                <span className="text-zinc-300 font-semibold">Birthday:</span>{" "}
                {info.details.birthday}
              </p>
              {info.details.deathday && (
                <p>
                  <span className="text-zinc-300 font-semibold">Deathday:</span>{" "}
                  {info.details.deathday}
                </p>
              )}
              {info.details.place_of_birth && (
                <p>
                  <span className="text-zinc-300 font-semibold">
                    Place of Birth:
                  </span>{" "}
                  {info.details.place_of_birth}
                </p>
              )}
            </div>
          </div>

          {/* Content Section for mobile and larger screens */}
          <div className="md:w-2/3 lg:w-3/4">
            <h1 className="text-3xl md:text-5xl font-black mb-4">
              {info.details.name}
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-400 mt-5 mb-2">
              Biography
            </h2>
            <p className="text-sm md:text-base mb-6">
              {info.details.biography}
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-zinc-400 mb-3">
              Known For
            </h2>
            <div className="mb-6">
              <HorizontalCards data={info.combinedCredits.cast} />
            </div>

            <div className="mb-6">
              <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <h2 className="text-xl md:text-2xl text-zinc-400 font-semibold">
                  Acting
                </h2>
                <Dropdown
                  options={["tv", "movie"]}
                  func={(e) => setCategory(e.target.value)}
                  title="movie"
                />
              </div>
              <div className="list-disc w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-zinc-200 border-zinc-500 p-5 text-zinc-400 scrollbar-custom">
                {info[category + "Credits"].cast.map((c, i) => (
                  <li
                    className="hover:text-white duration-300 cursor-pointer hover:bg-zinc-900 rounded p-3 md:p-5 mb-2"
                    key={i}
                  >
                    <Link to={`/${category}/details/${c.id}`}>
                      <span className="font-semibold">
                        {c.title ||
                          c.name ||
                          c.original_title ||
                          c.original_name}
                      </span>
                      {c.character && (
                        <span className="block text-sm mt-1 text-zinc-500">
                          Character: {c.character}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default PersonDetails;
