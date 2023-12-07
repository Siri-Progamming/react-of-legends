import {useEffect, useState} from "react"
import TextToSpeech from "./TextToSpeech"
import Champion from "../interfaces/Champion.ts"
import axios from "axios";
import.meta.env.VITE_RIOT_STORIES_JSON
import.meta.env.VITE_RIOT_STORIES_JSON_END
const ChampionItem = ({idChamp}) => {
    const [champion, setChampion] = useState<Champion>(initChampion());
    const [championLoading, setChampionLoading] = useState<boolean>(false);

    const getChampion = async (idChamp) => {
        try{
            const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/13.23.1/data/fr_FR/champion/${idChamp}.json`,
                {
                    headers: {
                        //'Access-Control-Allow-Origin': '*',
                    },
                })

            const data = await response.data
            const champion = data.firstElementChild
            console.log("Data Champion : ",champion)

            setChampion((prevChampion) => ({
                ...prevChampion,
                champion
            }));

        }catch (error){
            console.error('Error : ',error)
        }
    }
    const getChampionStory = async () => {
        try{
            const jsonStoryLink = `${process.env.REACT_APP_RIOT_STORIES_JSON}${champion.id}${process.env.REACT_APP_RIOT_STORIES_JSON_END}`;
            console.log(jsonStoryLink)
            const response = await fetch(jsonStoryLink)
            const data = await response.json()
            console.log(data)



            // setChampion((prevChampion) => ({
            //     ...prevChampion,
            //     fullLore: story,
            // }));
        }catch (error){
            console.error('Error : ',error)
        }
    }

    function initChampion():Champion{
        console.log('Initialising champion')
        return{
            id: '',
            key: 0,
            name: '',
            title: '',
            region: '',
            shortLore: '',
            fullLore: '',
            image:{
                full: '',
                loading: '',
                square: '',
            },
            skins: [],
            allyTips:[],
            enemyTips: [],
            tags: [],
            spells:[],
            passive: {
                name: '',
                description: '',
                image: '',
            }
        }
    }

    useEffect(() => {
        getChampion(idChamp)
        getChampionStory()
    }, []);

    useEffect(() => {
        if(champion.fullLore !== ''){
            setChampionLoading(true);
        }
    }, [champion]);




    return (
        <div>
            <h1>Champion Item</h1>
            {championLoading ? (
                <>
                    <TextToSpeech text={champion?.fullLore ?? ''} />
                    <p>{champion?.shortLore}</p>
                </>
                ) : 'Loading...'}
        </div>
    )
}

export default ChampionItem
