import React, { useEffect, useState } from 'react';
import styles from './updateRealEstates.module.css';
import DashboardAccountSidebar from '../../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar';
import SIDEBAR_NAV_ITEMS from '../../../../consts/sidebarNavItems';
import GridCards from '../../../../components/Global/grid/gridCards/gridCards';
import RealEstateCard from '../../../../components/Global/cards/realEstateCard/realEstateCard';
import PrimaryBtnLink from '../../../../components/Global/btns/primaryBtnLink/primaryBtnLink';
import ROUTES from '../../../../consts/routes';
import { useAuthContext } from '../../../../contexts/AuthContainer';
import useFetch from '../../../../hooks/useFetch';
import Loading from '../../../../components/Global/loading/loading';
import { useRealEstateAgentContext } from '../../../../contexts/RealEstateAgent';

function UpdateRealEstates(props) {

    const userStatus = "realEstate";

    const {user} = useAuthContext();
    const {realEstateData} = useRealEstateAgentContext();
    
    const [realEstatesData, setRealEstateData] = useState(realEstateData);

    const {
        isLoading,
        error,
        invalidate,
        data
    } = useFetch(`/realEstates/${userStatus === 'realEstateAgent' ? 'own' : ''}`);

    useEffect(() => {
        if(data){
            setRealEstateData(data);
        }
    }, [data]);


    if(isLoading){
        return <Loading/>
    }


    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <DashboardAccountSidebar 
                navItems={SIDEBAR_NAV_ITEMS.dashboard.agency}
                
                activeItem={'Panden'}/>

            </div>

            <main className={styles.realEstateContainer}>

                {
                    error ? 
                    <div>{error}</div>
                    : 

                    <>
                        <div className={styles.justifyBetween}>
                            <h1>Panden</h1>
                            <PrimaryBtnLink location={ROUTES.dashboard.agency.realEstate.post} text={'Nieuw'}/>
                        </div>
                        
                        <div>

                            <GridCards>
                                {realEstatesData.map((realEstateData) => (
                                    <RealEstateCard
                                        key={realEstateData._id}
                                        realEstateData={realEstateData}
                                        isLiked={false}
                                        isLoggedIn={user ? true : false}
                                        userStatus={userStatus}
                                    />
                                    ))}

                                </GridCards>
                        </div>
                    </>
                }
                
            </main>
        </div>
    );
}

export default UpdateRealEstates;