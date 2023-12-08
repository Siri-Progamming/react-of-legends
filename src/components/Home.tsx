const Home = () => {
    return (
        <>
            <div className="min-h-screen  flex-col items-center justify-center backdrop-blur-md">
                <img className="" src="src/assets/img/kda-wll06.jpg" alt="image badass"/>
                <div className="absolute bottom-0 left-0 w-full h-32 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
                    <p>{import.meta.env.VITE_APP_SLOGGAN}</p>
                </div>

            </div>
        </>
    )
}

export default Home
