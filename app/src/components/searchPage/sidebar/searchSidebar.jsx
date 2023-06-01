import React, { useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import FilterSidebar from './filterSidebar/filterSidebar';
import CheckboxToggle from '../../Global/formInputs/checkbox/checkboxToggle/checkboxToggle';
import Input from '../../Global/formInputs/input/input';
import InputWithLabel from '../../Global/formInputs/input/inputWithLabel/inputWithLabel';
import SelectWithLabel from '../../Global/formInputs/select/selectWithLabel/selectWithLabel';
import Loading from '../../Global/loading/loading';

import styles from './searchSidebar.module.css';

function SearchSidebar({sellingMethod}) {

    const [filterParameters, setFilterParameters] = useState({
        types: [],
        city: '',
        priceMin: '',
        priceMax: '', 
        livingAreaMin: '',
        livingAreaMax: '', 
        landAcreageMin: '', 
        landAcreageMax: '', 
        numberOfRoomsMin: 1, 
        numberOfBathroomsMin: 1, 
        gardenAvailable: true, 
        terraceAvailable: true, 
        balconyAvailable: true, 
        parkingAvailable: true, 
        hasSolarPanels: true, 
        epcMin: 'a'
    });
    
    // Fetch main types
    const {
        isLoading: typeIsLoading,
        error: typeError,
        invalidate: typeInvalidate,
        data: typeData
    } = useFetch(`/realEstates/types`);

    console.log(typeData);

    // Fetch subtypes
    const {
        isLoading: subTypeIsLoading,
        error: subTypeError,
        invalidate: subTypeInvalidate,
        data: subTypeData
    } = useFetch(`/realEstates/subtypes`);

    useEffect(()=>{
        if(typeData && subTypeData){
            const combinedArray = typeData.map((type) => {
                const subTypes = subTypeData.filter((subtype) => subtype.typeId === type._id);
                return {
                typeName: type.type,
                typeId: type._id,
                isActive: true,
                subTypes: subTypes.map((subtype) => ({
                    subTypeName: subtype.subtype,
                    subTypeId: subtype._id,
                    isActive: true
                }))
                };
            });
            
            setFilterParameters(prevFilterParameters => (
                {
                    ...prevFilterParameters,
                    types: combinedArray
                }
                ));
            console.log(combinedArray)
        }
        console.log('bonjour')
    }, [subTypeData, typeData]);

    function updateFilterParameters(e){
        const {name, value, type, checked} = e.target;
        setFilterParameters(prevFilterParameters => (
            {
                ...prevFilterParameters,
                [name]: type === "checkbox" ? checked : value
            }
        ))
    }

    if(typeIsLoading & subTypeIsLoading){
        return <Loading/>
    }else{
        return (
     
            <aside>
                {/* SIDEBAR WITH FILTERS */}
                <h2>Zoekcriteria</h2>
    
                <div className={styles.switch}>
                    <p className={styles.active}>Te koop</p>
                    <p>Te huur</p>
                </div>
    
                <form>
                    <FilterSidebar filterNameDutch={'Type pand'}>
    
                        {
                            filterParameters.types.map((typeObject) => {
                                if(typeObject.subTypes.length === 0){
                                    return (
                                        <div key={typeObject.typeId} className={styles.checkboxMain}>
                                            <input type="checkbox" name={typeObject.typeName} id={typeObject.typeName} data-id={typeObject.typeId}/>
                                            <label htmlFor={typeObject.typeName}>{typeObject.typeName}</label>
                                        </div>
                                    )
                                }else{
                                    return (
                                    <CheckboxToggle 
                                    labelName={typeObject.typeName}
                                    inputName={typeObject.typeName}
                                    inputDataId={typeObject.typeId}
                                    >
                                        {
                                            typeObject.subTypes.map((subTypeObject)=> (
                                                <div key={subTypeObject.subTypeId}>
                                                    <input type="checkbox" name={subTypeObject.subTypeName} id={subTypeObject.subTypeName} data-id={subTypeObject.subTypeId}/>
                                                    <label htmlFor={subTypeObject.subTypeName}>{subTypeObject.subTypeName}</label>
                                                </div>
                                            ))
                                        }
                                        
                                    </CheckboxToggle>
                                    )
                                }
                            })
                        }
    
                    </FilterSidebar>
    
    
                    <FilterSidebar filterNameDutch={'Locatie'}>
                        {/* <Select selectName={"building type"} options={[{value: 'open'}, {value: 'closed'}]}/> */}
                        <Input inputType={"search"} name={"city"} value={filterParameters.city} handleChange={updateFilterParameters}/>
                    </FilterSidebar>
    
    
                    <FilterSidebar filterNameDutch={'Prijs'}>
                        <InputWithLabel labelText={"Minimum"} inputType={"number"} name={"priceMin"} value={filterParameters.priceMin} handleChange={updateFilterParameters}/>
                        <InputWithLabel labelText={"Maximum"} inputType={"number"} name={"priceMax"} value={filterParameters.priceMax} handleChange={updateFilterParameters}/>
                    </FilterSidebar>
    
    
                    <FilterSidebar filterNameDutch={'Oppervlakte'}>
                        <div>
                            <h4>Bewoonbare oppervlakte</h4>
                            <InputWithLabel labelText={"Minimum"} inputType={"number"} name={"livingAreaMin"} value={filterParameters.livingAreaMin} handleChange={updateFilterParameters}/>
                            <InputWithLabel labelText={"Maximum"} inputType={"number"} name={"livingAreaMax"} value={filterParameters.livingAreaMax} handleChange={updateFilterParameters}/>
                        </div>
                            
                        <div>
                            <h4>Grond oppervlakte</h4>
                            <InputWithLabel labelText={"Minimum"} inputType={"number"} name={"landAcreageMin"} value={filterParameters.landAcreageMin} handleChange={updateFilterParameters}/>
                            <InputWithLabel labelText={"Maximum"} inputType={"number"} name={"landAcreageMax"} value={filterParameters.landAcreageMax} handleChange={updateFilterParameters}/>
                        </div>
                        
                    </FilterSidebar>
    
                    <FilterSidebar filterNameDutch={'Kamers'}>
                        
                        <SelectWithLabel options={[{label: '1 of meer', value: 1}, {label: '2 of meer', value: 2}, {label: '3 of meer', value: 3}, {label: '4 of meer', value: 4}, {label: '5 of meer', value: 5}]} name={"numberOfRoomsMin"} labelText={"Aantal kamers"} activeOption={filterParameters.numberOfRoomsMin} handleChange={updateFilterParameters}/>
    
                        <SelectWithLabel options={[{label: '1 of meer', value: 1}, {label: '2 of meer', value: 2}, {label: '3 of meer', value: 3}, {label: '4 of meer', value: 4}, {label: '5 of meer', value: 5}]} name={"numberOfBathroomsMin"} labelText={"Aantal badkamers"} activeOption={filterParameters.numberOfBathroomsMin} handleChange={updateFilterParameters}/>
        
                    </FilterSidebar>
    
                    <FilterSidebar filterNameDutch={'Buiten'}>
                        
                        <SelectWithLabel options={[{label: 'Ja', value: true}, {label: "Nee", value: false}]} name={"parkingAvailable"} labelText={"Parking aanwezig"} activeOption={filterParameters.parkingAvailable} handleChange={updateFilterParameters}/>
    
                        <SelectWithLabel options={[{label: 'Ja', value: true}, {label: "Nee", value: false}]} name={"gardenAvailable"} labelText={"Tuin aanwezig"} activeOption={filterParameters.gardenAvailable} handleChange={updateFilterParameters}/>
    
                        <SelectWithLabel options={[{label: 'Ja', value: true}, {label: "Nee", value: false}]} name={"terraceAvailable"} labelText={"Terras aanwezig"} activeOption={filterParameters.terraceAvailable} handleChange={updateFilterParameters}/>
    
                        <SelectWithLabel options={[{label: 'Ja', value: true}, {label: "Nee", value: false}]} name={"balconyAvailable"} labelText={"Balkon aanwezig"} activeOption={filterParameters.balconyAvailable} handleChange={updateFilterParameters}/>
        
                    </FilterSidebar>
    
    
                    <FilterSidebar filterNameDutch={'Energie'}>
                        
                        <SelectWithLabel options={[{label: 'A', value: 'a'}, {label: "B", value: 'b'}, {label: "C", value: 'c'}, {label: 'D', value: 'd'}, {label: 'E', value: 'e'}, {label: 'F', value: 'f'}]} name={"epcMin"} labelText={"EPC-waarde"} activeOption={filterParameters.epcMin} handleChange={updateFilterParameters}/>
    
                        <input type="checkbox" name={"hasSolarPanels"} id={"hasSolarPanels"} value={filterParameters.hasSolarPanels} onChange={updateFilterParameters}/>
                        <label htmlFor={"hasSolarPanels"}>Heeft zonnepanelen</label>
                    
                    </FilterSidebar>
    
                    <button>Zoeken</button>
                </form>
    
            </aside>
        );
    }
    
}

export default SearchSidebar;
