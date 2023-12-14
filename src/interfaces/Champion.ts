export interface ChampionList {
    id?: string | '';
    key?: number | 0;
    name?: string | '';
    title?: string | '';
    'releasedDate'?: Date | null;
    region?: string | '';
    info: {
        attack: number | 0;
        defense: number | 0;
        magic: number | 0;
        difficulty: number | 0;
    }
    image: {
        uri: string | '',
        width: number | 0,
        height: number | 0,
        x: number | 0,
        y: number | 0
    }
    roles?: Array<string> | [];
}

export interface Champion extends ChampionList{
    shortLore?: string | '';
    fullLore?: string | '';
    quote?: string | '',
    skins?: Array<{
        id?: string | '';
        num?: number | 0;
        name?: string | '';
        chromas?: boolean | false;
    }> | [];
    allyTips?: Array<string> | [];
    enemyTips?: Array<string> | [];
    spells?: Array<{
        id?: string | '';
        name?: string | '';
        description?: string | '';
        image?: string | '';
    }> | [];
    passive: {
        name?: string | '';
        description?: string | '';
        image?: string | '';
    };
    'related-champions': Array<string> | []
}
