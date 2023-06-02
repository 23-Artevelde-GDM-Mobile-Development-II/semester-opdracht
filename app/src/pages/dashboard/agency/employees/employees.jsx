import React, { useEffect, useState } from 'react';
import styles from './employees.module.css';
import DashboardAccountSidebar from '../../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar';
import SIDEBAR_NAV_ITEMS from '../../../../consts/sidebarNavItems';
import RegularTable from '../../../../components/Global/tables/regularTable/regularTable';
import PopupSearch from '../../../../components/Global/popups/popupSearch/popupSearch';
import { useRealEstateAgentContext } from '../../../../contexts/RealEstateAgent';
import useFetch from '../../../../hooks/useFetch';
import Loading from '../../../../components/Global/loading/loading';
// import GridCards from '../../../../components/Global/grid/gridCards/gridCards';
// import RealEstateCard from '../../../../components/Global/cards/realEstateCard/realEstateCard';
// import PrimaryBtnLink from '../../../../components/Global/btns/primaryBtnLink/primaryBtnLink';
// import ROUTES from '../../../../consts/routes';

function EmployeesTable({userStatus}) {
    // const [isSearchPopUpOpen, setIsSearchPopUpOpen] = useState();
    // const {realEstateAgencyData} = useRealEstateAgentContext();
    const [employeeData, setEmployeeData] = useState([]);
    const {
        isLoading,
        error,
        invalidate,
        data
    } = useFetch(`/realEstateAgencies/own/employees`);

    

    useEffect(() => {
        if (data) {
          const formattedData = data.map((employee) => [
            employee._id,
            employee.firstname,
            employee.lastname,
            employee.email,
            employee.phoneNr
          ]);
          setEmployeeData(formattedData);
        }
    }, [data]);


    // /realEstateAgencies/own/employees
    function openPopup() {
        document.querySelector('dialog').showModal();
        
    }

    if(isLoading){
        return <Loading/>
    }else{

        if(data){
            console.log(data, 'Employees');
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

                    {
                        error ? 
                        <p>{error}</p>

                        :

                        <main className={styles.employeesContainer}>
                            <div className={styles.justifyBetween}>
                                <h1>Werknemers van dit immokantoor</h1>
        
                                <button className={styles.secondaryBtn} onClick={openPopup}>Nieuw</button>
                            </div>
                        
    
                            <RegularTable columnNames={["voornaam", "Achternaam", "Email", "Telefoon nummer"]} data={employeeData} removeOnly={true} usersTable={false} deleteAction={"deleteEmployee"}/>
    
                        </main>

                    }
    
                    
                </div>
            </div>
        );
    }
    
}

export default EmployeesTable;