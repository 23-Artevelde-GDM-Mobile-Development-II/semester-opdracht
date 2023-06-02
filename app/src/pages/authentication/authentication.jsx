import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import UserContainer from "../../contexts/UserContainer";
import AdminContainer from "../../contexts/AdminContainer";
import RealEstateContainer from "../../contexts/RealEstateAgent";
import TypesList from "../dashboard/admin/typesList/typesList";
import UsersOverview from "../dashboard/admin/typesList/usersOverview/usersOverview";

const Authentication = () => {

    // return (
    //     <div className={`${style.wrap}`}>
    //         <Router>
    //             <Header />
    //             <AuthContainer>
    //                 <Routes>
    //                     <Route exact path={ROUTES.login} element={<LogIn />}/>
    //                     {/* <Route path={ROUTES.login} element={<LoginContainer />}/> */}
    //                     <Route exact path={ROUTES.register} element={<Register />}/>
    //                     {/* Routes for regular users */}
    //                     <Route exact path={ROUTES.home} element={<Home />}/>
    //                     <Route path={ROUTES.searchRealEstate} element={<SearchRealEstate/>} />
    //                     <Route path={ROUTES.realEstateDetail} element={<RealEstateDetail/>} />

    //                     <Route path="/account/*" element={
    //                         <UserContainer>
    //                             <h1>Hello there</h1>
    //                             <Routes>
    //                                 <Route path={ROUTES.account.personalData} element={<PersonalData routePath={ROUTES.account.personalData}/>} />
                        
    //                                 <Route path={ROUTES.account.favorites} element={<Favorites/>} />

    //                                 <Route path={ROUTES.account.messages} element={<Messages userStatus={'regular user'}/>} />
    //                             </Routes>
    //                         </UserContainer>
    //                     }/>

                        
                        

    //                     {/* Routes for real estate agents */}

    //                     {/* I need to check in this file if the logged in user is allowed to acces these routes, if that's not the case they should be rederected to a page with a 403 error */}

    //                     <Route path={ROUTES.dashboard.agency.realEstate.get} element={<UpdateRealEstates userStatus={'agent'}/>} />
                        
    //                     <Route path={ROUTES.dashboard.agency.realEstate.post} element={<AddEditRealEstate isNew={true}/>} />
                        
    //                     <Route path={ROUTES.dashboard.agency.messages} element={<Messages userStatus={'agent'}/>} />

    //                     <Route path={ROUTES.dashboard.agency.employees} element={<EmployeesTable userStatus={'agent'}/>} />

    //                     <Route path={ROUTES.dashboard.agency.agencyData} element={<PersonalData routePath={ROUTES.dashboard.agency.agencyData}/>} />



    //                     <Route path='*' element={<NotFound/>} />
    //                 </Routes>
    //             </AuthContainer>
    //             <Footer />
    //         </Router>
            
    //     </div>
    // );


    return (
        <div className={`${style.wrap}`}>
            <Router>
               
            
                {/* The user can acces these routes without having to log in. */}
                <AuthContainer>
                <Header />
                    <Routes>
                        <Route path={ROUTES.home} element={<Home />}/>
                        <Route path={ROUTES.login} element={<LogIn />}/>
                        <Route path={ROUTES.register} element={<Register />}/>
                        <Route path={ROUTES.searchRealEstate} element={<SearchRealEstate/>} />
                        <Route path={ROUTES.realEstateDetail} element={<RealEstateDetail/>} />
                    </Routes>

                    {/* The user needs to be logged in to access thes routes. */}
                    <UserContainer>
                        <Routes>
                            <Route path={ROUTES.account.personalData} element={<PersonalData routePath={ROUTES.account.personalData}/>} />

                            <Route path={ROUTES.account.favorites} element={<Favorites/>} />
                            <Route path={ROUTES.account.messages} element={<Messages userStatus={'regular user'}/>} />
                        </Routes>
                    </UserContainer>
                    
                    {/* The user needs to be an real estate agent or an admin to acces these routes. */}
                    <RealEstateContainer>
                        <Routes>
                            <Route path={ROUTES.dashboard.agency.realEstate.get} element={<UpdateRealEstates userStatus={'agent'}/>} />

                            <Route path={ROUTES.dashboard.agency.realEstate.post} element={<AddEditRealEstate isNew={true}/>} />

                            <Route path={ROUTES.dashboard.agency.messages} element={<Messages userStatus={'agent'}/>} />

                            <Route path={ROUTES.dashboard.agency.employees} element={<EmployeesTable userStatus={'agent'}/>} />

                            <Route path={ROUTES.dashboard.agency.agencyData} element={<PersonalData routePath={ROUTES.dashboard.agency.agencyData}/>} />
                        </Routes>
                    </RealEstateContainer>

                    {/* The user needs to be an admin to have acces to these routes. */}
                    <AdminContainer>
                        <Routes>
                            <Route path={ROUTES.dashboard.admin.types} element={<TypesList/>}/>
                            <Route path={ROUTES.dashboard.admin.users} element={<UsersOverview/>}/>
                        </Routes>
                    </AdminContainer>
                        
                </AuthContainer>
                
                <Routes>
                    <Route path='*' element={<NotFound/>} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
};

export default Authentication;