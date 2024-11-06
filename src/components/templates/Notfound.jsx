// Notfound.js
import React from 'react'
import styles from './Css/404css.module.css'

const Notfound = () => {
  return (
    <div
      className={`h-screen w-screen flex flex-col justify-center items-center text-left ${styles.notfoundContainer}`}
    >
      <h1 className={`${styles.errorCode} font-semibold`}>404</h1>
      <h1 className={`${styles.errorMessage}`}>UH OH! You're lost.</h1>
      <p className={`${styles.errorDescription}`}>
        The page you are looking for does not exist. How you got here is a
        mystery. But you can click the button below to go back to the homepage.
      </p>
      <button
        className={`text-3xl ${styles.btn}`}
        onClick={() => {
          window.location.href = '/'
        }}
      >
        Go Home
      </button>
      {/* Animated Balls */}
      <div className={styles.animatedBall1}></div>
      <div className={styles.animatedBall2}></div>
      <div className={styles.animatedBall3}></div>
      <div className={styles.animatedBall4}></div>
    </div>
  )
}

export default Notfound
