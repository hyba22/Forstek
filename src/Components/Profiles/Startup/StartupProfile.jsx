import React from 'react'
import styles from './startupProfile.module.css'
import SideBarStartup from './SideBarStartup/SideBarStartup'
import { Routes, Route } from 'react-router-dom';
import StartupOffres from './SideBarStartup/Pages/StartupOffres'
import StartupEvaluation  from './SideBarStartup/Pages/EvaluationProjets'
import RendezVous from './SideBarStartup/Pages/RendezVous';
import Parametres from './SideBarStartup/Pages/Parametres'

const StartupProfile = () => {
  return ( 
    <div className={styles.container}>
      <div className={styles.subContainer}>
      <div className={styles.sideBar}>
       <div className={styles.sideMenu}>
       <SideBarStartup/> 
       </div>
      </div>
      <div className={styles.body}>
       {/* Define routes to render different components in the body */}
       <Routes>
            <Route path="/startupOffres" element={<StartupOffres />} />
            <Route path="/startupEvaluation" element={<StartupEvaluation />} />
            <Route path="/rendez-vous" element={<RendezVous />} />
            <Route path="/parametres" element={<Parametres />} />
            <Route path="/" element={<div>Welcome to Startup Profile</div>} /> {/* Default route */}
          </Routes>
      </div>
      </div>
    </div>
  )
}

export default StartupProfile
