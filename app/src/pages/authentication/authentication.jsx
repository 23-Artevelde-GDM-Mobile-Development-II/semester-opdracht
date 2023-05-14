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

const Authentication = () => {

    return (
        <div className={`${style.wrap}`}>
            <Router>
                <Header />
                    <Routes>
                        <Route path={ROUTES.home} element={<Home />}/>
                        <Route path={ROUTES.searchRealEstate} element={<SearchRealEstate/>} />
                        <Route path={ROUTES.realEstateDetail} element={<RealEstateDetail/>} />
                        <Route path={ROUTES.account.personalData} element={<PersonalData/>} />
                        <Route path={ROUTES.account.favorites} element={<Favorites/>} />
                        <Route path={ROUTES.account.messages} element={<Messages/>} />

                        <Route path='*' element={<NotFound/>} />
                    </Routes>

                <Footer />
            </Router>
        </div>
    );
};

export default Authentication;