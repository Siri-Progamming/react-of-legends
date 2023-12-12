interface ChampionList {
    id?: string | '';
    key?: number | 0;
    name?: string | '';
    title?: string | '';
    'releasedDate'?: Date | null;
    region?: string | '';
    info?: {
        attack?: number | 0;
        defense?: number | 0;
        magic?: number | 0;
        difficulty?: number | 0;
    }
    image?: {
        uri?: string | '',
        width?: number | 0,
        height?: number | 0,
        x?: number | 0,
        y?: number | 0
    }
    roles?: Array<string> | [];
}

export default ChampionList;