import React from 'react';
import styles from './updateRealEstates.module.css';
import DashboardAccountSidebar from '../../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar';
import SIDEBAR_NAV_ITEMS from '../../../../consts/sidebarNavItems';
import GridCards from '../../../../components/Global/grid/gridCards/gridCards';
import RealEstateCard from '../../../../components/Global/cards/realEstateCard/realEstateCard';

function UpdateRealEstates({userStatus}) {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <DashboardAccountSidebar 
                navItems={SIDEBAR_NAV_ITEMS.dashboard.agency}
                
                activeItem={'Panden'}/>

            </div>

            <main className={styles.favoritesContainer}>
                <div className={styles.justifyBetween}>
                    <h1>Panden</h1>
                    <button className={styles.primaryBtn}>Nieuw</button>
                </div>
                

                <div>
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
                                unavailable: true,
                                propertyId: 5,
                                epcLabel: "b",
                                isPublished: true
                            }}

                            isLoggedIn={true}
                            published={true}
                            userStatus={'agent'}
                        />
                        <RealEstateCard 
                            realEstateData={{
                                price: "650",
                                type: "Huis",
                                sellinigMethode: "te huur",
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
                                epcLabel: "e"
                            }}

                            isLoggedIn={true}
                            isPublished={true}
                            userStatus={'agent'}

                            
                        />
                        <RealEstateCard 
                            realEstateData={{
                                price: "650",
                                type: "Huis",
                                sellinigMethode: "te huur",
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

                            isLoggedIn={true}
                            isPublished={false}
                            userStatus={'agent'}
                            
                        />
                    </GridCards>
                </div>
            </main>
        </div>
    );
}

export default UpdateRealEstates;