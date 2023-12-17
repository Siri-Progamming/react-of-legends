import {useEffect, useState} from "react";
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

const Champions = () => {
    const [championsList, setChampionsList] = useState<Array<ChampionList>>([])
    const [filteredList, setFilteredList] = useState<Array<ChampionList>>([])
    const [isFilteredListEmpty, setIsFilteredListEmpty] = useState<boolean>(false)
    const [regions, setRegions] = useState<Array<string>>([])
    const [roles, setRoles] = useState<Array<string>>([])
    //const [isFilteringEffect, setIsFilteringEffect] = useState<boolean>(false)
    //const [difficulties, setDifficulties] = useState<Array<string>>([])

    const navigate = useNavigate()


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
    const createChampionsList = async () => {
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
                    }//TODO Hwei ?
                    if (champName === meepChampName) {
                        matchedSomeone = true
                        setChampionsList(prevChampionsList => [
                            ...prevChampionsList,
                            {
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
                            }
                        ])
                        getRegions(getRegionName(dataChampions2[j]['associated-faction-slug']))
                        getRoles(getRolesNames(dataChampions[champKeys[i]]['tags']))
                        break;
                    }
                }
                if (!matchedSomeone) {
                    noMatchedChamp.push(dataChampions2[j]['slug'])
                }
            }
            console.log("NO MATCH FOUND FOR : ", noMatchedChamp)
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la création de la liste des champions ', error)
        }
    }
    const handleOnClickCard = (champion: ChampionList) => {
        if (champion.id === undefined) return
        navigate(`/champions/${champion.id}#champion-page-image`, {state: champion})
    }
    const handleSearch = (list: ChampionList[]) => {
        setFilteredList(list)
        setIsFilteredListEmpty(true)
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
        createChampionsList()
    }, [])

    useEffect(() => {
        setFilteredList(championsList)
        if(championsList.length > 0){
            localStorage.setItem('@champions', JSON.stringify(championsList))
        }
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

    const FavIcon = () => {
        return (
            <div className="champ-favorite-card mt-2 mr-2">
                <img
                    src="public/img/ico/heart_empty.png"
                    alt="Empty Heart"
                    className="relative hover:hidden"
                    style={{zIndex: 1}}
                    id="empty-heart"
                />
                <img
                    src="public/img/ico/heart_full.png"
                    alt="Full Heart"
                    className="relative hidden"
                    style={{zIndex: 1}}
                    id="hidden-full-heart"
                />
                <div
                    className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#DF1D24] to-[#DF1D24] filter blur-[7px] rounded-full"
                    style={{zIndex: -1}}
                ></div>
            </div>
        );
    };
    const getRegions = (region: string) => {
        if (!regions.includes(region)) {
            setRegions(prevRegions => [...prevRegions, region])
        }
    }
    const getRoles = (champRoles: Array<string>) => {
        champRoles.map((role) => {
            if (!roles.includes(role)) {
                setRoles(prevRoles => [...prevRoles, role])
            }
        })
    }

    return (
        <>
            <div className="my-8 mx-auto">
                <Filter champions={championsList} handleSearch={handleSearch}
                        regions={Array.from(new Set(regions))}
                        roles={Array.from(new Set(roles))}
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
                                            <FavIcon/>
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
                                                        <img className="w-[16px]" src="public/img/ico/attack.png"
                                                             title="Attaque" alt="attack_ico"/>
                                                        <p className="pl-1 pr-1">{champion.info?.attack}</p>
                                                    </div>
                                                    <div
                                                        className="flex flex-row items-center justify-center pl-2 pr-2 text-[#937341] ">
                                                        <img className="w-[16px]" src="public/img/ico/defense.png"
                                                             title="Défense" alt="defense_ico"/>
                                                        <p className="pl-1 pr-1">{champion.info?.defense}</p>
                                                    </div>
                                                    <div
                                                        className="flex flex-row items-center justify-center pl-2 pr-2 text-blue-300">
                                                        <img className="w-[14px]" src="public/img/ico/magic.png"
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
                            <img src="public/img/png/cry_poro.png" className="w-[64px] h-[64px]" alt="sad poro"/>
                            <p className="p-5">Aucun champion ne correspond aux critères du filtre.</p>
                        </div>
                )
            }
        </>
    )
}
export default Champions
