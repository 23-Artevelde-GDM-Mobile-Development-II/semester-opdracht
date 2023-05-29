import React, { useState } from 'react';
import styles from './employees.module.css';
import DashboardAccountSidebar from '../../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar';
import SIDEBAR_NAV_ITEMS from '../../../../consts/sidebarNavItems';
import RegularTable from '../../../../components/Global/tables/regularTable/regularTable';
import PopupSearch from '../../../../components/Global/popups/popupSearch/popupSearch';
// import GridCards from '../../../../components/Global/grid/gridCards/gridCards';
// import RealEstateCard from '../../../../components/Global/cards/realEstateCard/realEstateCard';
// import PrimaryBtnLink from '../../../../components/Global/btns/primaryBtnLink/primaryBtnLink';
// import ROUTES from '../../../../consts/routes';

function EmployeesTable({userStatus}) {
    // const [isSearchPopUpOpen, setIsSearchPopUpOpen] = useState();

    function openPopup() {
        document.querySelector('dialog').showModal();
        
    }
    return (
        <div>
            {/* Popup to search users that you can add to this agency */}
            <PopupSearch searchUsers={true}/>
            
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <DashboardAccountSidebar 
                    navItems={SIDEBAR_NAV_ITEMS.dashboard.agency}
                    
                    activeItem={'Werknemers'}/>

                </div>

                <main className={styles.employeesContainer}>
                    <div className={styles.justifyBetween}>
                        <h1>Werknemers van dit immokantoor</h1>

                        <button className={styles.secondaryBtn} onClick={openPopup}>Nieuw</button>
                    </div>
                    

                    <RegularTable columnNames={["voornaam", "Achternaam", "Email", "Telefoon nummer"]} data={[["Iris", "Maenhout", "irismaenhout@gmail.com", 12241], ["San", "Choi", "https://ucarecdn.com/cb288972-b141-4509-94ac-02c4dbeb77da/109_1179703_1.jpg", 1312]]} removeOnly={true} usersTable={false}/>

                </main>
            </div>
        </div>
    );
}

export default EmployeesTable;