import React, { useState } from 'react';
import DashboardAccountSidebar from '../../../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar';
import styles from './addEditRealEstate.module.css';
import SIDEBAR_NAV_ITEMS from '../../../../../consts/sidebarNavItems';
import InputWithLabel from '../../../../../components/Global/formInputs/input/inputWithLabel/inputWithLabel';
import SelectWithLabel from '../../../../../components/Global/formInputs/select/selectWithLabel/selectWithLabel';

function AddEditRealEstate({realEstateData, isNew}) {

    const [formValues, setFormvalues] = useState({
        images: [],
        realEstate:{
            type: 'house',
            subType: 'vila',
            sellingMethod: 'rent-out',
            price: '',
            livingArea: '',
            constructionYear: ''
        },
        outside: {
            gardenAvailable: false,
            terraceAvailable: false,
            balconyAvailable: false,
            parkingAvailable: false,
            landAcreage: ''
        },
        layout: {
            numberOfBedrooms: '',
            numberOfBathrooms: ''
        },
        energy:{
            glassType: 'double',
            heatingSource: '',
            hasSolarPanels: false,
            epc: 'a'

        }, 
        description: ""

    });

    function updateFormValues(e) {
        const {name, value, type} = e.target;
        const [nestedKey, nestedProperty] = name.split(".");
 
        if (type === "textarea") {
            setFormvalues((prevFormValues) => ({
              ...prevFormValues,
              [name]: value,
            }));
        } else {
            setFormvalues((prevFormValues) => ({
              ...prevFormValues,
              [nestedKey]: {
                ...prevFormValues[nestedKey],
                [nestedProperty]: value,
              },
            }));
        }
    }


    function handleImageChange(e) {
        const files = Array.from(e.target.files);
        const fileURLs = files.map((file) => URL.createObjectURL(file));
      
        setFormvalues((prevFormValues) => ({
          ...prevFormValues,
          images: fileURLs,
        }));
    }

    console.log(formValues);


    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <DashboardAccountSidebar 
                navItems={SIDEBAR_NAV_ITEMS.dashboard.agency}
                
                activeItem={'Panden'}/>

            </div>

            <main className={styles.favoritesContainer}>
                <div className={styles.justifyBetween}>
                    <div>
                        <h1>Pand {isNew ? 'toevoegen' : 'wijzigen'}</h1>
                        <p><span className={isNew || !(realEstateData.isPublished) ? styles.redDot: styles.greenDot}></span> {isNew || !(realEstateData.isPublished) ? 'Nog niet gepubliceerd' : 'Gepubliceerd'}</p>
                    </div>
                    
                    {
                        !isNew && realEstateData.isPublished === false &&
                        <button className={styles.secondaryBtn}>Offline halen</button>
                    }

                    <button className={styles.primaryBtn}>Publiceren</button>
                </div>
                

                <div>
                    <div>
                        <h2>Afbeeldingen</h2>
                        
                        <div className={`${styles.whiteContainerWithoutGrid}`}>
                            <div className={styles.imageContainer}>
                                <img src="https://ucarecdn.com/cb288972-b141-4509-94ac-02c4dbeb77da/109_1179703_1.jpg" alt="" />
                                <img src="https://ucarecdn.com/cb288972-b141-4509-94ac-02c4dbeb77da/109_1179703_1.jpg" alt="" />
                                <img src="https://ucarecdn.com/cb288972-b141-4509-94ac-02c4dbeb77da/109_1179703_1.jpg" alt="" />
                                <img src="https://ucarecdn.com/cb288972-b141-4509-94ac-02c4dbeb77da/109_1179703_1.jpg" alt="" />

                            </div>
                            
                            <div>
                                <label htmlFor="image">Afbeelding downloaden</label>
                                <input type="file" name="image" id="image" accept="image/*" multiple onChange={handleImageChange}/>
                            </div>
                           
                        </div>
                    </div>


                    <div>
                        <h2>Gebouw</h2>
                        <div className={styles.whiteContainer}>
                            <SelectWithLabel handleChange={updateFormValues} name={'realEstate.type'} labelText={'Type pand'} options={[
                                {
                                    label: 'Huis',
                                    value: 'house'
                                },
                                {
                                    label: 'Appartement',
                                    value: 'appartement'
                                },
                                
                                {
                                    label: 'Kot',
                                    value: 'dorm'
                                },
                                {
                                    label: 'Garage',
                                    value: 'garage'
                                },
                                {
                                    label: 'Grond',
                                    value: 'land'
                                },
                                {
                                    label: 'Andere',
                                    value: 'others'
                                }
                            ]}
                            
                            activeOption={formValues.realEstate.type}
                            />

                            <SelectWithLabel handleChange={updateFormValues} labelText={'Subtype'} name={'realEstate.subType'} options={[
                                {
                                    label: 'Vila',
                                    value: 'vila'
                                },
                                {
                                    label: 'Herenhuis',
                                    value: 'mansion'
                                }
                            ]}
                            
                            activeOption={formValues.realEstate.subType}
                            />

                            <SelectWithLabel handleChange={updateFormValues} labelText={'Verhuur of verkoop'} name={'realEstate.sellingMethod'} options={[
                                {
                                    label: 'Verhuren',
                                    value: 'rent-out'
                                },
                                {
                                    label: 'Verkopen',
                                    value: 'sell'
                                }
                            ]}
                            
                            activeOption={formValues.realEstate.sellingMethod}
                            />

                            <InputWithLabel inputType={'number'} name={'realEstate.price'} value={formValues.realEstate.price} labelText={'Prijs'} handleChange={updateFormValues}/>

                            <InputWithLabel  inputType={'number'} name={'realEstate.livingArea'} value={formValues.realEstate.livingArea} labelText={'Bewoonbare oppervlakte (m²)'} handleChange={updateFormValues}/>


                            <InputWithLabel inputType={'number'} name={'realEstate.constructionYear'} value={formValues.realEstate.constructionYear} labelText={'Bouwjaar'} handleChange={updateFormValues}/>

                        </div>
                    </div>

                    <div>
                        <h2>Terein/ buiten</h2>
                        <div className={styles.whiteContainer}>
                            <SelectWithLabel handleChange={updateFormValues} name={'outside.gardenAvailable'} labelText={'Tuin aanwezig'} options={[
                                {
                                    label: 'Nee',
                                    value: false
                                },
                                {
                                    label: 'Ja',
                                    value: true
                                }
                            ]}
                            
                            activeOption={formValues.outside.gardenAvailable}
                            />

                            <SelectWithLabel handleChange={updateFormValues} name={'outside.terraceAvailable'} labelText={'Terras aanwezig'} options={[
                                {
                                    label: 'Nee',
                                    value: false
                                },
                                {
                                    label: 'Ja',
                                    value: true
                                }
                            ]}
                            
                            activeOption={formValues.outside.terraceAvailable}
                            />

                            <SelectWithLabel handleChange={updateFormValues} labelText={'Balkon aanwezig'} name={'outside.balconyAvailable'} options={[
                                {
                                    label: 'Nee',
                                    value: false
                                },
                                {
                                    label: 'Ja',
                                    value: true
                                }
                            ]}
                            
                            activeOption={formValues.outside.balconyAvailable}
                            />

                            <SelectWithLabel handleChange={updateFormValues} labelText={'Parking aanwezig'} name={'outside.parkingAvailable'} options={[
                                {
                                    label: 'Nee',
                                    value: false
                                },
                                {
                                    label: 'Ja',
                                    value: true
                                }
                            ]}
                            
                            activeOption={formValues.outside.parkingAvailable}
                            />


                            <InputWithLabel inputType={'number'} name={'outside.landAcreage'} value={formValues.outside.landAcreage} labelText={'Perceeloppervlakte (m²)'} handleChange={updateFormValues}/>

                        </div>
                    </div>

                    <div>
                        <h2>Indeling</h2>
                        <div className={styles.whiteContainer}>
                            <InputWithLabel inputType={'number'} name={'layout.numberOfBedrooms'} value={formValues.layout.numberOfBedrooms} labelText={'Aantal slaapkamers'} handleChange={updateFormValues}/>

                            <InputWithLabel inputType={'number'} name={'layout.numberOfBathrooms'} value={formValues.layout.numberOfBathrooms} labelText={'Aantal badkamers'} handleChange={updateFormValues}/>
                        </div>
                    </div>

                    <div>
                        <h2>Energie</h2>
                        <div className={styles.whiteContainer}>
                            <SelectWithLabel handleChange={updateFormValues} name={'energy.glassType'} labelText={'Type beglazing'} options={[
                                {
                                    label: 'Dubbel glas',
                                    value: 'double'
                                },
                                {
                                    label: 'Enkel glas',
                                    value: 'single'
                                }
                            ]}
                            
                            activeOption={formValues.energy.glassType}
                            />

                            <InputWithLabel inputType={'text'} name={'energy.heatingSource'} value={formValues.energy.heatingSource} labelText={'Verwarmingsbron'} handleChange={updateFormValues}/>


                            <SelectWithLabel handleChange={updateFormValues} name={'energy.hasSolarPanels'} labelText={'Heeft zonnepannelen'} options={[
                                {
                                    label: 'Nee',
                                    value: false
                                },
                                {
                                    label: 'Ja',
                                    value: true
                                }
                            ]}
                            
                            activeOption={formValues.energy.hasSolarPanels}
                            />

                            <SelectWithLabel handleChange={updateFormValues} labelText={'EPC-waarde'} name={'energy.epc'} options={[
                                {
                                    label: 'A',
                                    value: 'a'
                                },
                                {
                                    label: 'B',
                                    value: 'b'
                                },
                                {
                                    label: 'C',
                                    value: 'c'
                                },
                                {
                                    label: 'D',
                                    value: 'd'
                                },
                                {
                                    label: 'E',
                                    value: 'e'
                                },
                                {
                                    label: 'F',
                                    value: 'f'
                                }
                            ]}
                            
                            activeOption={formValues.energy.epc}
                            />

                        </div>
                    </div>

                    <div>
                        <h2>Omschrijving</h2>
                        <div className={styles.whiteContainer}>
                            <textarea value={formValues.description} onChange={updateFormValues} name={'description'}/>
                        </div>
                    </div>

                    <div className={styles.btnPosition}>
                        <div>
                            <button className={styles.secondaryBtn}>Opslaan</button>
                            <button className={styles.primaryBtn}>Opslaan & publiceren</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AddEditRealEstate;