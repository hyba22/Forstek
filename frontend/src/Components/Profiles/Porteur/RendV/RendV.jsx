import React from 'react';
import styles from './RendV.module.css';
const RendV = () => {
  return (
    <div className={styles.container}>
      <iframe
        className={styles.calendar}
        src="https://calendly.com/nawressel761/reunion-pour-le-depot-de-projet"
        width="100%"
        height="100%"
        frameBorder="0"
        title="Calendly Scheduling"
      />
    </div>
  );
};

export default RendV;