interface Champion {
    id?: number | 0;
    name?: string | '';
    title?: string | '';
    region?: string | '';
    shortLore?: string | '';
    fullLore?: string | '';
    image: {
        full?: string | '';
        loading?: string | '';
        square?: string | '';
    };
    skins?: Array<{
        id?: string | '';
        num?: number | 0;
        name?: string | '';
        chromas?: boolean | false;
    }> | [];
    allyTips?: Array<string> | [];
    enemyTips?: Array<string> | [];
    tags?: Array<string> | [];
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
}
export default Champion;
