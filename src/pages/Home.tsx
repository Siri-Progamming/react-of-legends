//import {useEffect, useState} from "react";
import { SLOGAN_LOL } from "../constantes/constantes.ts";
import {useAuthentication} from "../context/useAuthentication.tsx";

const Home = () => {
    //const [isPlaying, setIsPlaying] = useState(false);

    // useEffect(() => {
    //     console.log('Music player', isPlaying ? 'ON' : 'OFF')
    // }, [isPlaying]);
    const {user} = useAuthentication();
    return (
        <>
            <div>Bonjour : {user?.email} !</div>
            <div className="background-home min-h-screen flex-col items-center justify-center backdrop-blur-md relative">
                <div
                    className="absolute bottom-0 left-0 w-full h-32 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
                    <p>{SLOGAN_LOL}</p>
                </div>
                {/*<div className="absolute top-0 left-0">*/}
                {/*    {isPlaying ? (<audio autoPlay loop>*/}
                {/*        <source src="src/assets/music/01.POPSTARS.mp3" type="audio/mp3"/>*/}
                {/*    </audio>) : (<div className="text-4xl">♬</div>)}*/}
                {/*</div>*/}
            </div>
        </>
    )
}

export default Home
