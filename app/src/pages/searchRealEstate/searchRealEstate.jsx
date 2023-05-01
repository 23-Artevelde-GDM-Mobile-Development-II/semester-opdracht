import React from 'react';
import GridCards from '../../components/Global/grid/gridCards/gridCards';
import RealEstateCard from '../../components/Global/cards/realEstateCard/realEstateCard';

function SearchRealEstate(props) {

    return (
        <div>
            <h1>Dit is zoekpagina</h1>

            <div className={`mt-[92px] md:mt-[68px] items-center justify-between md:block`}>

                {/* FILTER ICON FOR MOBILE*/}
                <button>
                    <i className="fa-solid fa-filter md:hidden cursor-pointer bg-mint-green text-white p-5 m-8 rounded-full"></i>
                </button>


                {/* ORDER BY */}
                <div className="m-8 md:mt-[8.5em] w-max ml-auto">
                    <label htmlFor="sort">Sorteer op:</label>

                    <select name="sort" id="sort" className="bg-cyan-100 p-2 ml-4 rounded-lg outline-cyan-300" onChange={''}>
                        <option value="id-DESC">Meest recente eerst</option>
                        <option value="id-ASC">Oudste eerst</option>
                        <option value="price-ASC">Goedkoopste eerst</option>
                        <option value="price-DESC">Duurste eerst</option>
                    </select>
                </div>
            </div>
            
            {/* CARDS */}
            <div className="px-8">
                <GridCards>
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
                            propertyId: 5
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
                            propertyId: 5
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
                            propertyId: 5
                        }}

                        isLiked={false}
                        isLoggedIn={true}
                        
                    />
                </GridCards>
            </div>
        
        </div>
    );
}

export default SearchRealEstate;