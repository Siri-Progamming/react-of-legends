import {useEffect, useState} from "react";
import ChampionList from "../interfaces/ChampionList.ts";
import {useNavigate} from "react-router-dom";

const Champions = () => {
    const [championsList, setChampionsList] = useState<Array<ChampionList>>([])
    const [championKeys, setChampionKeys] = useState<Array<string>>([])
    const navigate = useNavigate()
    const getChampions = async () => {
        let tempChampList:Array<ChampionList> = []
        try{
            const response = await fetch('https://ddragon.leagueoflegends.com/cdn/13.23.1/data/fr_FR/champion.json')
            const data = await response.json()
            tempChampList = data.data
            const champKeys = Object.keys(tempChampList)
            setChampionKeys(champKeys)
            console.log("ChampKeys : ", champKeys[1])
            console.log('Taille dataChampions : ',champKeys.length)

            const response2 = await fetch(import.meta.env.VITE_RIOT_CHAMPIONS_SPLASH)
            const data2 = await response2.json()
            const dataChampions2 = data2.champions
            console.log('Taille dataChampions2 : ',dataChampions2.length)

            // let champListToSet:Array<ChampionList> = []
            // for(let i=0; i<champKeys.length; i++){
            //     console.log("Champkey : ", champKeys[i])
            //     for(let j=0; j<dataChampions2.length; j++){
            //         const nameMajuscule = dataChampions2[j].slug.charAt(0).toUpperCase() + dataChampions2[j].slug.slice(1)
            //         console.log("Champion2 :", nameMajuscule)
            //         if(champKeys[i]=== nameMajuscule){
            //             console.log("MATCH")
            //             console.log("Roles : ", tempChampList[champKeys[i]]['tags'])
            //             champListToSet.push({
            //                 id: tempChampList[champKeys[i]]['id'],
            //                 key: tempChampList[champKeys[i]]['key'],
            //                 name: tempChampList[champKeys[i]]['name'],
            //                 title: tempChampList[champKeys[i]]['title'],
            //                 releasedDate: dataChampions2[j]['release-date'],
            //                 region: dataChampions2[j]['associated-faction-slug'],
            //                 info:{
            //                     attack: tempChampList[champKeys[i]]['info']['attack'],
            //                     defense: tempChampList[champKeys[i]]['info']['defense'],
            //                     magic: tempChampList[champKeys[i]]['info']['magic'],
            //                     difficulty: tempChampList[champKeys[i]]['info']['difficulty'],
            //                 },
            //                 image: dataChampions2[j]['image']['uri']
            //             })
            //         }
            //     }
            // }
            // setChampionsList((prevChampionsList) => ({
            //     ...prevChampionsList,
            //     champListToSet
            // }))
        }catch (error) {
            console.error('Error : ', error)
        }
    }

    const handleOnClickCard = (id) => {
        navigate(`/champions/${id}`)
    }

    useEffect(() => {
        getChampions()
    }, [])

    return (
        <>
        <div className="flex flex-col flex-wrap sm:items-center justify-center sm:flex-row">
            {championKeys.map((key) => (
                <div className="border border-[#937341] border-2 sm:m-5 flex-shrink-0 w-screen-97 sm:w-1/6 p-4
                                            bg-[#0a0a0c] bg-opacity-30
                                            hover:border-[#c0e0f7] transform transition-all duration-500 sm:hover:scale-110"
                     key={championsList[key]['id']}
                     onClick={() => handleOnClickCard(championsList[key]['id'])}>
                    <div className="text-[24px]">
                        {championsList[key]['name'].toUpperCase()}
                    </div>
                    <div className="flex items-center mx-[-16px]">
                        <div className="flex-grow border-t border-[#937341]"></div>
                        <p className="text-[12px] italic">{championsList[key]['title']}</p>
                        <div className="flex-grow border-t border-[#937341]"></div>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}
export default Champions
