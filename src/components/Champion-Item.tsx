import {useEffect, useState} from "react";
import axios from 'axios';
import * as cheerio from 'cheerio';
import TextToSpeech from "./TextToSpeech";
import Champion from "../interfaces/Champion.ts";
const ChampionItem = () => {
    const [champion, setChampion] = useState<Champion>(initChampion());
    const [championLoading, setChampionLoading] = useState<boolean>(false);

    // const getChampion = async () => {
    //     try{
    //         // const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/13.23.1/data/fr_FR/champion/Lulu.json`)
    //         // const data = await response.json()
    //         // const champion = data.data.firstElementChild
    //         // setChampion(champion)
    //         // console.log(champion)
    //
    //     }catch (error){
    //         console.error('Error : ',error)
    //     }
    // }
    const getChampionStory = async () => {
        try{
            const response = await axios.get(`https://universe.leagueoflegends.com/fr_FR/story/champion/lulu/`)
            const data = await response.data
            // console.log(data)
            const $ = cheerio.load(data)
            const story = $('meta[property="og:description"]').attr('content')

            setChampion((prevChampion) => ({
                ...prevChampion,
                fullLore: story,
            }));
        }catch (error){
            console.error('Error : ',error)
        }
    }

    //Récupérer la citation principale du personnage sur le site https://leagueoflegends.fandom.com/
    const getMainQuote = async () => {
        const response = await axios.get(`https://leagueoflegends.fandom.com/fr/wiki/Lulu/Historique`)
        const data = await response.data
        const $ = cheerio.load(data)
        const mainQuote = $('.mw-parser-output i:first').text().trim()
        console.log('Main Quote : ',mainQuote)
    }
    const getQuotes = async () => {
        const response = await axios.get(`https://leagueoflegends.fandom.com/fr/wiki/Lulu/Historique`)
        const data = await response.data
        console.log('Quotes : ',data)
    }
    function initChampion():Champion{
        console.log('Initialising champion')
        return{
            id: 0,
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
        getChampionStory()
        getMainQuote()
        getQuotes()
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
            {(
                <audio controls>
                    <source
                        src="https://static.wikia.nocookie.net/leagueoflegends/images/c/c5/Lulu.mouvement03.ogg/revision/latest?path-prefix=fr"
                        type="application/ogg"/>
                    Votre navigateur ne prend pas en charge l'élément audio.
                </audio>
            )}
        </div>
    )
}

export default ChampionItem
