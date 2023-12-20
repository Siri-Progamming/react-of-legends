import {ChampionList} from "../interfaces/Champion.ts";

/* On a pas de BDD alors on simule et on CACHE les données dans le localStorage */
export const setChampionsIdLocalStorage = (championsFromChampionsPage:ChampionList[]) => {
    console.log("je passe ici")
    const championsIdList:string[] = []
    championsFromChampionsPage.forEach(champion => {
        if(champion.id !== undefined){
            championsIdList.push(champion.id)
        }
    })
    localStorage.setItem('@champions_id', JSON.stringify(championsIdList))
}

export const setChampionsRegionsLocalStorage = (regions:string[]) => {
    localStorage.setItem('@champions_regions', JSON.stringify(regions))
}

export const setChampionsRolesLocalStorage = (roles:string[]) => {
    localStorage.setItem('@champions_roles', JSON.stringify(roles))
}
