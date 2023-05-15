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

const Authentication = () => {

    return (
        <div className={`${style.wrap}`}>
            <Router>
                <Header />
                    <Routes>
                        {/* Routes for regular users */}
                        <Route path={ROUTES.home} element={<Home />}/>
                        <Route path={ROUTES.searchRealEstate} element={<SearchRealEstate/>} />
                        <Route path={ROUTES.realEstateDetail} element={<RealEstateDetail/>} />
                        <Route path={ROUTES.account.personalData} element={<PersonalData/>} />
                        <Route path={ROUTES.account.favorites} element={<Favorites/>} />
                        <Route path={ROUTES.account.messages} element={<Messages userStatus={'regular user'}/>} />

                        {/* Routes for real estate agents */}

                        {/* I need to check in this file if the logged in user is allowed to acces these routes, if that's not the case they should be rederected to a page with a 403 error */}

                        <Route path={ROUTES.dashboard.agency.realEstate.get} element={<UpdateRealEstates userStatus={'agent'}/>} />
                        
                        <Route path={ROUTES.dashboard.agency.realEstate.post} element={<AddEditRealEstate isNew={true}/>} />
                        
                        <Route path={ROUTES.dashboard.agency.messages} element={<Messages userStatus={'agent'}/>} />



                        <Route path='*' element={<NotFound/>} />
                    </Routes>

                <Footer />
            </Router>
        </div>
    );
};

export default Authentication;