import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './favorites.module.css';
import DashboardAccountSidebar from '../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar';
import ROUTES from '../../../consts/routes';
import GridCards from '../../../components/Global/grid/gridCards/gridCards';
import RealEstateCard from '../../../components/Global/cards/realEstateCard/realEstateCard';
import SIDEBAR_NAV_ITEMS from '../../../consts/sidebarNavItems';
import useFetch from '../../../hooks/useFetch';
import Loading from "../../../components/Global/loading/loading"
import { useAuthContext } from '../../../contexts/AuthContainer';

function Favorites() {

    const {
        isLoading,
        error,
        invalidate,
        data
    } = useFetch(`/myFavorites`);

    const {user} = useAuthContext();

    const favorites = useMemo(() => data || [], [data]);

    const fetchFavorites = useCallback(() => {
        invalidate();
    }, [invalidate]);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);


    if(isLoading){
        return <Loading/> 
    }else{

        return (
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <DashboardAccountSidebar 
                    navItems={SIDEBAR_NAV_ITEMS.account}
                    
                    activeItem={'Favorieten'}/>
    
                </div>
    
                <main className={styles.favoritesContainer}>
                    <h1>Favorieten</h1>
    
                    <div>
                        {error ? 
                            <p>{error}</p>
                        : 
                
                        <GridCards>
                        {favorites.map((realEstateData) => (
                            <RealEstateCard
                                key={realEstateData._id}
                                realEstateData={realEstateData}
                                isLiked={false}
                                isLoggedIn={user ? true : false}
                                userStatus={'regular user'}
                            />
                            ))}

                        </GridCards>
                        }
                        
                    </div>
                </main>
            </div>
        );
    }
}

export default Favorites;