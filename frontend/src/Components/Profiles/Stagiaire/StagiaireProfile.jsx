import React, { useState } from 'react';
import styles from './StagiaireProfile.module.css';
import SidebarStagiaire from './SidebarStagiaire';
import { Outlet } from 'react-router-dom';

const StagiaireProfile = () => {
  const [collapsed, setCollapsed] = useState(false);

  return ( 
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={`${styles.sideBar} ${collapsed ? styles.collapsed : ''}`}>
          <div className={styles.sideMenu}>
            <SidebarStagiaire 
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            /> 
          </div>
        </div>
        <div className={`${styles.body} ${collapsed ? styles.collapsedBody : ''}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StagiaireProfile;