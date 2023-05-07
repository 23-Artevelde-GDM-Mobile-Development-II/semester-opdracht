import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from '../../consts/routes';
import style from "./authentication.module.css";
import Header from "../../components/Global/header/header";
import Footer from "../../components/Global/footer/footer";
import NotFound from "../notFound/notFound";
import Home from "../home/home";
import SearchRealEstate from "../searchRealEstate/searchRealEstate";

const Authentication = () => {

    return (
        <div className={`${style.wrap}`}>
            <Router>
                <Header />
                    <Routes>
                        <Route path={ROUTES.home} element={<Home />}/>
                        <Route path={ROUTES.searchRealEstate} element={<SearchRealEstate/>} />
                        <Route path='*' element={<NotFound/>} />
                    </Routes>

                <Footer />
            </Router>
        </div>
    );
};

export default Authentication;