import React from 'react';
import { NavLink } from "react-router-dom"
import {APP_TITLE} from "../constantes/constantes.ts";

const Nav:React.FC = () => {
    return (
        <>
            <header className="navbar nav-divider sm:p-5 bg-[#1B1827] ">
                <div className="navbar-start sm:ml-5">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <h1 className="font-KDA text-xl sm:text-4xl
                                   bg-gradient-to-br from-[#99f8fc] via-[#c0e0f7] to-[#c79dcd]
                                   inline-block text-transparent bg-clip-text hidden sm:block">
                        {APP_TITLE}
                    </h1>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <nav className="menu menu-horizontal text-[20px]">
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/champions'>Champions</NavLink></li>
                            <li><NavLink to='/favoris'>Favoris</NavLink></li>
                            <li><NavLink to='/register'>Inscription</NavLink></li>
                    </nav>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end navbar-end text-right mr-5">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-20 rounded-full">
                            <img alt="Profil icon" src="https://i.redd.it/ztufjdppq8r11.jpg" />
                        </div>
                    </div>
                    <nav tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <ul>
                            <li><NavLink to='/profil'>Profil</NavLink></li>
                            <li><NavLink to='/config'>Configuration</NavLink></li>
                            <li><NavLink to='/logout'>Déconnexion</NavLink></li>
                        </ul>

                    </nav>
                </div>
                </div>
            </header>
        </>
    );
}

export default Nav;
