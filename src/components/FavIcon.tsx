import React, {useContext, useEffect, useState} from "react";
import {AuthenticationContext} from "../context/AuthenticationContext.ts";
import {addDoc, deleteDoc, collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../config/firebase.ts";
import {ChampionList} from "../interfaces/Champion.ts";

interface FavIconProps {
    champion: ChampionList
    handleClickOnFav: (champion: ChampionList) => void;
    isFavorite: boolean;
}
const FavIcon : React.FC<FavIconProps> = ({champion, handleClickOnFav, isFavorite}) => {
    const [heartClicked, setHeartClicked] = useState<boolean>(false)

    if(isFavorite) console.log(champion.name," isFavorite : ", isFavorite)


    const { state: { userInfos } } = useContext(AuthenticationContext)

    useEffect(() => {
        if (isFavorite !== undefined) {
            setHeartClicked(isFavorite);
        }
    }, [isFavorite]);
    const handleClickOnFavorite = async () => {
        if(!heartClicked) {
            setHeartClicked(!heartClicked)
            await addDoc(collection(db, "favoris"), {
                champion_id: champion.key,
                // @ts-expect-error userInfos ne peut pas être null on est dans le contexte de l'authentification
                user_id: userInfos.uid
            })
                .then(() => {
                    // @ts-expect-error userInfos ne peut pas être null on est dans le contexte de l'authentification
                    console.log("Champion", champion.name, "successfully added to favorites of user ", userInfos.uid)
                    handleClickOnFav(champion)
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }else if(heartClicked){
            setHeartClicked(!heartClicked)
            try{
                const q = query(
                    collection(db, "favoris"),
                    // @ts-expect-error userInfos ne peut pas être null on est dans le contexte de l'authentification
                    where("user_id", "==", userInfos.uid),
                    where("champion_id", "==", champion.key))

                const querySnapshot = await getDocs(q);

                for (const doc of querySnapshot.docs) {
                    await deleteDoc(doc.ref);
                    // @ts-expect-error userInfos ne peut pas être null on est dans le contexte de l'authentification
                    console.log("Champion", champion.name, "successfully removed from favorites of user ", userInfos.uid);
                    handleClickOnFav(champion);
                }
            }catch(error){
                console.error("Error writing document: ", error);
            }
        }
    }

    return (
        <div className={`absolute top-0 right-0 w-[24px] mt-2 mr-2 ${heartClicked ? "w-[25px]" : " champ-favorite-card"}`}>
            <img
                src="https://firebasestorage.googleapis.com/v0/b/loreact-666d4.appspot.com/o/ico%2Fheart_empty.png?alt=media&token=3dee63cf-c111-4e13-b3ea-238c7e794390"
                alt="Empty Heart"
                className={`relative ${heartClicked ? "hidden" : "block hover:hidden"}`}
                style={{zIndex: 1}}
                id="empty-heart"
            />
            <img
                src="https://firebasestorage.googleapis.com/v0/b/loreact-666d4.appspot.com/o/ico%2Fheart_full.png?alt=media&token=fc485a8a-fa7a-427c-a9de-773caa0beca0"
                alt="Full Heart"
                className={`relative ${heartClicked ? "block" : "hidden"}`}
                style={{zIndex: 1}}
                id="hidden-full-heart"
                onClick={(e) => {
                    e.stopPropagation();
                    handleClickOnFavorite()
                }}
            />
            {!heartClicked && <div
                className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#DF1D24] to-[#DF1D24] filter blur-[7px] rounded-full"
                style={{zIndex: -1}}
            ></div>}
        </div>
    );
};

export default FavIcon;
