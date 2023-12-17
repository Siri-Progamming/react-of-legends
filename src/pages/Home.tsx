import { SLOGGAN_LOL } from "../constantes/constantes.ts";

const Home = () => {
    return (
        <>
            <div className="background-home min-h-screen flex-col items-center justify-center backdrop-blur-md relative">
                <div
                    className="absolute bottom-0 left-0 w-full h-32 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
                    <p className="text-xl sm:text-3xl">{SLOGGAN_LOL}</p>
                </div>
            </div>
        </>
    )
}
export default Home
