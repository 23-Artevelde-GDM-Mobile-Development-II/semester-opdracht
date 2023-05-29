import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from '../../consts/routes';
import style from "./authentication.module.css";
import Header from "../../components/Global/header/header";
import Footer from "../../components/Global/footer/footer";
import NotFound from "../notFound/notFound";
import Home from "../home/home";
import SearchRealEstate from "../searchRealEstate/searchRealEstate";
import RealEstateDetail from "../realEstateDetail/realEstateDetail";
import PersonalData from "../account/personalData/personalData";
import Favorites from "../account/favorites/favorites";
import Messages from "../account/messages/messages";
import UpdateRealEstates from "../dashboard/agency/updateRealEstates/updateRealEstates";
import AddEditRealEstate from "../dashboard/agency/updateRealEstates/addEditRealEstate/addEditRealEstate";
import LogIn from "../authorization/logIn";
import Register from "../authorization/register";
// import LoginContainer from "../authorization/logic/loginContainer";
import EmployeesTable from "../dashboard/agency/employees/employees";
import AuthContainer from "../../contexts/AuthContainer";

const Authentication = () => {

    return (
        <div className={`${style.wrap}`}>
            <Router>
                <Header />
                <AuthContainer>
                    <Routes>
                        <Route path={ROUTES.login} element={<LogIn />}/>
                        {/* <Route path={ROUTES.login} element={<LoginContainer />}/> */}
                        <Route path={ROUTES.register} element={<Register />}/>
                        {/* Routes for regular users */}
                        <Route path={ROUTES.home} element={<Home />}/>
                        <Route path={ROUTES.searchRealEstate} element={<SearchRealEstate/>} />
                        <Route path={ROUTES.realEstateDetail} element={<RealEstateDetail/>} />
                       
                            <Route path={ROUTES.account.personalData} element={<PersonalData routePath={ROUTES.account.personalData}/>} />
                        
                        
                        <Route path={ROUTES.account.favorites} element={<Favorites/>} />
                        <Route path={ROUTES.account.messages} element={<Messages userStatus={'regular user'}/>} />

                        {/* Routes for real estate agents */}

                        {/* I need to check in this file if the logged in user is allowed to acces these routes, if that's not the case they should be rederected to a page with a 403 error */}

                        <Route path={ROUTES.dashboard.agency.realEstate.get} element={<UpdateRealEstates userStatus={'agent'}/>} />
                        
                        <Route path={ROUTES.dashboard.agency.realEstate.post} element={<AddEditRealEstate isNew={true}/>} />
                        
                        <Route path={ROUTES.dashboard.agency.messages} element={<Messages userStatus={'agent'}/>} />

                        <Route path={ROUTES.dashboard.agency.employees} element={<EmployeesTable userStatus={'agent'}/>} />

                        <Route path={ROUTES.dashboard.agency.agencyData} element={<PersonalData routePath={ROUTES.dashboard.agency.agencyData}/>} />



                        <Route path='*' element={<NotFound/>} />
                    </Routes>
                </AuthContainer>
                <Footer />
            </Router>
        </div>
    );
};

export default Authentication;