import React from 'react'
import styles from './Css/404css.module.css'
const Notfound = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center text-left">
      <h1 className="text-[35vh] font-semibold">404</h1>
      <h1 className="text-5xl ">UH OH! You're lost.</h1>
      <p className="text-2xl w-1/2">
        The page you are looking for does not exist. How you got here is a
        mystery. But you can click the button below to go back to the homepage.
      </p>
      <button className={`text-3xl  ${styles.btn}`}>Go Home</button>
    </div>
  );
}

export default Notfound