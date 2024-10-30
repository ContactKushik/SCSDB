import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'

const App = () => {
  return (
    <div className="w-[100%] h-screen bg-zinc-800 flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/popular" element={<Popular />}></Route>
      </Routes>
    </div>
  );
}

export default App