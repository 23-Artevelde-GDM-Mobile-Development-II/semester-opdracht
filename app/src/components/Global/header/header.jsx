import React from 'react';
import {Link} from 'react-router-dom';
import ROUTES from '../../../consts/routes';
import styles from './header.module.css';
import PrimaryBtnLink from '../btns/primaryBtnLink/primaryBtnLink';
import SecondaryBtnLink from '../btns/secondaryBtnLink/secondaryBtnLink';
import { useAuthContext } from '../../../contexts/AuthContainer';

const Header = () => {
    
    const {user} = useAuthContext();

    return (
        <header className={styles.header}> 
            {/* <header className={`md:flex md:justify-between py-8 px-12 shadow-md fixed w-full top-0 bg-white ${className}`}> */}
            <div className='flex justify-between'>
                {/* LOGO */}
                <Link to={ROUTES.home} className='font-josefin-sans text-xl text-indigo-400'>
                    <h2>Home sweet home</h2>
                </Link>
                
            </div>
            
            {/* NAVLINKS */}
            <nav>
                <ul className={`md:flex md:justify-between gap-8`}>
                    <li className='my-8 md:m-0'>
                        <Link className="hover:text-primair-blue" to={'/zoeken'}>Zoeken</Link>
                    </li>

                    

                    {/* Check if user is logged in */}
                    {user ? (
                        <>
                            <Link to={ROUTES.dashboard.admin.users}>Admin dashboard</Link>
                            <Link to={ROUTES.dashboard.agency.agencyData}>Makelaar dashboard</Link>
                            <Link to={ROUTES.account.personalData}><i className="fa-solid fa-user text-xl hover:text-primair-blue"></i></Link>
                        </>
                        


                    ) : (
                        <>
                            <li>
                                <PrimaryBtnLink location={'/registreer'} text={'Registreren'}/>
                            </li>
                            <li><SecondaryBtnLink location={'/inloggen'} text={'Inloggen'}/></li>
                        </>
                    
                    )}

                </ul>
            </nav>
            
        </header>
    );
};

export default Header;