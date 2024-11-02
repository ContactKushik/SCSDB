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
  console.log(info);
  const [category, setCategory] = useState("movie");
  return info ? (
    <>
      <Sidenav />
      <div className="w-[80%] overflow-auto overflow-x-hidden scrollbar-custom px-10">
        <div className="flex items-center mb-4">
          <h1 className="text-3xl font-semibold flex items-center gap-3">
            <i
              className="ri-arrow-left-line text-2xl hover:text-[#7463df]"
              onClick={() => navigate("/")}
            ></i>
            Person
          </h1>
          <Topnav />
        </div>
        <div className="flex gap-5">
          {/* Sticky Information Div */}
          <div className="flex flex-col shrink-0 information sticky top-0 z-10  h-[calc(100vh-80px)] overflow-auto">
            {" "}
            {/* Set a height for the sticky section */}
            <img
              src={
                info.details.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      info.details.poster_path ||
                      info.details.backdrop_path ||
                      info.details.profile_path
                    }`
                  : noimg
              }
              className="w-[32vh] object-cover"
              alt=""
            />
            <div className="flex items-center gap-5 mt-2 overflow-x-auto overflow-y-hidden">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/name/${info.externalid.imdb_id}`}
              >
                <img
                  src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png"
                  alt={`${info.details.title || "Movie"} on IMDb`}
                />
              </a>
              {info.external_id?.facebook_id && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.facebook.com/${info.external_id.facebook_id}`}
                >
                  <i className="ri-facebook-circle-fill text-2xl"></i>
                </a>
              )}
              {info.external_id?.twitter_id && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://twitter.com/${info.external_id.twitter_id}`}
                >
                  <i className="ri-twitter-x-line text-2xl"></i>
                </a>
              )}
              {info.externalid?.instagram_id && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.instagram.com/${info.externalid.instagram_id}`}
                >
                  <i className="ri-instagram-line text-2xl"></i>
                </a>
              )}
              {info.externalid?.wikidata_id && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
                >
                  <img
                    src="/wikipedia.ico"
                    alt="Wikipedia link"
                    className="h-6"
                  />
                </a>
              )}
            </div>
            <h2 className="mt-3 text-xl text-zinc-400 font-semibold">
              <span className="text-zinc-300 font-normal text-sm">
                Known For{" "}
              </span>
              <br />
              {info.details.known_for_department}
            </h2>
            <h2 className="text-xl text-zinc-400 font-semibold">
              <span className="text-zinc-300 font-normal text-sm">Gender </span>
              <br />
              {info.details.gender === 1 ? "Female" : "Male"}
            </h2>
            <h2 className="text-xl text-zinc-400 font-semibold">
              <span className="text-zinc-300 font-normal text-sm">
                Birthday{" "}
              </span>
              <br />
              {info.details.birthday}
            </h2>
            {info.details.deathday && (
              <h2 className="text-xl text-zinc-400 font-semibold">
                <span className="text-zinc-300 font-normal text-sm">
                  Deathday{" "}
                </span>
                <br />
                {info.details.deathday}
              </h2>
            )}
            {info.details.place_of_birth && (
              <h2 className="text-xl text-zinc-400 font-semibold">
                <span className="text-zinc-300 font-normal text-sm">
                  Place of Birth
                </span>
                <br />
                {info.details.place_of_birth}
              </h2>
            )}
          </div>

          {/* Scrollable Content Section */}
          <div className="flex flex-col w-full h-[calc(100vh-80px)] overflow-y-auto scrollbar-custom">
            {" "}
            {/* Ensure the right section is scrollable */}
            <h1 className="text-5xl font-black">{info.details.name}</h1>
            <h1 className="text-2xl font-bold text-zinc-400 mt-5">Biography</h1>
            <p className="mt-2 break-words w-[80%]">{info.details.biography}</p>
            {/* Wrap Known For and HorizontalCards in a container */}
            <h1 className="text-2xl font-bold text-zinc-400 mb-3 mt-3">
              Known For
            </h1>
            <div>
              <HorizontalCards data={info.combinedCredits.cast} />
            </div>
            <div>
              <div className="w-full flex justify-between mt-5 pb-10">
                <h1 className="mt-5 text-2xl text-zinc-400 font-semibold">
                  Acting
                </h1>
                <Dropdown
                  options={["tv", "movie"]}
                  func={(e) => setCategory(e.target.value)}
                  title="movie"
                />
              </div>
              <div className="list-disc w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-zinc-200 border-zinc-500 p-5 text-zinc-400 scrollbar-custom">
                {info[category + "Credits"].cast.map((c, i) => (
                  <li className="hover:text-white duration-300 cursor-pointer hover:bg-zinc-900 rounded  p-5" key={i}>
                    <Link to={`/${category}/details/${c.id}`}>
                      <span >
                        {c.title ||
                          c.name ||
                          c.original_title ||
                          c.original_name}
                      </span>
                      <span className="block ml-5 mt-2">{
                        c.character && `Character Name:${c.character}`
                        }</span>
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
