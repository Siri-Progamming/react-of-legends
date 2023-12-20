import {useContext, useEffect, useState} from "react";
import {ChampionList} from "../interfaces/Champion.ts";
import {useNavigate} from "react-router-dom";
import Filter from "../components/Filter.tsx";
import axios from "axios";
import {
    DDRAGON_API_BEGIN,
    DDRAGON_API_LAST_VERSION,
    DDRAGON_API_AFTER_VERSION,
    DDRAGON_API_AFTER_LOCALE_CHAMPIONS_END,
    MEEP_API_CHAMPIONS_SPLASH
} from "../constantes/constantes.ts";
import {useChampionsContext} from "../context/useChampionsContext.tsx";
import {
    setChampionsIdLocalStorage,
    setChampionsRegionsLocalStorage,
    setChampionsRolesLocalStorage
} from "../services/LocalStorageService.ts"
import {AuthenticationContext} from "../context/AuthenticationContext.ts";
import {db} from "../config/firebase.ts";
import {addDoc, collection} from "firebase/firestore";

const Champions = () => {
    const [championsList, setChampionsList] = useState<Array<ChampionList>>([])
    const [filteredList, setFilteredList] = useState<Array<ChampionList>>([])
    const [isFilteredListEmpty, setIsFilteredListEmpty] = useState<boolean>(false)
    const [regions, setRegions] = useState<Array<string>>([])
    const [roles, setRoles] = useState<Array<string>>([])
    const [tempRegions, setTempRegions] = useState<Array<string>>([])
    const [tempRoles, setTempRoles] = useState<Array<string>>([])
    //const [isFilteringEffect, setIsFilteringEffect] = useState<boolean>(false)
    //const [difficulties, setDifficulties] = useState<Array<string>>([])

    const navigate = useNavigate()
    const {setChampionsContext} = useChampionsContext()
    const {state: {isLogged}} = useContext(AuthenticationContext);

    const getChampions = async () => {
        const DDRAGON_API_CHAMPIONS = DDRAGON_API_BEGIN + DDRAGON_API_LAST_VERSION + DDRAGON_API_AFTER_VERSION + DDRAGON_API_AFTER_LOCALE_CHAMPIONS_END
        try {
            const response = await axios.get(DDRAGON_API_CHAMPIONS)
            return response.data.data
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des informations relatives aux champions ', error)
        }
    }
    //Other Call to a JSON with more details like pictures.
    const getMoreChampionsDetails = async () => {
        try {
            const response = await fetch(MEEP_API_CHAMPIONS_SPLASH)
            const data = await response.json()
            return data.champions
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des informations supplémentaires relatives aux champions ', error)
        }
    }
    const createChampionsListTemp = async (): Promise<Array<ChampionList>> => {
        const championsListTemp: Array<ChampionList> = []
        try {
            const dataChampions = await getChampions()
            const champKeys = Object.keys(dataChampions)
            const dataChampions2 = await getMoreChampionsDetails()
            //Les nouveaux champions qui viennent de sortir peuvent ne pas être présents dans le JSON de l'API ddragon
            const noMatchedChamp: Array<string> = []

            for (let j = 0; j < dataChampions2.length; j++) {
                let matchedSomeone = false
                for (let i = 0; i < champKeys.length; i++) {
                    const champName = dataChampions[champKeys[i]]['id'].toLowerCase()
                    let meepChampName = dataChampions2[j].slug
                    //Renata a son nom complet dans le JSON de l'API meep.
                    if (dataChampions2[j].slug === 'renataglasc') {
                        meepChampName = 'renata'
                    }
                    if (champName === meepChampName) {
                        matchedSomeone = true
                        championsListTemp.push({
                            id: dataChampions[champKeys[i]]['id'],
                            key: dataChampions[champKeys[i]]['key'],
                            name: dataChampions[champKeys[i]]['name'],
                            title: dataChampions[champKeys[i]]['title'],
                            releasedDate: dataChampions2[j]['release-date'],
                            region: getRegionName(dataChampions2[j]['associated-faction-slug']),
                            info: {
                                attack: dataChampions[champKeys[i]]['info']['attack'],
                                defense: dataChampions[champKeys[i]]['info']['defense'],
                                magic: dataChampions[champKeys[i]]['info']['magic'],
                                difficulty: dataChampions[champKeys[i]]['info']['difficulty'],
                            },
                            image: {
                                uri: dataChampions2[j]['image']['uri'],
                                width: dataChampions2[j]['image']['width'],
                                height: dataChampions2[j]['image']['height'],
                                x: dataChampions2[j]['image']['x'],
                                y: dataChampions2[j]['image']['y'],
                            },
                            roles: getRolesNames(dataChampions[champKeys[i]]['tags'])
                        })
                        setChampionsRegions(getRegionName(dataChampions2[j]['associated-faction-slug']))
                        setChampionsRoles(getRolesNames(dataChampions[champKeys[i]]['tags']))
                        break;
                    }
                }
                if (!matchedSomeone) {
                    noMatchedChamp.push(dataChampions2[j]['slug'])
                }
            }
            console.log("NO MATCH FOUND FOR : ", noMatchedChamp)
            return championsListTemp
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la création de la liste des champions ', error)
            return []
        }
    }

    const createChampionsList = async () => {
        const championsListTemp = await createChampionsListTemp()
        setChampionsList(championsListTemp)
    }

    const handleOnClickCard = (champion: ChampionList) => {
        if (champion.id === undefined) return
        navigate(`/champions/${champion.id}`, {state: {champion, from: location.pathname + '#' + champion.id}})
        window.scrollTo(0, 0);
    }
    const handleSearch = (list: ChampionList[]) => {
        if (list.length > 0) setIsFilteredListEmpty(false)
        setFilteredList(list)
        //Juste pour le swag
        // const timeout2 = setTimeout(() => {
        //     setIsFilteringEffect(true)
        //     clearTimeout(timeout2);
        // }, 70)
        // const timeout = setTimeout(() => {
        //     if(list.length === 0) setIsFilteredListEmpty(true)
        //     setIsFilteringEffect(false)
        //     clearTimeout(timeout);
        // }, 400)

        // fading ${isFilteringEffect ? '' : 'isVisible'}
    }

    useEffect(() => {
        if (localStorage.getItem('@champions') != null) {
            console.log("Loading champions list from local storage")
            setChampionsList(JSON.parse(localStorage.getItem('@champions') || '[]'))
            setRoles(JSON.parse(localStorage.getItem('@champions_roles') || '[]'))
            setRegions(JSON.parse(localStorage.getItem('@champions_regions') || '[]'))
        } else {
            createChampionsList().then(() => console.log("Champions list created"))
        }
        //TODO Scroll sur le champion si on vient de la page du champion
    }, [])

    useEffect(() => {
        if (championsList.length > 0 && localStorage.getItem('@champions') === null) {
            console.log("Saving champions list in local storage")
            localStorage.setItem('@champions', JSON.stringify(championsList))
            setChampionsIdLocalStorage(championsList)
            setRegionsAndRoles()
        }
        setFilteredList(championsList)
        setChampionsContext(championsList)
    }, [championsList])

    function calculateBgPosition(width: number, height: number, x: number, y: number): string {
        const background_position_x = (x / width) * 100
        const background_position_y = (y / height) * 100
        return (background_position_x.toString() + "% " + background_position_y.toString() + "%")
    }

    function getRegionName(region: string): string {
        if (region === 'unaffiliated') {
            return 'runeterra'
        } else if (region === 'mount-targon') {
            return 'targon'
        } else if (region === 'shadow-isles') {
            return 'îles obscures'
        } else if (region === 'void') {
            return 'le néant'
        } else if (region === 'bandle-city') {
            return 'bandle'
        }
        return region
    }

    function getRolesNames(roles: Array<string>): Array<string> {
        const rolesNames: Array<string> = []
        if (roles.length > 0) {
            roles.map((role) => {
                role = role.toLowerCase()
                switch (role) {
                    case 'fighter' :
                        return rolesNames.push('combattant')
                    case 'marksman' :
                        return rolesNames.push('tireur')
                    default :
                        return rolesNames.push(role)
                }
            })
            return rolesNames
        }
        return roles
    }

    function getDifficultyName(difficulty: number | undefined): string {
        if (difficulty === undefined) return '☆☆☆';
        if (difficulty < 4) {
            return '★☆☆'
        } else if (difficulty < 8) {
            return '★★☆'
        } else {
            return '★★★'
        }
    }

    const handleClickOnFavIcon = async (championId: number) => {
        console.log("Click on fav icon of : ", championId)
        await addDoc(collection(db, "favoris"), {
            champion_id: championId,
            user_id: localStorage.getItem('@user') !== null ? JSON.parse(localStorage.getItem('@user') || '').uid : null
        })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }
    const FavIcon = (championId: number) => {
        //TODO : Favoris dans localstorage ?
        // let user_uid : string|null = null
        // if(localStorage.getItem('@user') !== null){
        //     const userData = JSON.parse(localStorage.getItem('@user') || '')
        //     if(userData && userData !== ''){
        //         user_uid = userData.uid
        //     }
        // }


        return (
            <div className="champ-favorite-card mt-2 mr-2">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/loreact-666d4.appspot.com/o/ico%2Fheart_empty.png?alt=media&token=3dee63cf-c111-4e13-b3ea-238c7e794390"
                    alt="Empty Heart"
                    className="relative hover:hidden"
                    style={{zIndex: 1}}
                    id="empty-heart"
                />
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/loreact-666d4.appspot.com/o/ico%2Fheart_full.png?alt=media&token=fc485a8a-fa7a-427c-a9de-773caa0beca0"
                    alt="Full Heart"
                    className="relative hidden"
                    style={{zIndex: 1}}
                    id="hidden-full-heart"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClickOnFavIcon(championId)
                    }}
                />
                <div
                    className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#DF1D24] to-[#DF1D24] filter blur-[7px] rounded-full"
                    style={{zIndex: -1}}
                ></div>
            </div>
        );
    };

    const setChampionsRegions = (region: string) => {
        if (!regions.includes(region)) {
            setTempRegions(prevTempRegions => [...prevTempRegions, region])
        }
    }
    const setChampionsRoles = (champRoles: Array<string>) => {
        champRoles.map((role) => {
            if (!roles.includes(role)) {
                setTempRoles(prevTempRoles => [...prevTempRoles, role])
            }
        })
    }

    function setRegionsAndRoles() {
        console.log("Setting regions and roles")
        setRegions(Array.from(new Set(tempRegions)).map((region) => region.charAt(0).toUpperCase() + region.slice(1)))
        setRoles(Array.from(new Set(tempRoles)).map((role) => role.charAt(0).toUpperCase() + role.slice(1)))
    }

    useEffect(() => {
        setChampionsRegionsLocalStorage(regions)
        setChampionsRolesLocalStorage(roles)
    }, [regions, roles]);
    return (
        <>
            <div className="my-8 mx-auto">
                <Filter champions={championsList} handleSearch={handleSearch}
                        regions={regions}
                        roles={roles}
                />
            </div>

            {filteredList.length > 0 ?
                <>
                    <div className="w-screen flex justify-center items-center mt-8">
                        <ul className="flex flex-col flex-wrap sm:items-center justify-center sm:flex-row w-11/12">
                            {filteredList.map((champion) => (
                                <li className={`border-[#937341] border-[2px] sm:m-5 flex-shrink-0 w-screen-97 sm:w-1/6 cards relative text-[#c4b998] cursor-pointer
                                                       `}
                                    style={{
                                        backgroundImage: `url(${champion.image.uri})`,
                                        backgroundPosition: calculateBgPosition(champion.image.width, champion.image.height, champion.image.x, champion.image.y),
                                        backgroundSize: 'cover'
                                    }}
                                    key={champion.id}
                                    id={champion.id}
                                    onClick={() => handleOnClickCard(champion)}>
                                    <div>
                                        <div
                                            className="card-top bg-black bg-opacity-70 backdrop-blur-sm  border-b border-[#937341] hidden">
                                            <div
                                                className="champ-difficulty-card flex flex-row ml-2 text-[#937341] text-3xl">
                                                {getDifficultyName(champion.info?.difficulty)}
                                            </div>
                                            {isLogged && <FavIcon championId={champion.key}/>}
                                        </div>
                                        <div
                                            className="card-bottom bg-black bg-opacity-70 backdrop-blur-sm  border-t border-[#937341]">
                                            <div className="p-3">
                                                <div className="text-[26px] uppercase text-[#937341] tracking-[2px]">
                                                    {champion.name}
                                                </div>
                                                <div>
                                                    <p className="text-[15px] uppercase">{champion.region}</p>
                                                </div>
                                            </div>
                                            <div className="border-t border-[#937341] p-2 text-[12px] hidden"
                                                 id="hidden-element-card">
                                                <div className="flex flex-row items-center justify-center">
                                                    <div
                                                        className="flex flex-row items-center justify-center pl-2 pr-2 text-red-500">
                                                        <img className="w-[16px]"
                                                             src="https://firebasestorage.googleapis.com/v0/b/loreact-666d4.appspot.com/o/ico%2Fattack.png?alt=media&token=3d02b109-07a9-46ce-9215-f2ba16f6f2f4"
                                                             title="Attaque" alt="attack_ico"/>
                                                        <p className="pl-1 pr-1">{champion.info?.attack}</p>
                                                    </div>
                                                    <div
                                                        className="flex flex-row items-center justify-center pl-2 pr-2 text-[#937341] ">
                                                        <img className="w-[16px]"
                                                             src="https://firebasestorage.googleapis.com/v0/b/loreact-666d4.appspot.com/o/ico%2Fdefense.png?alt=media&token=a38c9379-bb05-477b-b3d7-7bfcbf87e73a"
                                                             title="Défense" alt="defense_ico"/>
                                                        <p className="pl-1 pr-1">{champion.info?.defense}</p>
                                                    </div>
                                                    <div
                                                        className="flex flex-row items-center justify-center pl-2 pr-2 text-blue-300">
                                                        <img className="w-[14px]"
                                                             src="https://firebasestorage.googleapis.com/v0/b/loreact-666d4.appspot.com/o/ico%2Fmagic.png?alt=media&token=8028058e-3813-49b6-813f-8f0709d5f5de"
                                                             title="Magie" alt="magic_ico"/>
                                                        <p className="pl-1 pr-1">{champion.info?.magic}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
                :
                (!isFilteredListEmpty ?
                        <div className="flex flex-row items-center justify-center w-screen-97 h-screen">
                            <span className="loading loading-ring text-info w-[150px]"></span>
                        </div>
                        :
                        <div className="flex flex-row items-center justify-center w-screen-97 h-fit">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/loreact-666d4.appspot.com/o/png%2Fcry_poro.png?alt=media&token=a603f157-9ff9-4fdf-a8b2-839aae56c141"
                                className="w-[64px] h-[64px]" alt="sad poro"/>
                            <p className="p-5">Aucun champion ne correspond aux critères du filtre.</p>
                        </div>
                )
            }
        </>
    )
}
export default Champions
