import {useContext, useEffect, useState} from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../config/firebase.ts";
import {AuthenticationContext} from "../context/AuthenticationContext.ts";

const Favoris = () => {
    const [favoriteChampions, setFavoriteChampions] = useState<Array<string>>([])
    const { state: { userInfos } } = useContext(AuthenticationContext)
    const getFavoriteChampionsFromDB = async () => {
        const q = query(collection(db, "favoris"), where("user_id", "==", userInfos.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setFavoriteChampions([...favoriteChampions, doc.data().champion_id])
        });
    }

    useEffect(() => {
        getFavoriteChampionsFromDB()
    }, []);
    useEffect(() => {
        console.log(favoriteChampions)
    }, [favoriteChampions]);
    return (
        <div>
            <h1>Liste des champions en favoris : </h1>
            <ul>
                {favoriteChampions.map(fav => <li key={fav.championId}>{fav.championId}</li>)}
            </ul>
        </div>


        // <div className="flex flex-row justify-center items-center h-[calc(100vh_-_var(--nav-height,0))]">
        //     <img src="public/img/comingsoon-ahri.png" alt="coming soon" className="sm:h-[calc(100vh_-_var(--nav-height,0))] w-auto hidden sm:block"/>
        //     <div className="block sm:hidden mt-[5%]">
        //         <h1>En Construction</h1>
        //         <p>Merci de bien vouloir patienter que le Père Noël m'offre du temps et du skill.</p>
        //     </div>
        // </div>
    );
}
    export default Favoris;
