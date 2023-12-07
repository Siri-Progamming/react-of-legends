interface ChampionList {
    id?: string | '';
    key?: number | 0;
    name?: string | '';
    title?: string | '';
    'released-date'?: Date | null;
    region?: string | '';
    info?: {
        attack?: number | 0;
        defense?: number | 0;
        magic?: number | 0;
        difficulty?: number | 0;
    }
    image?: string | '';
    roles?: Array<string> | [];
}

export default ChampionList;
