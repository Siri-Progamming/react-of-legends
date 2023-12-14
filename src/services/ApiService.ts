// import axios from "axios";
// import {
//     MEEP_API_STORY_BEGIN,
//     MEEP_API_STORY_END,
//     DDRAGON_API_VERSION,
//     MEEP_API_CHAMPIONS_SPLASH,
//     DDRAGON_API_BEGIN,
//     DDRAGON_API_AFTER_VERSION,
//     DDRAGON_API_AFTER_LOCALE_CHAMPIONS_END,
//     DDRAGON_API_AFTER_LOCALE_CHAMPION,
//     DDRAGON_API_AFTER_LOCALE_CHAMPION_END
// } from "../constantes/constantes.ts";
// export const fetchDdragonLastVersion = async (): Promise<string> => {
//     try {
//         const response = await axios.get(DDRAGON_API_VERSION)
//         const lastVersion = response.data[0]
//         if (lastVersion !== undefined) {
//             console.log("Last version from ddragon API : ", lastVersion)
//         }
//         return lastVersion
//     } catch (error) {
//         console.error('Error : ', error)
//         return ""
//     }
// }
// export const fetchChampions = async () => {
//     const DDRAGON_LAST_VERSION = await fetchDdragonLastVersion()
//     const DDRAGON_API_CHAMPIONS = DDRAGON_API_BEGIN + DDRAGON_LAST_VERSION + DDRAGON_API_AFTER_VERSION + DDRAGON_API_AFTER_LOCALE_CHAMPIONS_END
//     console.log("GET champions - ddragon")
//     try {
//         const response = await axios.get(DDRAGON_API_CHAMPIONS)
//         return response.data
//     } catch (error) {
//         console.error('Une erreur s\'est produite lors de la récupération des informations relatives aux champions ', error)
//     }
// }
// export const fetchChampionsImages = async () => {
//     try {
//         const response = await axios.get(MEEP_API_CHAMPIONS_SPLASH)
//         return response.data.champions
//     } catch (error) {
//         console.error('Une erreur s\'est produite lors de la récupération des informations supplémentaires relatives aux champions ', error)
//     }
// }
// export const fetchChampion = async (id: string) => {
//     id = id.charAt(0).toUpperCase() + id.slice(1)
//     const DDRAGON_LAST_VERSION = await fetchDdragonLastVersion()
//     const DDRAGON_API_CHAMPION = DDRAGON_API_BEGIN + DDRAGON_LAST_VERSION + DDRAGON_API_AFTER_VERSION + DDRAGON_API_AFTER_LOCALE_CHAMPION + id + DDRAGON_API_AFTER_LOCALE_CHAMPION_END
//     try {
//         const response = await axios.get(DDRAGON_API_CHAMPION)
//         const championData = response.data[id]
//
//         if (championData !== undefined) {
//             console.log("Champion Infos from ddragon API : ", championData)
//             return championData
//         }
//
//         // setChampion((prevChampion) => ({
//         //     ...prevChampion,
//         //     id: championData.id,
//         //     key: championData.key,
//         //     name: championData.name,
//         //     title: championData.title,
//         //     //TODO images
//         //     //TODO Skins boucle -> nums
//         //     //TODO allyTips
//         //     //TODO enemyTips
//         // }));
//
//     } catch (error) {
//         console.error('Error : ', error)
//     }
// }
// export const fetchChampionStoryAndRelatedChampions = async (idChamp: string) => {
//     let id = idChamp.toLowerCase()
//     if(id === 'renata'){
//         id = 'renataglasc'
//     }
//     const MEEP_API_STORY_FULL = MEEP_API_STORY_BEGIN + id + MEEP_API_STORY_END
//     try {
//         const response = await axios.get(MEEP_API_STORY_FULL)
//         //const dataChamp = response.data['champion']
//         // const dataRelatedChampions = response.data['related-champions']
//         // const relatedChampions = dataRelatedChampions.map((champ:{name:string})    => ({
//         //     name: champ.name
//         // }));
//
//         return response.data
//         // console.log("Champion infos from meeps : ",dataChamp)
//         // console.log("Related champions : ",dataRelatedChampions)
//         //
//         // setChampion((prevChampion) => ({
//         //     ...prevChampion,
//         //     shortLore: dataChamp['biography']['short'],
//         //     fullLore: dataChamp['biography']['full'],
//         //     quote: dataChamp['biography']['quote'],
//         //     'related-champions': relatedChampions
//         // }));
//     } catch (error) {
//         console.error('Error : ', error)
//     }
// }
