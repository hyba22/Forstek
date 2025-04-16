import React, {useState} from 'react';
import styles from './investisseurProfile.module.css';
import { Outlet } from 'react-router-dom';
import InvestisseurSideBar from './InvestisseurSidebar/InvestisseurSideBar';

const InvestisseurProfile = () => {
  const [collapsed, setCollapsed] = useState(false);

  return ( 
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={`${styles.sideBar} ${collapsed ? styles.collapsed : ''}`}>
          <div className={styles.sideMenu}>
            <InvestisseurSideBar
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
)}

export default InvestisseurProfile
