
const Page404 = () => {
    return (
        <div className="flex flex-row justify-center items-center h-[calc(100vh_-_var(--nav-height,0))]">
            <img src="https://firebasestorage.googleapis.com/v0/b/loreact-666d4.appspot.com/o/characters%2F404-evelynn.png?alt=media&token=fecfd500-672c-4c99-8767-f67692fb304a" alt="404" className="sm:max-h-[calc(100vh_-_var(--nav-height,0))] hidden sm:block"/>
            <div className="block sm:hidden mt-[5%]">
                <h1>404</h1>
                <p>Page not found.</p>
            </div>
        </div>
    );
}

export default Page404;
