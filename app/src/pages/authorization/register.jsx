import { useState } from "react";
import InputWithLabel from "../../components/Global/formInputs/input/inputWithLabel/inputWithLabel";
import PasswordWithLabel from "../../components/Global/formInputs/input/passwordWithLabel/passwordWithLabel";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/routes";
import styles from "./authorization.module.css";

function Register() {
    const [registerFirstName, setRegisterFirstName] = useState("");
    const [registerLastName, setRegisterLastName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerPhoneNr, setRegisterPhoneNr] = useState("");
    // const [userNotFound, setUserNotFound] = useState(false);
    const [validationError, setValidationError] = useState(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNr: "",
        password: ""
    });

    function updateFormData(params) {
        
    }




  return (
    <div className="auth">
        <div className={styles.authContainer}>
            <div className={styles.authorizationCard}>
                <div className={`${styles.cardContent} ${styles.scrollContainer}`}>
        

                    <div>
                        <h2 className={styles.title}>Registreer</h2>
                        
                        {
                            validationError !== null && <p className={styles.errorMessage}>{validationError}</p>
                            
                        }

                        <div className={styles.inputsFlex}>
                            <InputWithLabel name={"firstName"} labelText={"Voornaam"} inputType={"text"} value={formData.firstName} handleChange={updateFormData}/>
                            <InputWithLabel name={"lastName"} labelText={"Achternaam"} inputType={"text"} value={formData.lastName} handleChange={updateFormData}/>
                        
                        </div>
                        
                        <InputWithLabel name={"email"} labelText={"E-mail"} inputType={"text"} value={formData.email} handleChange={updateFormData}/>

                        <InputWithLabel name={"phoneNr"} labelText={"Telefoon nummer"} inputType={"text"} value={formData.phoneNr} handleChange={updateFormData}/>

                        <PasswordWithLabel name={"password"} labelText={"Wachtwoord"} value={formData.password} handleChange={updateFormData}/>
                        

                        <button className={styles.submitBtn}>Registreer</button>

                        <div className={styles.toOtherPage}>
                            <span>Heb je al een account?</span><Link to={ROUTES.login}>Log je hier in</Link>
                        </div>
                            
                    </div>

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