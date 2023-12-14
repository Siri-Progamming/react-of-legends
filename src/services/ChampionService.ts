// import {ChampionList} from "../interfaces/Champion.ts";
// import {fetchChampions, fetchChampionsImages} from "./ApiService.ts";
// import {useState} from "react";
//
// export const ChampionService = () => {
//     //const [champion, setChampion] = useState<Champion>(initChampion())
//     const [regions, setRegions] = useState<Array<string>>([])
//     const [roles, setRoles] = useState<Array<string>>([])
//     const createChampionsList = async ():Promise<Array<ChampionList>> => {
//         const championsList: Array<ChampionList> = []
//         try {
//             const dataChampions = await fetchChampions()
//             const champKeys = Object.keys(dataChampions)
//             const dataChampions2 = await fetchChampionsImages()
//
//             //Les nouveaux champions qui viennent de sortir peuvent ne pas être présents dans le JSON de l'API ddragon
//             const noMatchedChamp: Array<string> = []
//
//             for (let j = 0; j < dataChampions2.length; j++) {
//                 let matchedSomeone = false
//                 for (let i = 0; i < champKeys.length; i++) {
//                     const champName = dataChampions[champKeys[i]]['id'].toLowerCase()
//                     let meepChampName = dataChampions2[j].slug
//                     //Renata a son nom complet dans le JSON de l'API meep.
//                     if (dataChampions2[j].slug === 'renataglasc') {
//                         meepChampName = 'renata'
//                     }
//                     if (champName === meepChampName) {
//                         matchedSomeone = true
//                         championsList.push({
//                                 id: dataChampions[champKeys[i]]['id'],
//                                 key: dataChampions[champKeys[i]]['key'],
//                                 name: dataChampions[champKeys[i]]['name'],
//                                 title: dataChampions[champKeys[i]]['title'],
//                                 releasedDate: dataChampions2[j]['release-date'],
//                                 region: getRegionName(dataChampions2[j]['associated-faction-slug']),
//                                 info: {
//                                     attack: dataChampions[champKeys[i]]['info']['attack'],
//                                     defense: dataChampions[champKeys[i]]['info']['defense'],
//                                     magic: dataChampions[champKeys[i]]['info']['magic'],
//                                     difficulty: dataChampions[champKeys[i]]['info']['difficulty'],
//                                 },
//                                 image: {
//                                     uri: dataChampions2[j]['image']['uri'],
//                                     width: dataChampions2[j]['image']['width'],
//                                     height: dataChampions2[j]['image']['height'],
//                                     x: dataChampions2[j]['image']['x'],
//                                     y: dataChampions2[j]['image']['y'],
//                                 },
//                                 roles: getRolesNames(dataChampions[champKeys[i]]['tags'])
//                             })
//                         getRegions(getRegionName(dataChampions2[j]['associated-faction-slug']))
//                         getRoles(getRolesNames(dataChampions[champKeys[i]]['tags']))
//                         break;
//                     }
//                 }
//                 if (!matchedSomeone) {
//                     noMatchedChamp.push(dataChampions2[j]['slug'])
//                 }
//             }
//         } catch (error) {
//             console.error('Une erreur s\'est produite lors de la création de la liste des champions ', error)
//         }
//         return championsList
//     }
//
//     function getRegionName(region: string): string {
//         if (region === 'unaffiliated') {
//             return 'runeterra'
//         } else if (region === 'mount-targon') {
//             return 'targon'
//         } else if (region === 'shadow-isles') {
//             return 'îles obscures'
//         } else if (region === 'void') {
//             return 'le néant'
//         } else if (region === 'bandle-city') {
//             return 'bandle'
//         }
//         return region
//     }
//     function getRolesNames(roles: Array<string>): Array<string> {
//         const rolesNames: Array<string> = []
//         if (roles.length > 0) {
//             roles.map((role) => {
//                 role = role.toLowerCase()
//                 switch (role) {
//                     case 'fighter' :
//                         return rolesNames.push('combattant')
//                     case 'marksman' :
//                         return rolesNames.push('tireur')
//                     default :
//                         return rolesNames.push(role)
//                 }
//             })
//             return rolesNames
//         }
//         return roles
//     }
//     const getRegions = (region: string) => {
//         if (!regions.includes(region)) {
//             setRegions(prevRegions => [...prevRegions, region])
//         }
//     }
//     const getRoles = (champRoles: Array<string>) => {
//         champRoles.map((role) => {
//             if (!roles.includes(role)) {
//                 setRoles(prevRoles => [...prevRoles, role])
//             }
//         })
//     }
//
//     // function initChampion(): Champion {
//     //     console.log('Initialising champion')
//     //     return {
//     //         id: '',
//     //         key: 0,
//     //         name: '',
//     //         title: '',
//     //         'released-date': null,
//     //         region: '',
//     //         shortLore: '',
//     //         fullLore: '',
//     //         quote: '',
//     //         image: {
//     //             full: '',
//     //             loading: '',
//     //             square: '',
//     //         },
//     //         skins: [],
//     //         allyTips: [],
//     //         enemyTips: [],
//     //         roles: [],
//     //         spells: [],
//     //         passive: {
//     //             name: '',
//     //             description: '',
//     //             image: '',
//     //         },
//     //         'related-champions': []
//     //     }
//     // }
// }
// export default ChampionService
