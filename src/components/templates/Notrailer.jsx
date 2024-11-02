import React from "react";
import styles from "./Css/404css.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const Notrailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Function to go back one level in the path
  const handleGoBack = () => {
    const pathSegments = pathname.split("/");
    // Remove the last segment
    pathSegments.pop();
    // Join the remaining segments back into a path
    const newPath = pathSegments.join("/");
    navigate(newPath || "/"); // Navigate to new path or fallback to root
  };

  return (
    <div className="absolute top-0 left-0 bg-zinc-950 h-screen w-screen flex flex-col justify-center items-center text-left">
      <h1 className="text-[35vh] font-semibold">404</h1>
      <h1 className="text-5xl">UH OH! You're lost.</h1>
      <p className="text-2xl w-1/2">THERE IS NO TRAILER AVAILABLE RIGHT NOW</p>
      <button onClick={handleGoBack}>GO BACK</button>
    </div>
  );
};

export default Notrailer;
