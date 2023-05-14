import React from 'react';
import styles from './favorites.module.css';
import DashboardAccountSidebar from '../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar';
import ROUTES from '../../../consts/routes';
import GridCards from '../../../components/Global/grid/gridCards/gridCards';
import RealEstateCard from '../../../components/Global/cards/realEstateCard/realEstateCard';

function Favorites() {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <DashboardAccountSidebar 
                navItems={[['Persoonlijke gegevens', ROUTES.account.personalData], ['Favorieten', ROUTES.account.favorites], ['Berichten', ROUTES.account.messages], ['Uitloggen', ROUTES.account.logOut]]}
                
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
                                epcLabel: "b"
                            }}

                            isLiked={false}
                            isLoggedIn={true}
                            
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

                            isLiked={false}
                            isLoggedIn={true}
                            userStatus={true}
                            
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

                            isLiked={false}
                            isLoggedIn={true}
                            
                        />
                    </GridCards>
                </div>
            </main>
        </div>
    );
}

export default Favorites;