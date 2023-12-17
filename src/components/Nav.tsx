import React, {useContext} from 'react';
import {NavLink} from "react-router-dom"
import {APP_TITLE} from "../constantes/constantes.ts";
import {AuthenticationContext} from "../context/AuthenticationContext.ts";
import {LOGOUT} from "../reducers/AuthReducer"
import {auth} from "../config/firebase";
import {signOut} from "firebase/auth"

const Nav: React.FC = () => {
    const {state, dispatch} = useContext(AuthenticationContext)
    const onLogout = async () => {
        await signOut(auth)
            .then(() => {
                localStorage.removeItem('@user')
                dispatch({type: LOGOUT, payload: null})
            })
            .catch(error => console.log('SignOut error ->', error))
    }

    return (
        <>
            <header className="navbar nav-divider sm:p-5 bg-[#1B1827]">
                <div className="navbar-start sm:ml-5">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h8m-8 6h16"/>
                            </svg>
                        </div>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/champions'>Champions</NavLink></li>
                            {state.isLogged && <li><NavLink to='/favoris'>Favoris</NavLink></li>}
                        </ul>
                    </div>
                    <h1 className="font-KDA text-xl sm:text-4xl
                                   bg-gradient-to-br from-[#99f8fc] via-[#c0e0f7] to-[#c79dcd]
                                   text-transparent bg-clip-text hidden sm:block">
                        {APP_TITLE}
                    </h1>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <nav className="menu menu-horizontal text-[20px]">
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/champions'>Champions</NavLink></li>
                        {state.isLogged && <li><NavLink to='/favoris'>Favoris</NavLink></li>}
                    </nav>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end navbar-end text-right mr-5">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-20 rounded-full">
                                {state.isLogged ? <img alt="Profil icon" src="https://i.redd.it/ztufjdppq8r11.jpg"/> :
                                    <img alt="Profil icon" src='public/img/png/nouser.png'/>}
                                    </div>
                                    </div>
                                    <ul tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {state.isLogged ? (
                                    <li>
                                        <button onClick={onLogout}>Déconnexion</button>
                                    </li>
                                ) : (
                                    <>
                                        <li><NavLink to='/login'>Connexion</NavLink></li>
                                        <li><NavLink to='/register'>Inscription</NavLink></li>
                                    </>
                                )}

                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Nav;
