import {createContext, ReactNode, useEffect, useState} from 'react';
import {ChampionList} from "../interfaces/Champion.ts";

interface DefaultValues{
    championsContext: Array<ChampionList>
    setChampionsContext: (champions:Array<ChampionList>) => void
}
const defaultValues:DefaultValues = {
    championsContext: [],
    setChampionsContext: () => {}
}

export const ChampionsContext = createContext(defaultValues);

export const ChampionsProvider = ({children}: { children: ReactNode }) => {
    const [championsContext, setChampionsContext] = useState<Array<ChampionList>>([])

    useEffect(() => {
        console.log("From ChampionsProvider : ", championsContext)
    }, [championsContext]);

    return (
        <ChampionsContext.Provider value={{championsContext, setChampionsContext}}>
            {children}
        </ChampionsContext.Provider>
    );
};
export default ChampionsProvider
