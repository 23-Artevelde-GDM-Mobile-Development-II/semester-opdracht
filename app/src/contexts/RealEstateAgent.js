import NotAuthorized from "../pages/notAuthorized/notAuthorized";
import { useAuthContext } from "./AuthContainer";
import useFetch from "../hooks/useFetch";
import { createContext, useContext } from "react";

const RealEstateAgentContext = createContext();

const RealEstateContainer = ({children}) => {
  const { user, logout } = useAuthContext();

  // Check if the user is an admin or an real estate agent, if not, display the NotAuthorized component
  const {
    isLoading,
    error,
    invalidate,
    data
  } = useFetch(`/realEstateAgencies/own`);

  if (user && (user.roles === 'realEstateAgent' || user.roles === 'admin')) {
    if(!isLoading && data){
      console.log('Data----', data);
      return (
        <RealEstateAgentContext.Provider value={{realEstateAgencyData: data}}>
          {children}
        </RealEstateAgentContext.Provider>
      );
    }
    
  }else{
    return <NotAuthorized errorMessage={'U heeft niet de juiste rechten om deze pagina te bekijken.'}/>;
  }
  
};

// Custom hook to access AuthContext in child components
export const useRealEstateAgentContext = () => {
  return useContext(RealEstateAgentContext);
};

export default RealEstateContainer;
