import {useContext, useEffect, useState} from "react";
import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../config/firebase.ts";
import {AuthenticationContext} from "../context/AuthenticationContext.ts";

const Favoris = () => {
    const [favoriteChampions, setFavoriteChampions] = useState<Array<string>>([])
    const [isFavoriteListEmpty, setIsFavoriteListEmpty] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [hasFavorites, setHasFavorites] = useState<boolean>(false)

    const {state: {userInfos}} = useContext(AuthenticationContext)

    const getFavoriteChampionsFromDB = async (): Promise<string[]> => {
        const favorites: Array<string> = []
        // @ts-expect-error userInfos ne peut pas être null car on est dans une route protégée
        const q = query(collection(db, "favoris"), where("user_id", "==", userInfos.uid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            favorites.push(doc.data().champion_id)
        })
        if(favorites.length > 0){
            setHasFavorites(true)
        }else{
            setHasFavorites(false)
        }
        return favorites
    }

    const createFavoriteChampionsList = (favoris:string[]) => {
        setFavoriteChampions(favoris)
    }
    useEffect(() => {
        getFavoriteChampionsFromDB().then(favorites => createFavoriteChampionsList(favorites))
    }, []);

    useEffect(() => {
        if(hasFavorites){
            setIsFavoriteListEmpty(false)
            if (favoriteChampions.length == 0) {
                setIsLoading(true)
            }
        }else{
            setIsFavoriteListEmpty(true)
            setIsLoading(false)
        }
    }, [favoriteChampions, hasFavorites]);

    return (
        <>
            <div className="mt-10">
                <h1 className="mb-10">Liste des champions en favoris : </h1>
                {!isLoading && !isFavoriteListEmpty &&
                    <ul>
                        {favoriteChampions.map(fav => <li key={fav}>{fav}</li>)}
                    </ul>}
                {!isLoading && isFavoriteListEmpty && <p>Cet utilisateur n'a aucun champion en favoris. </p>}
                {isLoading &&
                    <div className="flex flex-row items-center justify-center w-screen-97 h-screen">
                    <span className="loading loading-ring text-info w-[150px]"></span>
                    </div>
                }
            </div>
        </>
    );
}
export default Favoris;
