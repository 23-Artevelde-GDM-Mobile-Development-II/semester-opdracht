import { useState } from "react";
import styles from "./authorization.module.css";
import InputWithLabel from "../../components/Global/formInputs/input/inputWithLabel/inputWithLabel";
import PasswordWithLabel from "../../components/Global/formInputs/input/passwordWithLabel/passwordWithLabel";
import ROUTES from "../../consts/routes";
import { Link } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import { useAuthContext } from "../../contexts/AuthContainer";
// import { useAuthContext } from "../../contexts/AuthContainer";
// import { useAuthContext } from "../../contexts/AuthContainer";


function LogIn({initialError }) {
  
    const { handleLogin } = useAuthContext;

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { isLoading, error, mutate } = useMutation();

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
        mutate(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        data: formData,
        onSuccess: (data) => {
            console.log(data);
            handleLogin(data);
        },
        });
    };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     mutate(`${process.env.REACT_APP_API_URL}/register`, {
//       method: "POST",
//       data,
//       onSuccess: (data) => {
//         onLogin(data);
//       },
//     });
//   };
    

  return (
    <div className="auth">
        <div className={styles.authContainer}>
            <div className={styles.authorizationCard}>
    

                <div className={styles.cardContent}>
                    <h2 className={styles.title}>Log in</h2>

                    {/* {(() => {
                        if (userNotFound === true) {
                            return <p className="text-red-500 mb-4 mt-[-1em]">There is no user with this email address or password!</p>
                        }
                    })()} */}

                    {
                        error && 
                        error.map((err, i)=> (
                            <p key={i} className={styles.errorMessage}>{err}</p>
                        ))
                        
                    }

                    
                    <InputWithLabel name={"email"} labelText={"E-mail"} inputType={"email"} value={formData.email} handleChange={updateFormData}/>
                    
                    <PasswordWithLabel name={"password"} labelText={"Wachtwoord"} value={formData.password} handleChange={updateFormData}/>
                    

                    <button className={styles.submitBtn} disabled={isLoading} onClick={handleSubmit}>Log in</button>

                    <div className={styles.toOtherPage}>
                        <span>Heb je nog geen account?</span><Link to={ROUTES.register}>Registreer je hier</Link>
                    </div>
                        
                </div>

                {/* image */}
                {/* <div className=""> */}
                    <img src="https://images.unsplash.com/photo-1593604340846-4fbe9763a8f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="house" className={styles.sideImage}/>
                {/* </div> */}

                
            </div>
        </div>
      
    </div>    
    
  );
}
export default LogIn;