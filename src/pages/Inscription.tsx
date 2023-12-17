import React, {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {auth} from "../config/firebase";

interface FirebaseError {
    code: string;
}

const Inscription = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError('')
        try {
            const newUser = await createUserWithEmailAndPassword(auth, email, password)
            if (newUser.user !== null) {
                navigate('/login')
            }
        } catch (error: unknown) {
            const errorCode = (error as FirebaseError).code;
            if (errorCode === 'auth/weak-password') {
                setError('Le mot de passe doit faire au minimum 6 caractères')
            } else if (errorCode === 'auth/email-already-in-use') {
                setError('L\'email est déjà utilisé')
            } else {
                setError('Une erreur est survenue')
            }
        }
    }
    return (
        <div id="register-page">
            <div className="flex flex-row justify-center items-center sm:h-[calc(100vh_-_var(--nav-height,0))]">
                <div className="background-inscription mt-[--nav-height] hidden sm:block"></div>
                <img src="public/img/seraphine01.png" alt="Kaisa" className="max-h-[600px] hidden sm:block"/>
                <div id="register-box" className="pr-36">
                    <form className="form-control w-full max-w-xs mx-auto">
                        <h2 className="mb-[8%] bg-gradient-to-br from-[#AB5CCB] via-[#A69BD4] to-[#65ECE9] text-transparent bg-clip-text">Inscription</h2>
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
                        {error && <p className={`text-[#a974ce] mt-[5px] max-w-[200px]`}>{error}</p>}
                        <button onClick={onSignUp} disabled={email === '' || password === ''}
                                className="btn btn-outline btn-secondary btn-xs sm:btn-sm md:btn-md lg:btn-md mt-[20px]">S'inscrire
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Inscription;
