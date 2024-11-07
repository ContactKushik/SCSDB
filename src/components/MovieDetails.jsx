import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removeMovie } from "../store/actions/movieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "./templates/Loader";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import HorizontalCards from "./templates/HorizontalCards";
import HorizontalCast from "./templates/HorizontalCast";

const MovieDetails = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const noimg =
    'https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'

  useEffect(() => {
    dispatch(asyncloadmovie(id))
    return () => {
      dispatch(removeMovie(id))
    }
  }, [dispatch, id])

  const { info } = useSelector((state) => state.movie)

  useEffect(() => {
    if (info && info.externalid && info.externalid.imdb_id) {
      const existingScript = document.getElementById('imdb-rating-api')
      if (existingScript) existingScript.remove()

      const script = document.createElement('script')
      script.src =
        'https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js'
      script.id = 'imdb-rating-api'
      script.async = true

      document.body.appendChild(script)
    }
  }, [info && info.externalid && info.externalid.imdb_id])

  if (!info) {
    return <Loader />
  }

  const backgroundUrl =
    info.details.backdrop_path || info.details.profile_path
      ? `https://image.tmdb.org/t/p/original/${
          info.details.backdrop_path || info.details.profile_path
        }`
      : noimg

  return (
    <>
      <Sidenav />
      <div
        className="relative  h-full overflow-auto overflow-x-hidden scrollbar-custom md:w-[80%]"
        style={{
          background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(${backgroundUrl})`,
          backgroundPosition: "top 100%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="md:hidden flex items-center bg-zinc-800 rounded md:bg-transparent  sm:hidden px-2 z-40 fixed ">
          <h1 className="text-3xl font-semibold flex items-center gap-3 ">
            <i
              className="ri-arrow-left-line text-2xl hover:text-[#7463df]"
              onClick={() => navigate("/")}
            ></i>
          </h1>
          <Topnav />
        </div>
        <div className="w-full px-4 md:py-5 md:px-10 pt-20">
          
          
          <div className="hidden md:flex items-center mb-4 bg-zinc-800 rounded bg-transparent">
            <h1 className="text-3xl font-semibold flex items-center gap-3 ">
              <i
                className="ri-arrow-left-line text-2xl hover:text-[#7463df]"
                onClick={() => navigate("/")}
              ></i>
              <span className="hidden md:block">Movie</span>
            </h1>
            <Topnav />
          </div>
          <hr className="border-[1px] border-zinc-700 mt-5 mb-5" />
         
          <div className="flex flex-col md:flex-row md:gap-10 ">
            <img
              src={
                info.details.poster_path ||
                info.details.backdrop_path ||
                info.details.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      info.details.poster_path ||
                      info.details.backdrop_path ||
                      info.details.profile_path
                    }`
                  : noimg
              }
              className="w-[38vh] object-cover md:mt-2 md:w-[38vh] sticky"
              alt=""
            />
            <div className="flex flex-col w-full">
              <h1 className="text-5xl font-bold text-zinc-100 md:mt-4 flex items-end gap-5 shadow-md shadow-zinc-800 w-fit">
                {info.details.title ||
                  info.details.name ||
                  info.details.original_title ||
                  info.details.original_name}
                <small className="text-normal text-2xl text-zinc-300">
                  ({info.details.release_date.split("-")[0]})
                </small>
              </h1>

              <h1 className="italic mt-5 text-2xl text-zinc-400 font-semibold">
                {info.details.tagline}
              </h1>

              {/* User Score and Info */}
              <div className="flex pt-5 px-0 gap-2 h-fit items-center">
                {info.details.vote_average && (
                  <div className="flex-shrink-0 rounded-full text-xl font-semibold bg-[#6556CD] gap-[-10px] text-white w-[8vh] h-[8vh] flex justify-center items-center shadow-lg shadow-zinc-800 z-3">
                    {(info.details.vote_average * 10).toFixed()}
                    <sup className="text-sm font-bold">%</sup>
                  </div>
                )}
                <h3 className="font-semibold flex flex-col gap-[1px] leading-1">
                  <span>User</span>
                  <span>Score</span>
                </h3>
                <h3 className="ml-5">Release: {info.details.release_date}</h3>
                <h3>{info.details.genres.map((g) => g.name).join(", ")}</h3>
                <h3>{info.details.runtime} min</h3>
              </div>

              {/* Overview Section */}
              <h1 className="mt-5 text-sm text-zinc-300 max-w-full overflow-hidden break-words">
                <span className="text font-semibold text-zinc-500">
                  Overview:
                </span>{" "}
                {info.details.overview}
              </h1>

              {/* Translations Section */}
              <h6 className="text-sm max-w-full overflow-hidden break-words mt-1">
                {info.translations.join(", ")}
              </h6>
              {info.videos ? (
                <Link
                  to={`${pathname}/trailer`}
                  className="mt-5 bg-[#6556CD] w-fit px-5 py-2 rounded-md flex items-center"
                >
                  <i className="ri-play-circle-fill text-3xl font-normal"></i>
                  &nbsp; Play Trailer
                </Link>
              ) : (
                <h1 className="text-xl bg-zinc-800 w-fit px-3 py-2 rounded text-zinc-400 mt-5">
                  No Trailer Available
                </h1>
              )}
            </div>
          </div>
          {/* External Links */}
          <div className="mt-4 flex items-center gap-4">
            {info.externalid?.imdb_id && (
              <span
                className="imdbRatingPlugin"
                data-user="ur190867126"
                data-title={info.externalid.imdb_id}
                data-style="p1"
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
                >
                  <img
                    src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png"
                    alt={`${info.details.title || "Movie"} on IMDb`}
                  />
                </a>
              </span>
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
                  className="h-8"
                />
              </a>
            )}
            {info.details.homepage && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={info.details.homepage}
              >
                <i className="ri-external-link-fill text-3xl"></i>
              </a>
            )}
          </div>
          {/* Watch Providers */}
          {info.watchproviders &&
            info.watchproviders.flatrate &&
            info.watchproviders?.flatrate.length > 0 && (
              <div className="flex gap-2 h-[10vh] mt-5">
                {info.watchproviders.flatrate.map((w, i) => (
                  <img
                    key={i}
                    className="object-cover"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    alt={`Watch provider logo ${i}`}
                  />
                ))}
              </div>
            )}
          <hr className="border-[1px] border-zinc-700 mb-5 mt-5" />
          <h1 className="text-3xl font-semibold text-zinc-400 mt-5 mb-3">
            Cast
          </h1>
          {info.cast && info.cast.cast && (
            <HorizontalCast data={info.cast.cast} className="h-fit" />
          )}
          <hr className="border-[1px] border-zinc-700 mb-5 mt-5" />
          <h1 className="text-3xl font-semibold text-zinc-400 mt-5 mb-3" />
          <h1 className="text-3xl font-semibold text-zinc-400 mt-5">
            Recommendation/Similar
          </h1>
          <HorizontalCards
            data={
              info.recommendations.length > 0
                ? info.recommendations
                : info.similar
            }
            className="h-fit"
          />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MovieDetails
