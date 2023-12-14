import {useContext} from "react";
import {ChampionsContext} from "./ChampionsProvider.tsx";

export const useChampionsContext = () => {
    return useContext(ChampionsContext);
}
