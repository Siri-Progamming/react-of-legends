import {useEffect, useState} from "react";
import ChampionList from "../interfaces/ChampionList.ts";
import {useNavigate} from "react-router-dom";
import Filter from "./Filter.tsx";

const Champions = () => {
    const [championsList, setChampionsList] = useState<Array<ChampionList>>([])
    const navigate = useNavigate()
    const [filteredList, setFilteredList] = useState<Array<ChampionList>>([])
    const getChampions = async () => {
        console.log("Récupération des champions")

        let tempChampList: Array<ChampionList> = []
        try {
            const response = await fetch('https://ddragon.leagueoflegends.com/cdn/13.23.1/data/fr_FR/champion.json')
            const data = await response.json()
            tempChampList = data.data
            const champKeys = Object.keys(tempChampList)
            console.log("ChampKeys : ", champKeys[1])
            console.log('Taille dataChampions : ', champKeys.length)

            const response2 = await fetch(import.meta.env.VITE_RIOT_CHAMPIONS_SPLASH)
            const data2 = await response2.json()
            const dataChampions2 = data2.champions
            console.log('Taille dataChampions2 : ', dataChampions2.length)

            let champListToSet: Array<ChampionList> = []
            let noMatchedChamp: Array<string> = []
            for (let j = 0; j < dataChampions2.length; j++) {
                let matchedSomeone = false
                for (let i = 0; i < champKeys.length; i++) {
                    const champName = tempChampList[champKeys[i]]['id'].toLowerCase()
                    let meepChampName = dataChampions2[j].slug
                    if (dataChampions2[j].slug === 'renataglasc') {
                        meepChampName = 'renata'
                        console.log("meepName : " + meepChampName)
                    }//TODO Hwei ?
                    if (champName === meepChampName) {
                        matchedSomeone = true
                        console.log(champName, " MATCH WITH ", meepChampName)
                        champListToSet.push({
                            id: tempChampList[champKeys[i]]['id'],
                            key: tempChampList[champKeys[i]]['key'],
                            name: tempChampList[champKeys[i]]['name'],
                            title: tempChampList[champKeys[i]]['title'],
                            releasedDate: dataChampions2[j]['release-date'],
                            region: dataChampions2[j]['associated-faction-slug'],
                            info: {
                                attack: tempChampList[champKeys[i]]['info']['attack'],
                                defense: tempChampList[champKeys[i]]['info']['defense'],
                                magic: tempChampList[champKeys[i]]['info']['magic'],
                                difficulty: tempChampList[champKeys[i]]['info']['difficulty'],
                            },
                            image: {
                                uri: dataChampions2[j]['image']['uri'],
                                width: dataChampions2[j]['image']['width'],
                                height: dataChampions2[j]['image']['height'],
                                x: dataChampions2[j]['image']['x'],
                                y: dataChampions2[j]['image']['y'],
                            }
                        })
                        break;
                    }
                }
                if (!matchedSomeone) {
                    noMatchedChamp.push(dataChampions2[j]['slug'])
                }
            }
            console.log("NO MATCH FOUND FOR : ", noMatchedChamp)
            console.log("Tableau temporaire : ", champListToSet)
            //             console.log("Roles : ", tempChampList[champKeys[i]]['tags'])

            console.log("Avant la mise à jour de l'état :", championsList);
            setChampionsList((prevChampionsList) => [
                ...prevChampionsList,
                ...champListToSet,
            ])
            champListToSet = []
        } catch (error) {
            console.error('Error : ', error)
        }
    }

    const handleOnClickCard = (id) => {
        navigate(`/champions/${id}`)
    }

    useEffect(() => {
        getChampions()
    }, [])

    useEffect(() => {
        // console.log("Après la mise à jour de l'état :", championsList);
        console.log("Taille de la liste des champions :", championsList.length)
        console.log("Taille de la liste des champions filtrés :", filteredList.length)
        setFilteredList(championsList)
    }, [championsList, filteredList]);

    function calculateBgPosition(width: number, height: number, x: number, y: number): string {
        const background_position_x = (x / width) * 100
        const background_position_y = (y / height) * 100
        return (background_position_x.toString() + "% " + background_position_y.toString() + "%")
    }

    function getRegion(region: string): string {
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

    function getDifficulty(difficulty: number): string {
        if (difficulty < 4) {
            return 'faible'
        } else if (difficulty < 7) {
            return 'modérée'
        } else {
            return 'élevée'
        }
    }

    const FavIcon = () => {
        return (
            <div className="champ-favorite-card mt-2 mr-2">
                <img
                    src="src/assets/img/ico/heart_empty.png"
                    alt="Empty Heart"
                    className="relative hover:hidden"
                    style={{zIndex: 1}}
                    id="empty-heart"
                />
                <img
                    src="src/assets/img/ico/heart_full.png"
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


    return (
        <>
            {filteredList.length > 0 ?
                <>
                    <div className="my-8">
                        <Filter champions={championsList}/>
                    </div>
                    <div className="w-screen flex justify-center items-center mt-8">
                        <ul className="flex flex-col flex-wrap sm:items-center justify-center sm:flex-row w-11/12">
                            {filteredList.map((champion) => (
                                <li className={`border-[#937341] border-[2px] sm:m-5 flex-shrink-0 w-screen-97 sm:w-1/6 cards relative text-[#c4b998] cursor-pointer`}
                                    style={{
                                        backgroundImage: `url(${champion.image.uri})`,
                                        backgroundPosition: calculateBgPosition(champion.image.width, champion.image.height, champion.image.x, champion.image.y),
                                        backgroundSize: 'cover'
                                    }}
                                    key={champion.id}
                                    id={champion.id}
                                    onClick={() => handleOnClickCard(champion.id)}>
                                    <div>
                                        <div
                                            className="card-top bg-black bg-opacity-70 backdrop-blur-sm  border-b border-[#937341] hidden">
                                            <div className="champ-difficulty-card flex flex-row ml-2 mt-2">
                                                {getDifficulty(champion.info?.difficulty) === 'faible' &&
                                                    <>
                                                        <img src="src/assets/img/ico/difficulty_full.png"/>
                                                    </>}
                                                {getDifficulty(champion.info?.difficulty) === 'modérée' &&
                                                    <>
                                                        <img src="src/assets/img/ico/difficulty_full.png"/>
                                                        <img src="src/assets/img/ico/difficulty_full.png"/>
                                                    </>}
                                                {getDifficulty(champion.info?.difficulty) === 'élevée' &&
                                                    <>
                                                        <img src="src/assets/img/ico/difficulty_full.png"/>
                                                        <img src="src/assets/img/ico/difficulty_full.png"/>
                                                        <img src="src/assets/img/ico/difficulty_full.png"/>
                                                    </>}
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
                                                    <p className="text-[15px] uppercase">{getRegion(champion.region)}</p>
                                                </div>
                                            </div>
                                            <div className="border-t border-[#937341] p-5 text-[12px] hidden" id="hidden-element-card">
                                                <div className="flex flex-row items-center justify-center">
                                                    <div className="flex flex-row items-center pl-2 pr-2">
                                                        <img className="w-[16px]" src="src/assets/img/ico/attack.png"/>
                                                        <p className="pl-1 pr-1">{champion.info?.attack}</p>
                                                    </div>
                                                    <div className="flex flex-row items-center pl-2 pr-2">
                                                        <img className="w-[16px]" src="src/assets/img/ico/defense.png"/>
                                                        <p className="pl-1 pr-1">{champion.info?.defense}</p>
                                                    </div>
                                                    <div className="flex flex-row items-center pl-2 pr-2">
                                                        <img className="w-[14px]" src="src/assets/img/ico/magic.png"/>
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
                <div className="flex flex-row items-center justify-center w-screen-97 h-screen">
                    <span className="loading loading-ring text-info w-[150px]"></span>
                </div>
            }
        </>
    )
}
export default Champions
