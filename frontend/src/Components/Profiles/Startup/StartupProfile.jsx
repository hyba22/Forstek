import React, { useState } from 'react';
import styles from './startupProfile.module.css';
import SideBarStartup from './SideBarStartup/SideBarStartup';
import { Outlet } from 'react-router-dom';
import ProfileHeader from '../Profile header/ProfileHeader';

const StartupProfile = () => {
  const [collapsed, setCollapsed] = useState(false);

  return ( 
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={`${styles.sideBar} ${collapsed ? styles.collapsed : ''}`}>
          <div className={styles.sideMenu}>
            <SideBarStartup 
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            /> 
          </div>
        </div>
        <div className={`${styles.body} ${collapsed ? styles.collapsedBody : ''}`}>
          <div>          
          </div>
          <Outlet />
        </div>
      </div>
    </div> 
  );
};

export default StartupProfile;