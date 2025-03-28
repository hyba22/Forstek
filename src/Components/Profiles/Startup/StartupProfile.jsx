import React from 'react'
import styles from './startupProfile.module.css'


const StartupProfile = () => {
  return ( 
    <div className={styles.container}>
      <div className={styles.subContainer}>
      <div className={styles.sideBar}>
       <div className={styles.sideMenu}>
       hi from startup profile 
       </div>
      </div>
      <div className={styles.body}>
        body
      </div>
      </div>
    </div>
  )
}

export default StartupProfile
