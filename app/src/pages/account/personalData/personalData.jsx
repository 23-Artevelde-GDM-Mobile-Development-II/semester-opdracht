import React, { useEffect, useState } from 'react';

import DashboardAccountSidebar from '../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar';
import styles from './personalData.module.css';
import InputWithLabel from '../../../components/Global/formInputs/input/inputWithLabel/inputWithLabel';
import SIDEBAR_NAV_ITEMS from '../../../consts/sidebarNavItems';
import ROUTES from '../../../consts/routes';


function PersonalData({routePath}) {

    const isUpdatePersonalDataPage = (routePath === ROUTES.account.personalData);
    const [formValues, setFormvalues] = useState({});

    useEffect(()=>{
        if(isUpdatePersonalDataPage){
            setFormvalues({
                firstName: '',
                lastName: '',
                email: '',
                phoneNr: undefined
        
            })
        }else{
            // Real estate agency data fields
            setFormvalues({
                name: '',
                image: '',
                email: '',
                phoneNr: undefined
        
            })
        }
    }, [isUpdatePersonalDataPage]);

    console.log(isUpdatePersonalDataPage);

    

    function updateFormValues(e) {
        const {name, value} = e.target;
        console.log(e.currentTarget);
        setFormvalues(prevFormValues => {
            return {
                ...prevFormValues,
                [name]: value
            }
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <DashboardAccountSidebar 
                navItems={ isUpdatePersonalDataPage? SIDEBAR_NAV_ITEMS.account: SIDEBAR_NAV_ITEMS.dashboard.agency}
                
                activeItem={isUpdatePersonalDataPage? 'Persoonlijke gegevens': 'Gegevens immokantoor'}/>

            </div>

            <main className={styles.personalDataContainer}>
                <h1>{isUpdatePersonalDataPage? 'Persoonlijke gegevens': 'Gegevens immokantoor'}</h1>

                {isUpdatePersonalDataPage? 
                <div>
                    <div className={styles.name}>
                        <InputWithLabel inputType={'text'} name={'firstName'} value={formValues.firstName} labelText={'Voornaam'} handleChange={updateFormValues}/>

                        <InputWithLabel  inputType={'text'} name={'lastName'} value={formValues.lastName} labelText={'Achternaam'} handleChange={updateFormValues}/>
                    </div>

                    <InputWithLabel inputType={'email'} name={'email'} value={formValues.email} labelText={'E-mail'} handleChange={updateFormValues}/>

                    <InputWithLabel inputType={'number'} name={'phoneNumber'} value={formValues.phoneNr} labelText={'telefoon nummer'} handleChange={updateFormValues}/>

                </div>
                : 
                <div>
                    <InputWithLabel inputType={'text'} name={'name'} value={formValues.name} labelText={'Naam'} handleChange={updateFormValues}/>
                    
                    <div className={styles.imageContainer}>
                        <label htmlFor="image">Afbeelding</label>
                        <img src="https://ucarecdn.com/cb288972-b141-4509-94ac-02c4dbeb77da/109_1179703_1.jpg" alt="" />
                        <input type="file" name="image" id="image" accept="image/*" />
                    </div>
                    

                    <InputWithLabel inputType={'email'} name={'email'} value={formValues.email} labelText={'E-mail'} handleChange={updateFormValues}/>

                    <InputWithLabel inputType={'number'} name={'phoneNumber'} value={formValues.phoneNr} labelText={'telefoon nummer'} handleChange={updateFormValues}/>

                </div>
                }
                
            </main>
        </div>
    );
}

export default PersonalData;