import React, {useEffect, useState} from "react"
import TextToSpeech from "./TextToSpeech"
import Champion from "../interfaces/Champion.ts"
import axios from "axios";
import '../index.css'
import {useParams} from "react-router-dom";

// interface ChampionItemProps{
//     idChamp:string
// }

interface RelatedChamp{
    id:string
    key:number
    name:string
}

const ChampionItem: React.FC = () => {
    const idChamp = useParams().idChamp
    const [champion, setChampion] = useState<Champion>(initChampion());
    const [championLoading, setChampionLoading] = useState<boolean>(false);

    const getChampion = async (id:string) => {
        try{
            const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/13.23.1/data/fr_FR/champion/${id}.json`,
                {
                    headers: {
                        //'Access-Control-Allow-Origin': '*',
                    },
                })

            const data = await response.data
            const championData = data.data[id]

            if(championData !== undefined){
                console.log("Fetching Champion Detail SUCCESS")
                console.log(championData)
            }

            setChampion((prevChampion) => ({
                ...prevChampion,
                id:championData.id,
                key:championData.key,
                name: championData.name,
                title : championData.title,
                //TODO images
                //TODO Skins boucle -> nums
                //TODO allyTips
                //TODO enemyTips
            }));

        }catch (error){
            console.error('Error : ',error)
        }
    }
    const getChampionStory = async () => {
        try{
            const jsonStoryLink = `https://universe-meeps.leagueoflegends.com/v1/fr_fr/champions/${idChamp.toLowerCase()}/index.json`;
            const response = await fetch(jsonStoryLink)
            const data = await response.json()

            const dataChamp = data['champion']
            console.log(dataChamp)

            const dataRelatedChampions = data['related-champions']
            console.log(dataRelatedChampions)
            const relatedChampions:RelatedChamp[] = dataRelatedChampions.map((champ:RelatedChamp) => ({
                id: champ.id,
                key: champ.key,
                name: champ.name
            }));


            setChampion((prevChampion) => ({
                ...prevChampion,
                shortLore: dataChamp['biography']['short'],
                fullLore: dataChamp['biography']['full'],
                quote: dataChamp['biography']['quote']
            }));
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
            'released-date': null,
            region: '',
            shortLore: '',
            fullLore: '',
            quote: '',
            image:{
                full: '',
                loading: '',
                square: '',
            },
            skins: [],
            allyTips:[],
            enemyTips: [],
            roles: [],
            spells:[],
            passive: {
                name: '',
                description: '',
                image: '',
            },
            'related-champions': []
        }
    }

    useEffect(() => {
        getChampion(idChamp)
        getChampionStory()
    }, []);

    useEffect(() => {

        console.log("Champion id :", champion.id)
        console.log("Champion key :", champion.key)


        if(champion.fullLore !== '' && champion.shortLore !== '' && champion.quote !== ''){
            setChampionLoading(true);
        }
    }, [champion]);

    function styleParagraph(text:string):string{
        if(text !== undefined){
            return text.replace(/<p>/g, '<p class="mb-6">')
        } return ""
    }


    return (
        <div>
            <h1 className="text-[#67471f]">{champion.name}</h1>
            {championLoading ? (
                <>
                    <p className="mb-3">{champion?.quote}</p>
                    <div className="w-[50%] mx-auto text-justify">
                        <p className="mb-3" dangerouslySetInnerHTML={{ __html: champion?.shortLore}} />
                        <p className="mb-3 " dangerouslySetInnerHTML={{ __html: styleParagraph(champion?.fullLore) }} />
                        <TextToSpeech text={champion?.fullLore ?? ''} />
                    </div>
                </>
                ) : 'Loading...'}
        </div>
    )
}

export default ChampionItem
