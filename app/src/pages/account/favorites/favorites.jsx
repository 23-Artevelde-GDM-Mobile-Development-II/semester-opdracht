import React, { useCallback, useEffect, useState } from 'react';
import styles from './favorites.module.css';
import DashboardAccountSidebar from '../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar';
import ROUTES from '../../../consts/routes';
import GridCards from '../../../components/Global/grid/gridCards/gridCards';
import RealEstateCard from '../../../components/Global/cards/realEstateCard/realEstateCard';
import SIDEBAR_NAV_ITEMS from '../../../consts/sidebarNavItems';
import useFetch from '../../../hooks/useFetch';
import Loading from "../../../components/Global/loading/loading"

function Favorites() {

    const [favorites, setFavorites] = useState([]);
    const {
        isLoading,
        error,
        invalidate,
        data
    } = useFetch(`/myFavorites`);

    // Function to refetch favorites data
    const fetchFavorites = useCallback(() => {
        invalidate();
    }, [invalidate]);

    useEffect(() => {
        if (data) {
        setFavorites(data);
        }
    }, [data]);

    console.log('err',error);

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
    
                    <div className="px-8">
                        {error ? 
                            <p>{error}</p>
                        : 
                        <GridCards>

                            {data.map(realEstate => (
                                <RealEstateCard key={realEstate._id}
                                realEstateData={{
                                    price: realEstate.realEstate.price,
                                    type: realEstate.realEstate.type,
                                    sellingMethode: realEstate.realEstate.sellingMethode,
                                    street: realEstate.location.street,
                                    houseNr: realEstate.location.number,
                                    zipCode: realEstate.location.zipCode,
                                    city: realEstate.location.city,
                                    measurements: realEstate.realEstate.livingArea,
                                    bedrooms: realEstate.layout.numberOfBedrooms,
                                    bathrooms: realEstate.layout.numberOfBathrooms,
                                    imgUrl: realEstate.images[0],
                                    unavailable: false,
                                    propertyId: realEstate._id,
                                    epcLabel: realEstate.energy.epc
                                }}

                                isLiked={true}
                                isLoggedIn={true}
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