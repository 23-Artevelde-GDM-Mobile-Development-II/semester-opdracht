import { createContext } from "react";
import NotAuthorized from "../pages/notAuthorized/notAuthorized";
import { useAuthContext } from "./AuthContainer";

const RealEstateAgentContext = createContext();
const AdminContainer = ({children}) => {
  const { user, logout } = useAuthContext();

  // Check if the user is an admin, if not, display the NotAuthorized component
  // console.log(user, 'Admin');
  // if (!user || user.roles !== 'admin') {
  //   return <NotAuthorized errorMessage={'U heeft niet de juiste rechten om deze pagina te bekijken.'}/>;
  // }

  // // Render the children components
  // return <>{children}</>;

  if (user && user.roles === 'admin') {
    return <>{children}</>
  }else{
    return <NotAuthorized errorMessage={'U heeft niet de juiste rechten om deze pagina te bekijken.'}/>;
  }
  
};

export default AdminContainer;
