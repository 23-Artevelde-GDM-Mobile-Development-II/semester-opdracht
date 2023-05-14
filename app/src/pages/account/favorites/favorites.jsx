import React from 'react';
import styles from './favorites.module.css';
import DashboardAccountSidebar from '../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar';
import ROUTES from '../../../consts/routes';
import GridCards from '../../../components/Global/grid/gridCards/gridCards';
import RealEstateCard from '../../../components/Global/cards/realEstateCard/realEstateCard';
import SIDEBAR_NAV_ITEMS from '../../../consts/sidebarNavItems';

function Favorites() {
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
                    <GridCards>
                        <RealEstateCard 
                            realEstateData={{
                                price: "650",
                                type: "Huis",
                                sellingMethode: "te huur",
                                street: "Bauterstraat",
                                houseNr: 29,
                                zipCode: 9870,
                                city: "Zulte",
                                measurements: 244,
                                bedrooms: 2,
                                constructionYear: 2013,
                                bathrooms: 1,
                                imgUrl: "https://images.unsplash.com/photo-1572953745960-14685e3e9b49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                                unavailable: false,
                                propertyId: 5,
                                epcLabel: "a"
                            }}

                            isLiked={true}
                            isLoggedIn={true}
                            userStatus={'regular user'}
                            
                        />

                        <RealEstateCard 
                            realEstateData={{
                                price: "650",
                                type: "Huis",
                                sellingMethode: "te huur",
                                street: "Bauterstraat",
                                houseNr: 29,
                                zipCode: 9870,
                                city: "Zulte",
                                measurements: 244,
                                bedrooms: 2,
                                constructionYear: 2013,
                                bathrooms: 1,
                                imgUrl: "https://images.unsplash.com/photo-1572953745960-14685e3e9b49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                                unavailable: false,
                                propertyId: 5,
                                epcLabel: "a"
                            }}

                            isLiked={true}
                            isLoggedIn={true}
                            userStatus={'regular user'}
                            
                        />

                        <RealEstateCard 
                            realEstateData={{
                                price: "650",
                                type: "Huis",
                                sellingMethode: "te huur",
                                street: "Bauterstraat",
                                houseNr: 29,
                                zipCode: 9870,
                                city: "Zulte",
                                measurements: 244,
                                bedrooms: 2,
                                constructionYear: 2013,
                                bathrooms: 1,
                                imgUrl: "https://images.unsplash.com/photo-1572953745960-14685e3e9b49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                                unavailable: false,
                                propertyId: 5,
                                epcLabel: "a"
                            }}

                            isLiked={true}
                            isLoggedIn={true}
                            userStatus={'regular user'}
                            
                        />
                    </GridCards>
                </div>
            </main>
        </div>
    );
}

export default Favorites;