import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.bars}>
          {[...Array(7)].map((_, i) => (
            <div key={i} className={styles.bar}></div>
          ))}
        </div>
        <div className={styles.bars}>
          {[...Array(7)].map((_, i) => (
            <div key={i} className={styles.bar}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
