import Spline from "@splinetool/react-spline";
import styles from "./Css/About.module.css";
import Sidenav from "./Sidenav";
import Topnav from "./Topnav";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader";
export default function About() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Loader component or simple JSX to show while loading
  // const Loader = () => (
  //   <div className="flex justify-center items-center h-full">
  //     <div className="text-4xl font-bold text-[#7463df]">Loading...</div>
  //   </div>
  // );

  return (
    <>
      <Sidenav />
      <div
        className="w-[80%] h-full overflow-auto overflow-x-hidden scrollbar-custom relative"
        id="scrollableDiv"
      >
        {/* Render loader if still loading */}
        {isLoading && <Loader />}

        {/* Spline component with onLoad handler */}
        <Spline
          scene="https://prod.spline.design/vy4ipnmmHHaCnrEC/scene.splinecode"
          className={styles.backgroundSpline}
          onLoad={() => setIsLoading(false)} // Set loading to false when Spline is fully loaded
        />

        {/* Render content only when Spline has loaded */}
        {!isLoading && (
          <div className={`w-full px-10 py-5 ${styles.mainContent} h-full`}>
            <div
              className={`flex justify-between gap-10 items-center ${styles.overlay}`}
            >
              <h1
                className={`text-4xl font-bold flex items-end gap-3 ${styles.text}`}
              >
                <i
                  className="ri-arrow-left-line text-2xl hover:text-[#7463df]"
                  onClick={() => navigate("/")}
                ></i>
                About
              </h1>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center text-center">
              {/* Typing animation for questions */}
              <div className="text-5xl font-semibold mb-6">
                <Typewriter
                  words={[
                    "What to Watch?",
                    "Find your celebrity crush",
                    "Discover your favorite Movie",
                    "Explore Movies from around the globe",
                    "Stay updated with the latest trends",
                    "Dive into endless entertainment",
                    "Discover popular TV Shows",
                    "Explore detailed info on Celebrities",
                    "Explore TV shows from around the globe",
                  ]}
                  loop={0} // Infinite loop
                  cursor
                  cursorStyle="_"
                  typeSpeed={50}
                  deleteSpeed={30}
                  delaySpeed={2500}
                />
              </div>
              {/* Stationary answer below the animated text */}
              <h1 className="text-4xl font-bold text-[#7463df]">
                <i className="ri-tv-fill text-[#6556CD] mr-2"></i>SCSDB,
                <br /> We’ve got you covered!
              </h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
