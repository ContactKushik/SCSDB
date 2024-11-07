import Spline from "@splinetool/react-spline";
import styles from "./Css/About.module.css";
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
        className="md:w-[80%] w-full h-full overflow-auto overflow-x-hidden scrollbar-custom relative"
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
                    "Let's Collabarate",
                    "Buy Me a coffee",
                    "Reach Out to Us!",
                    "Let's Connect and Collaborate",
                    "Have Any Questions?",
                    "We're Here to Help",
                    "Stay in Touch",
                    "Join Our Community",
                    "Follow Us on Social Media",
                    "Send Us Your Feedback",
                    "Let's Grow Together",
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
                🤗FUELED BY GRIT AND CREATIVITY
                <br />
              </h1>
              <h1 className="text-zinc-500 text-3xl font-semibold mt-5">
                KUSHIK
              </h1>
              <div className="flex text-5xl item-end mt-5 gap-10">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/kushik-sahu-b09757191/"
                >
                  <i className="ri-linkedin-box-fill transition-transform duration-200 transform hover:scale-125 hover:text-[#7463df]"></i>
                </a>
                <a target="_blank" href="https://github.com/ContactKushik/">
                  <i className="ri-github-fill transition-transform duration-200 transform hover:scale-125 hover:text-[#7463df]"></i>
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/kushik_sahu/"
                >
                  <i className="ri-instagram-fill transition-transform duration-200 transform hover:scale-125 hover:text-[#7463df]"></i>
                </a>
                <a target="_blank" href="mailto:contactkushik@gmail.com">
                  <i className="ri-mail-fill transition-transform duration-200 transform hover:scale-125 hover:text-[#7463df]"></i>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactUs;
