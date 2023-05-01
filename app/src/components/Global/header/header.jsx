import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../consts/routes';
import style from './header.module.css';
import PrimaryBtnLink from '../btns/primaryBtnLink/primaryBtnLink';
import SecondaryBtnLink from '../btns/secondaryBtnLink/secondaryBtnLink';

const Header = () => {
    const isLoggedIn = false;
    return (
        <header className={style.header}> 
            {/* <header className={`md:flex md:justify-between py-8 px-12 shadow-md fixed w-full top-0 bg-white ${className}`}> */}
            <div className='flex justify-between'>
            {/* LOGO */}
            <a href="/" className='font-josefin-sans text-xl text-indigo-400'>
                <h2>Home sweet home</h2>
            </a>

            <button>
                <i className="fa-solid fa-bars md:hidden cursor-pointer"></i>
            </button>
            </div>
            
            {/* NAVLINKS */}
            <ul className={`md:flex md:justify-between gap-8`}>
            <li className='my-8 md:m-0'><Link className="hover:text-primair-blue" to={'/zoeken'}><i className="fa-solid fa-magnifying-glass mr-2"></i> Panden zoeken</Link></li>
            

            {/* Check if user is logged in */}
            {isLoggedIn ? (
                <a href="/account/persoonlijke-gegevens"><i className="fa-solid fa-user text-xl hover:text-primair-blue"></i></a>
            ) : (
                <span className='btns md:flex md:justify-between gap-x-4'>
                <li className='mb-8 md:m-0'><PrimaryBtnLink href={'/registreer'} text={'Registreren'}/></li>
                <li className='mb-8 md:m-0'><SecondaryBtnLink href={'/inloggen'} text={'Inloggen'}/></li>
                </span>
            )}

            </ul>
        </header>
    );
};

export default Header;