import React, { useEffect, useState } from 'react';

import DashboardAccountSidebar from '../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar';
import styles from './personalData.module.css';
import InputWithLabel from '../../../components/Global/formInputs/input/inputWithLabel/inputWithLabel';
import SIDEBAR_NAV_ITEMS from '../../../consts/sidebarNavItems';
import ROUTES from '../../../consts/routes';
import { useAuthContext } from '../../../contexts/AuthContainer';
import useMutation from '../../../hooks/useMutation';

// import { useAuthContext } from '../../../contexts/AuthContainer';
// import { useAuthContext } from '../../../contexts/AuthContainer.js';


function PersonalData({routePath}) {

    const isUpdatePersonalDataPage = (routePath === ROUTES.account.personalData);
    const [formValues, setFormvalues] = useState({});

    const  {user, login} = useAuthContext();
    const { isLoading, error, mutate } = useMutation();

    useEffect(()=>{
        if(isUpdatePersonalDataPage){
            setFormvalues({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phoneNr: user.phoneNr
        
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
    }, [isUpdatePersonalDataPage, user]);

    

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


    const submitUserDataModifications = (e) => {
        e.preventDefault();
        mutate(`${process.env.REACT_APP_API_URL}/loggedInUser`, {
        method: "PATCH",
        data: formValues,
        onSuccess: (data) => {
            console.log(data);
            login(data);
        },
        });
    };

    const submitAgencyDataModifications = (e) => {
        
    };

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
                <form onSubmit={submitUserDataModifications}>
                    <div className={styles.name}>
                        <InputWithLabel inputType={'text'} name={'firstname'} value={formValues.firstname} labelText={'Voornaam'} handleChange={updateFormValues}/>

                        <InputWithLabel  inputType={'text'} name={'lastname'} value={formValues.lastname} labelText={'Achternaam'} handleChange={updateFormValues}/>
                    </div>

                    <InputWithLabel inputType={'email'} name={'email'} value={formValues.email} labelText={'E-mail'} handleChange={updateFormValues}/>

                    <InputWithLabel inputType={'number'} name={'phoneNr'} value={formValues.phoneNr} labelText={'telefoon nummer'} handleChange={updateFormValues}/>

                    <button className={styles.submitBtn}>Wijzigingen opslaan</button>

                </form>
                : 
                <form onSubmit={submitAgencyDataModifications}>
                    <InputWithLabel inputType={'text'} name={'name'} value={formValues.name} labelText={'Naam'} handleChange={updateFormValues}/>
                    
                    <div className={styles.imageContainer}>
                        <label htmlFor="image">Afbeelding</label>
                        <img src="https://ucarecdn.com/cb288972-b141-4509-94ac-02c4dbeb77da/109_1179703_1.jpg" alt="" />
                        <input type="file" name="image" id="image" accept="image/*" />
                    </div>
                    

                    <InputWithLabel inputType={'email'} name={'email'} value={formValues.email} labelText={'E-mail'} handleChange={updateFormValues}/>

                    <InputWithLabel inputType={'number'} name={'phoneNumber'} value={formValues.phoneNr} labelText={'telefoon nummer'} handleChange={updateFormValues}/>

                    <button className={styles.submitBtn}>Wijzigingen opslaan</button>

                </form>
                }
                
            </main>
        </div>
    );
}

export default PersonalData;