import { useState } from "react";
import InputWithLabel from "../../components/Global/formInputs/input/inputWithLabel/inputWithLabel";
import PasswordWithLabel from "../../components/Global/formInputs/input/passwordWithLabel/passwordWithLabel";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/routes";
import styles from "./authorization.module.css";
import useMutation from "../../hooks/useMutation";
import { useAuthContext } from "../../contexts/AuthContainer";

function Register() {

    const { isLoading, error, mutate } = useMutation();
    const [validationError, setValidationError] = useState(null);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phoneNr: "",
        password: ""
    });

    const {login} = useAuthContext();

    console.log(error);

    function updateFormData(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        mutate(`${process.env.REACT_APP_API_URL}/users/add`, {
        method: "POST",
        data: formData,
        onSuccess: (data) => {
            console.log(data);
            login(data);
        },
        });
    };
    



  return (
    <div className="auth">
        <div className={styles.authContainer}>
            <div className={styles.authorizationCard}>
                <div className={`${styles.cardContent} ${styles.scrollContainer}`}>
        

                    <form onSubmit={handleSubmit}>
                        <h2 className={styles.title}>Registreer</h2>
                        
                        {
                            error !== null && error !== undefined && error.length>1 ?
                            error.map((err, i) => (
                                <div>
                                    <p key={i} className={styles.errorMessage}>{err}</p>
                                </div>
                            ))
                            :
                            <p className={styles.errorMessage}>{error}</p>

                            
                        }

                        <div className={styles.inputsFlex}>
                            <InputWithLabel name={"firstname"} labelText={"Voornaam"} inputType={"text"} value={formData.firstname} handleChange={updateFormData}/>
                            <InputWithLabel name={"lastname"} labelText={"Achternaam"} inputType={"text"} value={formData.lastname} handleChange={updateFormData}/>
                        
                        </div>
                        
                        <InputWithLabel name={"email"} labelText={"E-mail"} inputType={"text"} value={formData.email} handleChange={updateFormData}/>

                        <InputWithLabel name={"phoneNr"} labelText={"Telefoon nummer"} inputType={"text"} value={formData.phoneNr} handleChange={updateFormData}/>

                        <PasswordWithLabel name={"password"} labelText={"Wachtwoord"} value={formData.password} handleChange={updateFormData}/>
                        

                        <button className={styles.submitBtn} disabled={isLoading}>Registreer</button>

                        <div className={styles.toOtherPage}>
                            <span>Heb je al een account?</span><Link to={ROUTES.login}>Log je hier in</Link>
                        </div>
                            
                    </form>

                    {/* image */}
                    {/* <div className=""> */}
                        
                    {/* </div> */}

                    
                </div>

            <img src="https://images.unsplash.com/photo-1593604340846-4fbe9763a8f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="house" className={styles.sideImage}/>

            </div>
        </div>
      
    </div>    
    
  );
}
export default Register;