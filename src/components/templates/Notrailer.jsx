// Notrailer.js
import React from 'react'
import styles from './Css/404css.module.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Notrailer = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleGoBack = () => {
    const pathSegments = pathname.split('/')
    pathSegments.pop()
    const newPath = pathSegments.join('/')
    navigate(newPath || '/')
  }

  return (
    <div
      className={`h-screen w-screen flex flex-col justify-center items-center text-left ${styles.notrailerContainer}`}
    >
      <h1 className={`${styles.errorCode} font-semibold`}>404</h1>
      <h1 className={`${styles.errorMessage}`}>UH OH! You're lost.</h1>
      <p className={`${styles.errorDescription}`}>
        THERE IS NO TRAILER AVAILABLE RIGHT NOW
      </p>
      <button className={`${styles.btn}`} onClick={handleGoBack}>
        GO BACK
      </button>
      {/* Animated Balls */}
      <div className={styles.animatedBall1}></div>
      <div className={styles.animatedBall2}></div>
      <div className={styles.animatedBall3}></div>
      <div className={styles.animatedBall4}></div>
    </div>
  )
}

export default Notrailer
