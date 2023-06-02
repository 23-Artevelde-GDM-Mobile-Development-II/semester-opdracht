import { useEffect, useState } from "react";
import InputWithLabel from "../../../../../components/Global/formInputs/input/inputWithLabel/inputWithLabel";
import Loading from "../../../../../components/Global/loading/loading";
import Popup from "../../../../../components/Global/popups/popup/popup";
import DashboardAccountSidebar from "../../../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar";
import RegularTable from "../../../../../components/Global/tables/regularTable/regularTable";
import SIDEBAR_NAV_ITEMS from "../../../../../consts/sidebarNavItems";
import useFetch from "../../../../../hooks/useFetch";
import styles from "./usersOverview.module.css";
import useMutation from "../../../../../hooks/useMutation";
import { useNavigate } from "react-router-dom";


function UsersOverview() {

  const navigate = useNavigate();
  const { isLoadingMutation, errorMutation, mutate } = useMutation();
  const [isEdit, setIsEdit] = useState(false);

  const [usersData, setUsersData] = useState([]);


//   Get all users
  const {
    isLoading,
    error,
    invalidate,
    data
    } = useFetch(`/users`);

    useEffect(()=>{
        
        let isActive = true;
        if (data && isActive) {
            const usersArray = data.map(user => (
                [
                    user._id,
                    user.firstname,
                    user.lastname,
                    user.email,
                    user.phoneNr
                ]
            ))

            setUsersData(usersArray);

        };
    
        return () => isActive = false;
    }, [data])


  function openPopup() {
    document.querySelector('dialog').showModal();
  }

  const [formPopupValues, setFormPopupValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNr: '',
    password: ''
  });

  function generateRandomPassword() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 12;
    let password = "";

    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
    }

    setFormPopupValues(prevValues => (
        {
            ...prevValues,
            password: password
        }
    ))
  }

  function handleFormUpdate(event){
    const {name, value} = event.target;
    
    setFormPopupValues(prevFormData => {
        return {
            ...prevFormData,
            [name] : value
        }
    })
  }

  function copyToClipboard(){
    navigator.clipboard.writeText(formPopupValues.password);
  }

  function handleSubmit(e, method){
    e.preventDefault();
    mutate(`${process.env.REACT_APP_API_URL}/users/${method === "POST" ? 'add': ''}`, {
        method: method,
        body: formPopupValues,
        onSuccess: (data) => {
            navigate(0);
        },
    });
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div>
        {/* Popup to search users that you can add to this agency */}
        <Popup>
            <h2>Creër een nieuwe gebruiker</h2>
           
            <form onSubmit={(e)=> isEdit ? '' : handleSubmit(e, "POST")}>
                { errorMutation &&
                    <p>{errorMutation}</p>
                }
                
                <div className={styles.name}>
                    <InputWithLabel inputType={'text'} name={'firstname'} value={formPopupValues.firstname} labelText={'Voornaam'} handleChange={handleFormUpdate}/>

                    <InputWithLabel  inputType={'text'} name={'lastname'} value={formPopupValues.lastname} labelText={'Achternaam'} handleChange={handleFormUpdate}/>
                </div>

                <InputWithLabel inputType={'email'} name={'email'} value={formPopupValues.email} labelText={'E-mail'} handleChange={handleFormUpdate}/>

                <InputWithLabel inputType={'number'} name={'phoneNr'} value={formPopupValues.phoneNr} labelText={'telefoon nummer'} handleChange={handleFormUpdate}/>

                <button type="button" onClick={generateRandomPassword}>Genereer een wachtwoord</button>
                <p className="" onClick={copyToClipboard}>Klik hier om het gegenereerde wachtwoord te kopieren.</p>
                    

                <button className={styles.secondaryBtn}>Voeg een nieuwe gebruiker toe</button>
            </form>
            
        </Popup>

        <div className={styles.container}>
          <div className={styles.sidebar}>
            <DashboardAccountSidebar
              navItems={SIDEBAR_NAV_ITEMS.dashboard.admin}
              activeItem={'Gebruikers'}
            />
          </div>

          {error ? (
            <p>Er is iets misgelopen.</p>
          ) : (
            <main className={styles.employeesContainer}>
              <div className={styles.justifyBetween}>
                <h1>Gebruikers</h1>
                <button
                  className={styles.secondaryBtn}
                  onClick={openPopup}
                >
                  Nieuw
                </button>
              </div>

              <RegularTable
                  columnNames={['Voornaam', 'Achternaam', 'Email', 'Telefoon nummer']}
                  data={usersData}
                  removeOnly={false}
                  usersTable={true}
                  deleteAction={"deleteUser"}
                />
              
            </main>
          )}
        </div>
      </div>
    );
  }
}

export default UsersOverview;
