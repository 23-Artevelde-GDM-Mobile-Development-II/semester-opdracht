import React, { useCallback, useEffect, useRef, useState } from 'react';
import DashboardAccountSidebar from '../../../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar';
import styles from './addEditRealEstate.module.css';
import SIDEBAR_NAV_ITEMS from '../../../../../consts/sidebarNavItems';
import InputWithLabel from '../../../../../components/Global/formInputs/input/inputWithLabel/inputWithLabel';
import SelectWithLabel from '../../../../../components/Global/formInputs/select/selectWithLabel/selectWithLabel';
import * as LR from "@uploadcare/blocks";
import uploadcare from 'uploadcare-widget';
import { uploadDirect } from '@uploadcare/upload-client'
import useMutation from '../../../../../hooks/useMutation';
import useFetch from '../../../../../hooks/useFetch';
import Loading from '../../../../../components/Global/loading/loading';
import { useAuthContext } from '../../../../../contexts/AuthContainer';

LR.registerBlocks(LR);


function AddEditRealEstate({realEstateData, isNew}) {

    const [subTypesAvailable, setSubTypesAvailable] = useState(false);
//     const dataOutputRef = useRef();
//   // TODO: We need to export all data output types
//   const [files, setFiles] = useState([]);

//   // TODO: We need to export all the event types
//   const handleUploaderEvent = useCallback(e => {
//     const { data } = e.detail;
//     setFiles(data);
//   }, []);

//   useEffect(() => {
//     const el = dataOutputRef.current;

//     // TODO: Augment global custom event types
//     el?.addEventListener(
//       "lr-file-uploader-minimal",
//       handleUploaderEvent
//     );
//     return () => {
//       el?.removeEventListener(
//         "lr-file-uploader-minimal",
//         handleUploaderEvent
//       );
//     };
//   }, [handleUploaderEvent]);



//   console.log('files',files);

    const  {user} = useAuthContext();
    const { isLoadingMutation, errorMutation, mutate } = useMutation();

    const {
        isLoadingEmployees,
        errorEmployees,
        invalidateEmployees,
        data: employeesData
    } = useFetch(`/realEstateAgencies/own/employees`);

    const {
        isLoadingTypes,
        errorTypes,
        invalidateTypes,
        data: typesData
    } = useFetch(`/realEstates/types`);

    const {
        isLoadingSubtypes,
        errorSubtypes,
        invalidateSubtypes,
        data: subtypesData
    } = useFetch(`/realEstates/subTypes`);

    const [formValues, setFormvalues] = useState({
        images: [],
        realEstate:{
            type: '647247df074b3fc072e14593',
            subType: '',
            sellingMethod: 'renting',
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

    function handleSubmit(publish) {
        mutate(`${process.env.REACT_APP_API_URL}/realEstates/${isNew ? '': realEstateData._id}`, {
            method: isNew ? "POST" : "PATCH",
            data: {
                ...formValues, 
                published: publish,
                appointedRealEstateAgentId: user._id.toString(),
                agencyId: employeesData.realEstateAgencyId.toString()
            },
            onSuccess: (data) => {
                console.log(data);
                
            }
        });
    }

    // useEffect(() => {
    //     if (typesData) {
    //       setFormvalues(prevValues => ({
    //         ...prevValues,
    //         realEstate: {
    //           ...prevValues.realEstate,
    //           // Set default value to the first type
    //           type: typesData[0]._id 
    //         }
    //       }));
    //     }
    //   }, [typesData]);

    // console.log(typesData, 'types');
    // console.log(subtypesData, 'subtypes');


    // useEffect(() => {
    //     if (subtypesData && typesData) {
    //         const selectedType = typesData.find((type) => type._id === formValues.realEstate.type);
        
    //         if(selectedType && subtypesData.length> 0){
    //             subtypesData.forEach(subType=> {
    //                 subType.typeId === selectedType._id && setSubTypesAvailable(true);
    //             })
                
    //         }
            
    //     }
        
    // }, [formValues.realEstate.type, subtypesData, typesData]);

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


    // async function handleImageChange(e) {
    //     const files = Array.from(e.target.files);
    //     const fileURLs = files.map(async (file) => {
    //         const result = await uploadDirect(
    //             file,
    //             {
    //             publicKey: '2773840e0b025e56fd6a',
    //             store: 'auto',
    //             }
    //         )

    //         const imagesArray = [...formValues, result];
    //         return imagesArray;
    //     });

    //     setFormvalues((prevFormValues) => ({
    //         ...prevFormValues,
    //         images: fileURLs,
    //     }));

    //     // fileData must be `Blob` or `File` or `Buffer`
       
      
        
    // }

    console.log(formValues);


    if(isLoadingTypes && isLoadingSubtypes){
        return <Loading/>
    }

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <DashboardAccountSidebar 
                navItems={SIDEBAR_NAV_ITEMS.dashboard.agency}
                
                activeItem={'Panden'}/>

            </div>

            <main className={styles.favoritesContainer}>
                {
                    errorTypes || errorSubtypes || typesData === undefined?

                    <p>Er is een fout opgetreden.</p>

                    :

                    <>
                    <div className={styles.justifyBetween}>
                        <div>
                            <h1>Pand {isNew ? 'toevoegen' : 'wijzigen'}</h1>
                            <p><span className={isNew || !(realEstateData.isPublished) ? styles.redDot: styles.greenDot}></span> {isNew || !(realEstateData.isPublished) ? 'Nog niet gepubliceerd' : 'Gepubliceerd'}</p>
                        </div>
                        
                        {
                            !isNew && realEstateData.isPublished === false &&
                            <button className={styles.secondaryBtn}>Offline halen</button>
                        }

                        <button className={styles.primaryBtn} onClick={()=>{
                            handleSubmit(true)}}>Publiceren</button>
                    </div>
                    

                    <div>
                        <div>
                            <h2>Afbeeldingen</h2>
                            
                            <div className={`${styles.whiteContainerWithoutGrid}`}>
                                {
                                    !isNew &&
                                    <div className={styles.imageContainer}>
                                        <img src="https://ucarecdn.com/cb288972-b141-4509-94ac-02c4dbeb77da/109_1179703_1.jpg" alt="" />
                                        <img src="https://ucarecdn.com/cb288972-b141-4509-94ac-02c4dbeb77da/109_1179703_1.jpg" alt="" />
                                        <img src="https://ucarecdn.com/cb288972-b141-4509-94ac-02c4dbeb77da/109_1179703_1.jpg" alt="" />
                                        <img src="https://ucarecdn.com/cb288972-b141-4509-94ac-02c4dbeb77da/109_1179703_1.jpg" alt="" />

                                    </div>
                                }
                                
                                
                                {/* <div>
                                    <label htmlFor="image">Afbeelding downloaden</label>
                                    <input type="file" name="image" id="image" accept="image/*" multiple onChange={handleImageChange}/>
                                </div> */}

                                {/* <lr-file-uploader-minimal
                                    css-src="https://esm.sh/@uploadcare/blocks@0.22.3/web/file-uploader-minimal.min.css"
                                    ctx-name="imageUploader"
                                    class="imageUploader"

                                    ref={dataOutputRef}
                                    use-event
                                    dataCtx={"imageUploader"}
                                    onEvent={handleUploaderEvent}
                                >
                                </lr-file-uploader-minimal> */}
                            
                            </div>
                        </div>


                        <div>
                            <h2>Gebouw</h2>
                            <div className={styles.whiteContainer}>
                                

                                {/* {typesData && (
                                <SelectWithLabel
                                    handleChange={updateFormValues}
                                    name={'realEstate.type'}
                                    labelText={'Type pand'}
                                    options={typesData.map((type) => ({
                                    label: type.type,
                                    value: type._id,
                                    }))}
                                    activeOption={formValues.realEstate.type}
                                />
                                )} */}


                                {/* {subTypesAvailable ? (
                                    subtypesData.length > 0 && (
                                    <SelectWithLabel
                                        handleChange={updateFormValues}
                                        name={'realEstate.subType'}
                                        labelText={'SubType'}
                                        options={subtypesData
                                        .find((type) => type.typeId === formValues.realEstate.type)
                                        .subTypes.map((subtype) => ({
                                            label: subtype.subType,
                                            value: subtype._id,
                                        }))}
                                        activeOption={formValues.realEstate.subType}
                                    />
                                    )
                                ) : (
                                    <p>No subtypes available for the selected type.</p>
                                )} */}



                                <SelectWithLabel handleChange={updateFormValues} labelText={'Verhuur of verkoop'} name={'realEstate.sellingMethod'} options={[
                                    {
                                        label: 'Verhuren',
                                        value: 'renting'
                                    },
                                    {
                                        label: 'Verkopen',
                                        value: 'selling'
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
                                <button className={styles.secondaryBtn} onClick={()=>{
                                    handleSubmit(false)}}>Opslaan</button>
                                <button className={styles.primaryBtn} onClick={()=>{
                                    handleSubmit(true)
                                }}>Opslaan & publiceren</button>
                            </div>
                        </div>
                    </div>
                    
                    </>

                }
                
            </main>
        </div>
    );
}

export default AddEditRealEstate;