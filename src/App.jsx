import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movies from "./components/Movies";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import About from "./components/templates/About";
import ContactUs from "./components/templates/ContactUs";
import MovieDetails from "./components/MovieDetails";
import TvDetails from "./components/TvDetails";
import PersonDetails from "./components/PersonDetails";
import Trailer from "./components/templates/Trailer";
import Notfound from "./components/templates/Notfound";

const App = () => {
  return (
    <div className="w-[100%] h-screen bg-zinc-800 flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} >
          <Route path="/movie/details/:id/trailer" element={<Trailer/>} />
        </Route>
        {/* Moved this out */}
        <Route path="/tv" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<TvDetails />} >
          <Route path="/tv/details/:id/trailer" element={<Trailer/>}/>
        </Route>
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/*" element={<Notfound/>}/>
      </Routes>
    </div>
  );
};

export default App;
