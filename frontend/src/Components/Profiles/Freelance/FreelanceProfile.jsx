import React, {useState} from 'react';
import styles  from './freelanceProfile.module.css';
import FreelanceSideBar from './FreelanceSideBar/FreelanceSideBar';
import { Outlet } from 'react-router-dom';

const FreelanceProfile = () => {
 const [collapsed, setCollapsed] = useState(false);
 
   return ( 
     <div className={styles.container}>
       <div className={styles.subContainer}>
         <div className={`${styles.sideBar} ${collapsed ? styles.collapsed : ''}`}>
           <div className={styles.sideMenu}>
             <FreelanceSideBar 
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
}

export default FreelanceProfile
