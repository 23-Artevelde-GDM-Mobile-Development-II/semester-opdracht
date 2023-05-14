import React, { useState } from 'react';
import GridCards from '../../components/Global/grid/gridCards/gridCards';
import RealEstateCard from '../../components/Global/cards/realEstateCard/realEstateCard';

import styles from './searchRealEstate.module.css';
import FilterSidebar from '../../components/searchPage/filterSidebar/filterSidebar';
import CheckboxToggle from '../../components/Global/formInputs/checkbox/checkboxToggle/checkboxToggle';

function SearchRealEstate(props) {


    // const [toggleFilterOptions, setToggleFilterOptions] = useState({
    //     realEstateType: false,
    //     buildingType: false,
    //     location: false,
    //     price: false,
    //     acreage: false,
    //     rooms: false,
    //     outside: false,
    //     energie: false
    // })
    const [toggleFilterOptions, setToggleFilterOptions] = useState({
        realEstateType: false,
        buildingType: false,
        location: false,
        price: false,
        acreage: false,
        rooms: false,
        outside: false,
        energie: false
    })

    // const [toggleMainCheckboxes, setToggleMainCheckboxes] = useState({
    //     house: false,
    //     appartement: false,
    //     test: false
    // })


    // function changeToggleFilterOptions(optionName) {
    //     setToggleFilterOptions(()=>(
    //         {
    //             ...toggleFilterOptions,
    //             [optionName]: !(toggleFilterOptions[optionName])
    //         }
    //     ));

    // }

    return (
        <div className={styles.pageContainer}>

            {/* SIDEBAR WITH FILTERS */}
            <aside>
                <h2>Zoekcriteria</h2>

                <div className={styles.switch}>
                    <p className={styles.active}>Te koop</p>
                    <p>Te huur</p>
                </div>

                <div>
                    <FilterSidebar filterNameDutch={'Type pand'}>

                    <div className={styles.checkboxMain}>
                            <i className="fa-solid fa-chevron-right"></i>

                            <input type="checkbox" name="main-house"
                            id="main-house"/>
                            <label htmlFor="main-house">Huis</label>

                            <div className={styles.subContent}>
                                <div className={styles.checkboxSub}>
                                    <input type="checkbox" name="house" id="house"/>
                                    <label htmlFor="house">Huis</label>
                                </div>

                                <div className={styles.checkboxSub}>
                                    <input type="checkbox" name="villa" id="villa"/>
                                    <label htmlFor="villa">villa</label>
                                </div>
                                <div className={styles.checkboxSub}>
                                    <input type="checkbox" name="herenhuis" id="herenhuis"/>
                                    <label htmlFor="herenhuis">Herenhuis</label>
                                </div>
                                <div className={styles.checkboxSub}>
                                    <input type="checkbox" name="bungalow" id="bungalow"/>
                                    <label htmlFor="bungalow">Bungalow</label>
                                </div>
                            </div>
                        </div>

                        <CheckboxToggle 
                        labelName={'Test'}
                        inputName={'test'}
                        >
                            <input type="checkbox" name={`kpop`} id={`kpop`} />
                            <label htmlFor={`kpop`}>KPOP</label>
                        </CheckboxToggle>

                        <div className={styles.checkboxMain}>
                            <i className="fa-solid fa-chevron-right"></i>

                            <input type="checkbox" name="main-appartement"
                            id="main-appartement"/>
                            <label htmlFor="main-appartement">Appartement</label>

                            <div className={styles.subContent}>
                                <div className={styles.checkboxSub}>
                                    <input type="checkbox" name="appartement" id="appartement"/>
                                    <label htmlFor="appartement">Appartement</label>
                                </div>

                                <div className={styles.checkboxSub}>
                                    <input type="checkbox" name="gelijkvloers" id="gelijkvloers"/>
                                    <label htmlFor="gelijkvloers">Gelijkvloers</label>
                                </div>
                                
                            </div>
                        </div>


                        <div className={styles.checkboxMain}>
                    
                            <input type="checkbox" name="main-kot"
                            id="main-kot"/>
                            <label htmlFor="main-kot">Kot</label>
                        </div>
                    </FilterSidebar>


                    <FilterSidebar filterNameDutch={'Type bebouwing'}>
                    <p>Zie je dit + kun je dit togglen??</p>
                </FilterSidebar>
                </div>

            </aside>

            {/* MAIN CONTENT */}
            <main>
                <h1>Dit is zoekpagina</h1>

                <div className={styles.justifyBetween}>

                    {/* FILTER ICON FOR MOBILE*/}
                    {/* <button>
                        <i className="fa-solid fa-filter md:hidden cursor-pointer bg-mint-green text-white p-5 m-8 rounded-full"></i>
                    </button> */}

                    <p>42 resultaten</p>

                    {/* ORDER BY */}
                    <div className="m-8 md:mt-[8.5em] w-max ml-auto">
                        <select name="sort" id="sort" className={styles.sort} onChange={''}>
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

                            isLiked={false}
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

                            isLiked={false}
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

                            isLiked={false}
                            isLoggedIn={true}
                            userStatus={'regular user'}
                            
                        />
                    </GridCards>
                </div>
            
            </main>
        </div>
    );
}

export default SearchRealEstate;