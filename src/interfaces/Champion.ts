interface Champion {
    id?: string | '';
    key?: number | 0;
    name?: string | '';
    title?: string | '';
    'released-date'?: Date | null;
    region?: string | '';
    shortLore?: string | '';
    fullLore?: string | '';
    quote?: string | '',
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
    roles?: Array<string> | [];
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
export default Champion;
