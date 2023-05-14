import React, { useState } from 'react';

import DashboardAccountSidebar from '../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar';
import styles from './personalData.module.css';
import InputWithLabel from '../../../components/Global/formInputs/input/inputWithLabel/inputWithLabel';
import SIDEBAR_NAV_ITEMS from '../../../consts/sidebarNavItems';


function PersonalData() {

    const [formValues, setFormvalues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNr: undefined

    });

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
                navItems={SIDEBAR_NAV_ITEMS.account}
                
                activeItem={'Persoonlijke gegevens'}/>

            </div>

            <main className={styles.personalDataContainer}>
                <h1>Persoonlijke gegevens</h1>

                <div>
                    <div className={styles.name}>
                        <InputWithLabel inputType={'text'} name={'firstName'} value={formValues.firstName} labelText={'Voornaam'} handleChange={updateFormValues}/>

                        <InputWithLabel  inputType={'text'} name={'lastName'} value={formValues.lastName} labelText={'Achternaam'} handleChange={updateFormValues}/>
                    </div>

                    <InputWithLabel inputType={'email'} name={'email'} value={formValues.email} labelText={'E-mail'} handleChange={updateFormValues}/>

                    <InputWithLabel inputType={'number'} name={'phoneNumber'} value={formValues.phoneNr} labelText={'telefoon nummer'} handleChange={updateFormValues}/>

                </div>
            </main>
        </div>
    );
}

export default PersonalData;