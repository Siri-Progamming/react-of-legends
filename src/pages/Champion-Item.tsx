import React, {useEffect, useState} from "react"
import TextToSpeech from "../components/TextToSpeech.tsx"
import {Champion, ChampionList} from "../interfaces/Champion.ts"
import axios from "axios";
import '../index.css'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
    DDRAGON_API_AFTER_LOCALE_CHAMPION,
    DDRAGON_API_AFTER_LOCALE_CHAMPION_END,
    DDRAGON_API_AFTER_VERSION,
    DDRAGON_API_BEGIN,
    DDRAGON_API_LAST_VERSION,
    MEEP_API_STORY_BEGIN,
    MEEP_API_STORY_END
} from "../constantes/constantes.ts";
import {useChampionsContext} from "../context/useChampionsContext.tsx";

/*interface RelatedChamp{
    id:string
    key:number
    name:string
}*/

const ChampionItem: React.FC = () => {
    const [champion, setChampion] = useState<Champion>(initChampion);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {state} = useLocation();
    const navigate = useNavigate()
    const idChamp = checkIdChamp(useParams().idChamp as string)
    const {championsContext} = useChampionsContext()
    const championInfoFromChampionsPage = getChampionFromChampionsPage()

    function getChampionFromChampionsPage(): ChampionList {
        if (state.champion === null || championsContext.length === 0) {
            const storagedChampions = localStorage.getItem('@champions')
            if (storagedChampions !== null) {
                return JSON.parse(storagedChampions).find((champ: ChampionList) => champ.id?.toLowerCase() === idChamp?.toLowerCase()) as ChampionList
            } else {
                return {} as ChampionList
            }
        } else {
            return championsContext.find((champ: ChampionList) => champ.id?.toLowerCase() === idChamp?.toLowerCase()) as ChampionList
        }
    }

    const getChampion = async (id: string) => {
        id = id.charAt(0).toUpperCase() + id.slice(1)
        const DDRAGON_API_CHAMPION = DDRAGON_API_BEGIN + DDRAGON_API_LAST_VERSION + DDRAGON_API_AFTER_VERSION + DDRAGON_API_AFTER_LOCALE_CHAMPION + id + DDRAGON_API_AFTER_LOCALE_CHAMPION_END
        try {
            const response = await axios.get(DDRAGON_API_CHAMPION)
            return response.data.data[id]
        } catch (error) {
            console.error('Error : ', error)
        }
    }
    const getChampionStory = async (id: string) => {
        id = idChamp.toLowerCase()
        if (id === 'renata') {
            id = 'renataglasc'
        }
        const MEEP_API_STORY = MEEP_API_STORY_BEGIN + id + MEEP_API_STORY_END
        try {
            const response = await fetch(MEEP_API_STORY)
            return await response.json()
        } catch (error) {
            console.error('Error : ', error)
        }
    }
    const createChampion = async (id: string) => {

        try {
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
                image: {
                    uri: championInfoFromChampionsPage.image.uri,
                    width: championInfoFromChampionsPage.image.width,
                    height: championInfoFromChampionsPage.image.height,
                    x: championInfoFromChampionsPage.image.x,
                    y: championInfoFromChampionsPage.image.y,
                },
                shortLore: dataChamp['biography']['short'],
                fullLore: dataChamp['biography']['full'],
                quote: dataChamp['biography']['quote'],
                'related-champions': relatedChampions
                //TODO Skins boucle -> nums
                //TODO allyTips
                //TODO enemyTips
                //TODO related-champions
            }));
        } catch (error) {
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

    function checkIdChamp(id: string): string {
        const idChampFromLocalStorage = localStorage.getItem('@champions_id')
        if (idChampFromLocalStorage !== null) {
            for (let i = 0; i < JSON.parse(idChampFromLocalStorage).length; i++) {
                if (JSON.parse(idChampFromLocalStorage)[i].toLowerCase() === id.toLowerCase()) {
                    return JSON.parse(idChampFromLocalStorage)[i]
                }
            }
        }
        return id
    }

    useEffect(() => {
        createChampion(idChamp)
    }, []);
    useEffect(() => {
        if (champion.key !== 0 && champion.image.uri !== '') {
            setIsLoading(true);
        }
    }, [champion]);

    function styleParagraph(text: string | undefined): string {
        if (text === undefined) return "";
        return text.replace(/<p>/g, '<p class="mb-6">');
    }

    return (
        <div className="relative h-fit w-fit" id="champion-page">
            {isLoading ? (
                    <>
                        <button className="mt-2 sm:mt-0 sm:absolute left-2 top-2 sm:left-10 sm:top-10 text-white btn-xs sm:btn-sm md:btn-md lg:btn-md btn btn-circle btn-outline"
                                onClick={() => navigate(state?.from)}
                        >⬅</button>
                        <div id="background-champion-page" className=""
                             style={{backgroundImage: `url(${champion.image.uri})`}}></div>
                        <div id="champion-page-body" className="max-w-[90%] sm:max-w-[65%] p-0 sm:p-2.5 mx-auto my-auto">
                            <div id="champion-page-image" className="relative w-full">
                                <img src={champion.image.uri} alt={champion.name}
                                     className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-20"/>
                            </div>
                            <div id="champion-page-infos">
                                <h1 className="text-[#ff] text-6xl sm:text-8xl">{champion.name}</h1>
                                <p className="mb-3 text-[#c4b998] text-xl sm:text-2xl"
                                   dangerouslySetInnerHTML={{__html: styleParagraph(champion?.quote)}}/>
                                <div
                                    className="min-w-[288px] sm:w-[75%] mx-auto p-5 bg-black bg-opacity-[55%] text-justify border-[#937341] border-[2px]"
                                    id="champion-lore">
                                    {/*<p className="mb-3" dangerouslySetInnerHTML={{__html: champion?.shortLore}}/>*/}
                                    <p className="mb-3 "
                                       dangerouslySetInnerHTML={{__html: styleParagraph(champion?.fullLore)}}/>
                                    <TextToSpeech text={champion?.fullLore ?? ''}/>
                                </div>
                            </div>
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
