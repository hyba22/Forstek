import React, { useState } from 'react';
import styles from './porteurProfile.module.css';
import SideBarProjet from './SideBarProjet/SideBarProjet';
import { Outlet } from 'react-router-dom';

const PorteurProfile = () => {
  const [collapsed, setCollapsed] = useState(false);

  return ( 
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={`${styles.sideBar} ${collapsed ? styles.collapsed : ''}`}>
          <div className={styles.sideMenu}>
            <SideBarProjet 
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

export default PorteurProfile;