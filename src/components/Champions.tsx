import {useEffect, useState} from "react";
import ChampionList from "../interfaces/ChampionList.ts";
import {useNavigate} from "react-router-dom";

const Champions = () => {
    const [championsList, setChampionsList] = useState<Array<ChampionList>>([])
    const navigate = useNavigate()
    const getChampions = async () => {
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
                                uri :dataChampions2[j]['image']['uri'],
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
            ]);
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
        console.log("Après la mise à jour de l'état :", championsList);
    }, [championsList]);

    function calculateBgPosition(width:number, height:number, x:number, y:number):string {
        const background_position_x = (x / width) * 100
        const background_position_y = (y / height) * 100
        return (background_position_x.toString()+"% "+background_position_y.toString()+"%")
    }
    return (
        <>
            <div className="flex flex-col flex-wrap sm:items-center justify-center sm:flex-row">
                {championsList.map((champion) => (
                    <div className={`border border-[#937341] border-2 sm:m-5 flex-shrink-0 w-screen-97 sm:w-1/6 p-4
                           
                                hover:border-[#c0e0f7] transform transition-all duration-500 sm:hover:scale-110`}
                         style={{
                             backgroundImage: `url(${champion.image.uri})`,
                             backgroundPosition: calculateBgPosition(champion.image.width, champion.image.height, champion.image.x, champion.image.y),
                             backgroundSize: 'cover'
                         }}
                         key={champion.id}
                         onClick={() => handleOnClickCard(champion.id)}>

                        <div className="mt-96"></div>

                        <div className="bg-black bg-opacity-30 backdrop-blur-sm mx-[-16px] mb-[-16px]">
                            <div className="text-[24px]">
                                {champion.name?.toUpperCase()}
                            </div>

                            <div className="flex items-center">
                                <div className="flex-grow border-t border-[#937341]"></div>
                                <p className="text-[12px] italic">{champion.title}</p>
                                <div className="flex-grow border-t border-[#937341]"></div>
                            </div>

                            <div>
                                Découvrir
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Champions
