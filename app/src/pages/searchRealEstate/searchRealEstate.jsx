import React, { useEffect, useState } from 'react';
import GridCards from '../../components/Global/grid/gridCards/gridCards';
import RealEstateCard from '../../components/Global/cards/realEstateCard/realEstateCard';

import styles from './searchRealEstate.module.css';
import FilterSidebar from '../../components/searchPage/sidebar/filterSidebar/filterSidebar';
import CheckboxToggle from '../../components/Global/formInputs/checkbox/checkboxToggle/checkboxToggle';
import useFetch from '../../hooks/useFetch';
import Select from '../../components/Global/formInputs/select/select'
import Input from '../../components/Global/formInputs/input/input';
import InputWithLabel from '../../components/Global/formInputs/input/inputWithLabel/inputWithLabel';
import SelectWithLabel from '../../components/Global/formInputs/select/selectWithLabel/selectWithLabel';
import SearchSidebar from '../../components/searchPage/sidebar/searchSidebar';
import { useSearchParams } from 'react-router-dom';
import useMutation from '../../hooks/useMutation';

function SearchRealEstate(props) {


    // function changeToggleFilterOptions(optionName) {
    //     setToggleFilterOptions(()=>(
    //         {
    //             ...toggleFilterOptions,
    //             [optionName]: !(toggleFilterOptions[optionName])
    //         }
    //     ));

    // }

    const { isLoading, error, mutate } = useMutation();

    const [filter, setFilter] = useState({
        filterParams: {},
        orderBy: 'recentst',
        sellingMethod: 'renting'
    });
    

    const [realEstatesData, setRealEstateData] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    // searchParams.get("__firebase_request_key");
    console.log(searchParams.get("appatement"));



    useEffect(()=>{
        mutate(`${process.env.REACT_APP_API_URL}/realEstates/sellingMethod/${filter.sellingMethod}`, {
        method: "GET",
        data: filter.filterParams,
        onSuccess: (data) => {
            setRealEstateData(data);
            console.log(data);
        },
        });

    }, [filter, searchParams]);

    console.log('realEstates', realEstatesData)
    console.log(error);


    return (
        <div className={styles.pageContainer}>

            {/* SIDEBAR WITH FILTERS */}
            <SearchSidebar sellingMethod={filter.sellingMethod}/>

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
                        {/* <RealEstateCard/> */}
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