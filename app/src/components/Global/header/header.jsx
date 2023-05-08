import React from 'react';
import {Link} from 'react-router-dom';
import ROUTES from '../../../consts/routes';
import styles from './header.module.css';
import PrimaryBtnLink from '../btns/primaryBtnLink/primaryBtnLink';
import SecondaryBtnLink from '../btns/secondaryBtnLink/secondaryBtnLink';

const Header = () => {
    const isLoggedIn = false;
    return (
        <header className={styles.header}> 
            {/* <header className={`md:flex md:justify-between py-8 px-12 shadow-md fixed w-full top-0 bg-white ${className}`}> */}
            <div className='flex justify-between'>
                {/* LOGO */}
                <Link to={ROUTES.home} className='font-josefin-sans text-xl text-indigo-400'>
                    <h2>Home sweet home</h2>
                </Link>
                
                {/* <button>
                    <i className="fa-solid fa-bars md:hidden cursor-pointer"></i>
                </button> */}
            </div>
            
            {/* NAVLINKS */}
            <nav>
                <ul className={`md:flex md:justify-between gap-8`}>
                    <li className='my-8 md:m-0'>
                        <Link className="hover:text-primair-blue" to={'/zoeken'}>Zoeken</Link>
                    </li>
                    <li className='my-8 md:m-0'>
                        <Link className="hover:text-primair-blue" to={'/makelaars'}>Vind je makelaar</Link>
                    </li>
                    

                    {/* Check if user is logged in */}
                    {isLoggedIn ? (
                        <Link to="/account/persoonlijke-gegevens"><i className="fa-solid fa-user text-xl hover:text-primair-blue"></i></Link>
                    ) : (
                        // <span className='btns md:flex md:justify-between gap-x-4'>
                        <>
                            <li className='mb-8 md:m-0'>
                                <PrimaryBtnLink location={'/registreer'} text={'Registreren'}/>
                            </li>
                            <li className='mb-8 md:m-0'><SecondaryBtnLink location={'/inloggen'} text={'Inloggen'}/></li>
                        </>
                        // </span>
                    )}

                </ul>
            </nav>
            
        </header>
    );
};

export default Header;