import {useLocation, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../config/firebase";
import {AuthenticationContext} from '../context/AuthenticationContext.ts';
import {LOGIN} from '../reducers/AuthReducer';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const {state} = useLocation()
    const {dispatch} = useContext(AuthenticationContext)
    const navigate = useNavigate()

    const onLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError("")
        try {
            const userResponse = await signInWithEmailAndPassword(auth, email, password)
            if (userResponse.user) {
                dispatch({type: LOGIN, payload: userResponse.user})
                localStorage.setItem('@user', JSON.stringify(userResponse.user))
                navigate(state?.from ? state.from : '/')
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                //const errorCode = error.message;
                setError("Les identifiants sont incorrects")
            } else {
                // Si ce n'est pas une instance de Error, c'est quelque chose d'inattendu
                setError("Erreur inattendue : "+error);
            }
        }
    }

    return (
        <div id="register-page">
            <div className="flex flex-row justify-center items-center sm:h-[calc(100vh_-_var(--nav-height,0))]">
                <div className="background-login mt-[--nav-height] hidden sm:block"></div>
                {/*<img src="public/img/kaisa01.png" alt="Kaisa" className="max-h-[600px] hidden sm:block"/>*/}
                <div id="register-box">
                    <form className="form-control w-full max-w-xs mx-auto">
                        <h2 className="mb-[8%] bg-gradient-to-br from-[#C2BFD4] via-[#57C4C7] to-[#c948a0] text-transparent bg-clip-text">Connexion</h2>
                        <div id="register-box-email">
                            <input type="email" name="email" id="email" placeholder="Email"
                                   onChange={e => setEmail(e.target.value)}
                                   className="input input-bordered w-full max-w-xs"/>
                        </div>
                        <div id="register-box-password">
                            <input type="password" name="password" id="password" placeholder="Mot de passe"
                                   onChange={e => setPassword(e.target.value)}
                                   className="input input-bordered w-full max-w-xs"/>
                        </div>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                        <button onClick={onLogin} disabled={email === '' || password === ''}
                                className="btn btn-outline btn-secondary btn-xs sm:btn-sm md:btn-md lg:btn-md mt-[20px]">Se
                            connecter
                        </button>
                    </form>
                </div>
                <img src="https://firebasestorage.googleapis.com/v0/b/loreact-666d4.appspot.com/o/characters%2Fkaisa02.png?alt=media&token=82534050-c2dd-48e8-b3d6-365c154d9116" alt="Kaisa" className="max-h-[600px] hidden sm:block "/>
            </div>
        </div>
    );
}

export default Login;
