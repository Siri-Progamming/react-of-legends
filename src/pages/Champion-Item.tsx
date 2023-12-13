import React, {useEffect, useState} from "react"
import TextToSpeech from "../components/TextToSpeech.tsx"
import Champion from "../interfaces/Champion.ts"
import axios from "axios";
import '../index.css'
import {useParams} from "react-router-dom";

// interface ChampionItemProps{
//     idChamp:string
// }

/*interface RelatedChamp{
    id:string
    key:number
    name:string
}*/

const ChampionItem: React.FC = () => {
    const idChamp = useParams().idChamp as string;
    const [champion, setChampion] = useState<Champion>(initChampion());
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getChampion = async (id: string) => {
        try {
            const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/13.23.1/data/fr_FR/champion/${id}.json`,
                {
                    headers: {
                        //'Access-Control-Allow-Origin': '*',
                    },
                })

            const data = await response.data
            const championData = data.data[id]

            if (championData !== undefined) {
                console.log("Fetching Champion Detail SUCCESS")
                console.log(championData)
            }

            setChampion((prevChampion) => ({
                ...prevChampion,
                id: championData.id,
                key: championData.key,
                name: championData.name,
                title: championData.title,
                //TODO images
                //TODO Skins boucle -> nums
                //TODO allyTips
                //TODO enemyTips
            }));

        } catch (error) {
            console.error('Error : ', error)
        }
    }
    const getChampionStory = async () => {
        try {
            const jsonStoryLink = `https://universe-meeps.leagueoflegends.com/v1/fr_fr/champions/${idChamp.toLowerCase()}/index.json`;
            const response = await fetch(jsonStoryLink)
            const data = await response.json()

            const dataChamp = data['champion']
            console.log(dataChamp)

            const dataRelatedChampions = data['related-champions']
            console.log(dataRelatedChampions)
            /*            const relatedChampions:RelatedChamp[] = dataRelatedChampions.map((champ:RelatedChamp) => ({
                            id: champ.id,
                            key: champ.key,
                            name: champ.name
                        }));*/


            setChampion((prevChampion) => ({
                ...prevChampion,
                shortLore: dataChamp['biography']['short'],
                fullLore: dataChamp['biography']['full'],
                quote: dataChamp['biography']['quote']
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
            'released-date': null,
            region: '',
            shortLore: '',
            fullLore: '',
            quote: '',
            image: {
                full: '',
                loading: '',
                square: '',
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
        getChampion(idChamp)
        getChampionStory()
    }, []);

    useEffect(() => {

        console.log("Champion id :", champion.id)
        console.log("Champion key :", champion.key)


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
