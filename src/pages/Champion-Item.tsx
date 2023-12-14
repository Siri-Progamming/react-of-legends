import React, {useEffect, useState} from "react"
import TextToSpeech from "../components/TextToSpeech.tsx"
import {Champion, ChampionList} from "../interfaces/Champion.ts"
import axios from "axios";
import '../index.css'
import {useParams, useLocation} from "react-router-dom";
import {DDRAGON_API_BEGIN, DDRAGON_API_LAST_VERSION, DDRAGON_API_AFTER_VERSION, DDRAGON_API_AFTER_LOCALE_CHAMPION,
            DDRAGON_API_AFTER_LOCALE_CHAMPION_END,
            MEEP_API_STORY_BEGIN, MEEP_API_STORY_END} from "../constantes/constantes.ts";

/*interface RelatedChamp{
    id:string
    key:number
    name:string
}*/

const ChampionItem: React.FC = () => {
    const idChamp = useParams().idChamp as string;
    const [champion, setChampion] = useState<Champion>(initChampion());
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const location = useLocation();
    const championInfo = location.state as ChampionList;

    const getChampion = async (id: string) => {
        id = id.charAt(0).toUpperCase() + id.slice(1)
        const DDRAGON_API_CHAMPION = DDRAGON_API_BEGIN+DDRAGON_API_LAST_VERSION+DDRAGON_API_AFTER_VERSION+DDRAGON_API_AFTER_LOCALE_CHAMPION+id+DDRAGON_API_AFTER_LOCALE_CHAMPION_END
        try {
            const response = await axios.get(DDRAGON_API_CHAMPION)
            return response.data.data[id]
        } catch (error) {
            console.error('Error : ', error)
        }
    }
    const getChampionStory = async (id:string) => {
        id = idChamp.toLowerCase()
        if (id === 'renata') {
            id = 'renataglasc'
        }
        const MEEP_API_STORY = MEEP_API_STORY_BEGIN+id+MEEP_API_STORY_END
        try {
            const response = await fetch(MEEP_API_STORY)
            return  await response.json()
        } catch (error) {
            console.error('Error : ', error)
        }
    }

    const createChampion = async (id:string) => {
        try{
            const championData = await getChampion(id)
            const championStoryAndRel = await getChampionStory(id)

            const dataChamp = championStoryAndRel['champion']
            const dataRelatedChampions = championStoryAndRel['related-champions']
            // console.log("Champion infos from meeps : ", dataChamp)
            // console.log("Related champions : ", dataRelatedChampions)
            const relatedChampions = dataRelatedChampions.map((champ: { name: string }) => ({
                name: champ.name
            }));

            setChampion((prevChampion) => ({
                ...prevChampion,
                id: championData.id,
                key: championData.key,
                name: championData.name,
                title: championData.title,
                shortLore: dataChamp['biography']['short'],
                fullLore: dataChamp['biography']['full'],
                quote: dataChamp['biography']['quote'],
                'related-champions': relatedChampions
                //TODO images
                //TODO Skins boucle -> nums
                //TODO allyTips
                //TODO enemyTips
            }));
        }catch(error){
            console.error('Error : ', error)
        }
    }
    function initChampion(): Champion {
        console.log('Initialising champion')
        return {
            id: '',
            key: 0,
            name: '',
            title: '',
            releasedDate: null,
            region: '',
            info: {
                attack: 0,
                defense: 0,
                magic: 0,
                difficulty: 0,
            },
            shortLore: '',
            fullLore: '',
            quote: '',
            image: {
                uri: '',
                width: 0,
                height: 0,
                x: 0,
                y: 0,
            },
            skins: [],
            allyTips: [],
            enemyTips: [],
            roles: [],
            spells: [],
            passive: {
                name: '',
                description: '',
                image: '',
            },
            'related-champions': []
        }
    }

    useEffect(() => {
        console.log("Champion Info from champions list : ", championInfo)
        createChampion(idChamp)
    }, []);

    useEffect(() => {

        console.log("Champion id : ", champion.id)
        console.log("Champion key : ", champion.key)
        console.log("Champion Objet : ", champion)

        if (champion.fullLore !== '' && champion.shortLore !== '' && champion.quote !== '') {
            setIsLoading(true);
        }

    }, [champion]);

    function styleParagraph(text: string | undefined): string {
        if (text === undefined) return "";
        return text.replace(/<p>/g, '<p class="mb-6">');
    }

    return (
        <div>
            <h1 className="text-[#67471f]">{champion.name}</h1>
            {isLoading ? (
                    <>
                        <p className="mb-3 text-[#c4b998]">{champion?.quote}</p>
                        <div
                            className="w-[30%] mx-auto p-5 bg-white bg-opacity-[3%] text-justify border-[#937341] border-[2px]"
                            id="champion-lore">
                            {/*<p className="mb-3" dangerouslySetInnerHTML={{__html: champion?.shortLore}}/>*/}
                            <p className="mb-3 " dangerouslySetInnerHTML={{__html: styleParagraph(champion?.fullLore)}}/>
                            <TextToSpeech text={champion?.fullLore ?? ''}/>
                        </div>
                    </>
                )
                :
                <div className="flex flex-row items-center justify-center w-screen-97 h-screen">
                    <span className="loading loading-ring text-info w-[150px]"></span>
                </div>}
        </div>
    )
}

export default ChampionItem
