import {useEffect, useState} from "react";
import ChampionList from "../interfaces/ChampionList.ts";

const Champions = () => {
    const [championsList, setChampionsList] = useState<Array<ChampionList>>([])
    const [championKeys, setChampionKeys] = useState<Array<string>>([])

    const getChampions = async () => {
        try{
            const response = await fetch('https://ddragon.leagueoflegends.com/cdn/13.23.1/data/fr_FR/champion.json')
            const data = await response.json()
            const dataChampions = data.data
            const champKeys = Object.keys(dataChampions)
            setChampionKeys(champKeys)
            setChampionsList(dataChampions)

        }catch (error) {
            console.error('Error : ', error)
        }
    }

    useEffect(() => {
        getChampions()
    }, [])

    return (
        <>
        <div className="flex flex-wrap items-center justify-center">
            {championKeys.map(key => (
                <div className="border p-6 m-5 flex-shrink-0 w-1/6 p-4">
                    <div>
                        {championsList[key].name}
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}
export default Champions
