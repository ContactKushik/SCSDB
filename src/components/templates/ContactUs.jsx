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
        
            
          
      </div>
    </>
  );
};

export default ContactUs;
