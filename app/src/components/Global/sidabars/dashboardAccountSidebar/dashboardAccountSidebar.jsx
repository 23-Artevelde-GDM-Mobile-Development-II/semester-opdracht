import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './dashboardAccountSidebar.module.css';
import { useAuthContext } from '../../../../contexts/AuthContainer';


function DashboardAccountSidebar({navItems, activeItem}) {
    const [showSidebar, setShowSidebar] = useState(false);
    const {logout} = useAuthContext();
    return (

        <div className={styles.sidebar}>
        
            <ul>
                {
                    navItems.map((navItem)=>{
                        return (
                            // <Link to={navItem[1]} key={navItem[0]}><li className={`p-4 hover:bg-primair-blue hover:text-white duration-300 ${activeItem === navItem[0] ? 'bg-primair-blue text-white' : ''}`}>{navItem[0]}</li></Link>
                            <Link to={navItem[1]} key={navItem[0]}><li className={`${styles.navItem} ${activeItem === navItem[0] && styles.activeNavItem}`}>{navItem[0]}</li></Link>
                        )
                    })
                }

                <li className={styles.navItem} onClick={logout}>Uitloggen</li>
            </ul>

            <button onClick={() => setShowSidebar(!showSidebar)} className={`md:hidden bg-primair-blue py-2 px-4 h-fit z-10 -rotate-90 ${showSidebar? 'left-[75.2%]':  'left-[-6%]'} top-[50%] rounded-b-lg text-white fixed hover:bg-blue-700 duration-150`}>Sidebar</button>
        </div>
    )
}

export default DashboardAccountSidebar;