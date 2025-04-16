import React from 'react';
import styles from './rendezvous.module.css';

const RendezVous = () => {
  return (
    <div className={styles.container}>
      <iframe
        className={styles.calendar}
        src="https://calendly.com/bibooo5378/30min"
        width="100%"
        height="100%"
        frameBorder="0"
        title="Calendly Scheduling"
      />
    </div>
  );
};

export default RendezVous;