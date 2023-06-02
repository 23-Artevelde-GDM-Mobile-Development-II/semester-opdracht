import LogIn from "../pages/authorization/logIn";
import { useAuthContext } from "./AuthContainer";

const UserContainer = ({children}) => {
  const { user, logout, login, globalError } = useAuthContext();


    if(!user){
        // If user does not exist, return LoginScreen component and pass handleLogin function as a prop
        return <LogIn onLogin={login} initialError={globalError} />;
    }else{
        return <>{children}</>
    }

  
   
};

export default UserContainer;