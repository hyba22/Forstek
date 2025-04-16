import React, { useState } from 'react';
import styles from './PartenaireProfile.module.css';
import { Outlet } from 'react-router-dom';
import SideBarPartenaire from "./SideBarPartenaire/SideBarPartenaire";


const PartenaireProfile = () => {
  const [collapsed, setCollapsed] = useState(false);

  return ( 
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={`${styles.sideBar} ${collapsed ? styles.collapsed : ''}`}>
          <div className={styles.sideMenu}>
            <SideBarPartenaire 
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

export default PartenaireProfile;