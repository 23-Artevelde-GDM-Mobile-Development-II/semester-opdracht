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
import Loading from '../../components/Global/loading/loading';
import { useAuthContext } from '../../contexts/AuthContainer';

function SearchRealEstate(props) {

    const  {user} = useAuthContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const { isLoading, error, mutate } = useMutation();

    const [filter, setFilter] = useState({
        filterParams: {},
        sortBy: 'mostRecent',
        sellingMethod: 'renting'
    });

    function updateSellingMethod(){
        if(filter.sellingMethod === 'renting'){
            setFilter(prevValues => ({...prevValues, sellingMethod: 'selling'}))
        }else{
            setFilter(prevValues => ({...prevValues, sellingMethod: 'renting'}))

        }
        
    }

    const [realEstatesData, setRealEstateData] = useState([]);
    const [filterErrors, setFilterErrors] = useState([]);
    
    // Get parameters from url and place them in the filterParams.
    useEffect(() => {
        const filterParams = {
          city: searchParams.get("city") || undefined,
          priceMin: parseInt(searchParams.get("priceMin")) || undefined,
          priceMax: parseInt(searchParams.get("priceMax")) || undefined,
          numberOfRoomsMin: parseInt(searchParams.get("numberOfRoomsMin")) || undefined,
          numberOfBathroomsMin: parseInt(searchParams.get("numberOfBathroomsMin")) || undefined,
          livingAreaMin: parseInt(searchParams.get("livingAreaMin")) || undefined,
          livingAreaMax: parseInt(searchParams.get("livingAreaMax")) || undefined,
          landAcreageMin: parseInt(searchParams.get("landAcreageMin")) || undefined,
          landAcreageMax: parseInt(searchParams.get("landAcreageMax")) || undefined,
          gardenAvailable: searchParams.get("gardenAvailable") || undefined,
          terraceAvailable: searchParams.get("terraceAvailable") || undefined,
          balconyAvailable: searchParams.get("balconyAvailable") || undefined,
          parkingAvailable: searchParams.get("parkingAvailable") || undefined,
          hasSolarPanels: searchParams.get("hasSolarPanels") || undefined,
          epcMin: searchParams.get("epcMin") || undefined,

        };
    
        // Remove properties with empty string values
        Object.keys(filterParams).forEach((key) => {
          if (filterParams[key] === undefined) {
            delete filterParams[key];
          }
        });
    
        setFilter((prevFilter) => ({
          ...prevFilter,
          filterParams
        }));
    
    
    }, [searchParams]);

    function handleOrderByChange(e) {
        setFilter((prevFilter) => ({
            ...prevFilter,
            sortBy: e.target.value
        }));
      
    }
    

    useEffect(()=>{
        mutate(`${process.env.REACT_APP_API_URL}/realEstates/sellingMethod/${filter.sellingMethod}?sortBy=${filter.sortBy}`, {
        method: "POST",
        data: filter.filterParams,
        onSuccess: (data) => {
            setRealEstateData(data.realEstates);
            console.log(data.realEstates);
        },
        });

        if(error && Array.isArray(error) ){
            setFilterErrors(error);
        }

    }, [filter, searchParams]);

   
        if (isLoading) {
            return <Loading />;
        }
    
        if (error) {
            return (
                <div className={styles.pageContainer}>
                    {/* SIDEBAR WITH FILTERS */}
                    <SearchSidebar sellingMethod={filter.sellingMethod} filterErrors={filterErrors} toggleSellingMethod={updateSellingMethod}/>
    
                    <main>
                        <p>Er konden geen resultaten gevonden worden.</p>
                    </main>
                </div>
            );
        }

        return (
            <div className={styles.pageContainer}>
    
                {/* SIDEBAR WITH FILTERS */}
                <SearchSidebar sellingMethod={filter.sellingMethod} filterErrors={filterErrors} toggleSellingMethod={updateSellingMethod}/>
    
                {/* MAIN CONTENT */}
                <main>
                    <h1>Dit is zoekpagina</h1>
    
                    <div className={styles.justifyBetween}>
    
                        {/* FILTER ICON FOR MOBILE*/}
                        {/* <button>
                            <i className="fa-solid fa-filter md:hidden cursor-pointer bg-mint-green text-white p-5 m-8 rounded-full"></i>
                        </button> */}
    
                        <p>{realEstatesData.length} {realEstatesData.length> 1 || realEstatesData.length === 0 ? 'resultaten': 'resultaat'}</p>
    
                        {/* SORT BY */}
                        <div>
                            <Select options={[{label: 'Meest recente eerst', value: 'mostRecent'}, {label: 'Oudste eerst', value: 'oldest'}, {label: 'Goedkoopste eerst', value: 'cheapest'}, {label: 'Duurste eerst', value: 'mostExpensive'}]} selectName={'orderBy'} activeOption={filter.sortBy} handleChange={handleOrderByChange}/>
                        </div>
                    </div>

                    
                    {/* CARDS */}
                    <div className="px-8">
                    {realEstatesData.length > 0 ? 
                    <GridCards>
                    {realEstatesData.map((realEstateData) => (
                        <RealEstateCard
                            key={realEstateData._id}
                            realEstateData={realEstateData}
                            isLiked={false}
                            isLoggedIn={user ? true : false}
                            userStatus={'regular user'}
                        />
                        ))}
                
                    </GridCards>
                    : 
                    <p>Er zijn geen resultate gevonden.</p>
                    }
                    </div>
                
                </main>
            </div>
        );
    }


export default SearchRealEstate;
