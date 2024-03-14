//[ APP ]///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const APP_TITLE:string = "LOREACT"
export const SLOGGAN_LOL:string = "Découvrez l'extraordinaire dans chaque histoire. Explorez l'épopée des champions de League of Legends comme si vous y étiez !"
export const LOCALE:string = 'fr_FR'

//[ API ]///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////// Histoires complètes, champions reliés, citations, région...
export const MEEP_API_STORY_BEGIN: string = 'https://universe-meeps.leagueoflegends.com/v1/fr_fr/champions/' //{champion}
export const MEEP_API_STORY_END: string = '/index.json'
///////// Images pour les champions :
export const MEEP_API_CHAMPIONS_SPLASH: string = 'https://universe-meeps.leagueoflegends.com/v1/fr_fr/champion-browse/index.json'


///////// Versions API DDRAGON
export const DDRAGON_API_VERSION:string = 'https://ddragon.leagueoflegends.com/api/versions.json'

///////// Vidéos pour les spells :
export const LOL_GAMEPLAY_JSON_BEGIN: string = 'https://www.leagueoflegends.com/page-data/fr-fr/champions/' //{champion}
export const LOL_GAMEPLAY_JSON_END: string = '/page-data.json'

/////////API DDRAGON
export const DDRAGON_API_BEGIN:string = 'https://ddragon.leagueoflegends.com/cdn/'
export const DDRAGON_API_LAST_VERSION:string = '14.5.1'
export const DDRAGON_API_AFTER_VERSION:string = '/data/'+LOCALE

export const DDRAGON_API_AFTER_LOCALE_CHAMPIONS_END:string = '/champion.json'
export const DDRAGON_API_AFTER_LOCALE_CHAMPION:string = '/champion/'
export const DDRAGON_API_AFTER_LOCALE_CHAMPION_END:string = '.json'

