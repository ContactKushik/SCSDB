import Spline from "@splinetool/react-spline";
import styles from "./Css/Contact.module.css";
import Sidenav from "./Sidenav";
import Topnav from "./Topnav";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader";



const ContactUs = () => {
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
          scene="https://prod.spline.design/WMUjmqPkum-VvSgs/scene.splinecode"
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
            
          </div>
        )}
      </div>
    </>
  );
};

export default ContactUs;
