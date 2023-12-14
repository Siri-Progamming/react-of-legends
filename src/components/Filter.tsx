import React, {useEffect, useState} from 'react';
import {ChampionList} from "../interfaces/Champion.ts";

interface FilterProps {
    champions: Array<ChampionList>
    handleSearch: (championLists: ChampionList[]) => void
    regions: Array<string>
    roles: Array<string>
    //Déclaration de type de fonction en typescript :
    //getDifficultyName: (difficulty: number) => string
}

const Filter: React.FC<FilterProps> = ({champions, handleSearch, regions, roles}) => {
    const [regionFilter, setRegionFilter] = useState<string>('All')
    const [roleFilter, setRoleFilter] = useState<string>('All')
    const [difficultyFilter, setDifficultyFilter] = useState<string>('All')
    const [nameFilter, setNameFilter] = useState<string>('')

    const filterByName = (listToFilter: Array<ChampionList>): Array<ChampionList> => {
        return listToFilter.filter((champion => {
            return champion.name?.toLowerCase().startsWith(nameFilter.toLowerCase())
        }))
    }

    const filterByRegion = (listToFilter: Array<ChampionList>): Array<ChampionList> => {
        return listToFilter.filter((champion) => {
            return champion.region?.includes(regionFilter)
        })
    }

    const filterByRole = (listToFilter: Array<ChampionList>): Array<ChampionList> => {
        return listToFilter.filter((champion) => {
            return champion.roles?.map((role) => role.toLowerCase()).includes(roleFilter.toLowerCase())
        })
    }

    const filterByDifficulty =(listToFilter: Array<ChampionList>): Array<ChampionList> => {
        switch (difficultyFilter) {
            case 'faible':
               return listToFilter.filter((champion) => {
                    return champion.info.difficulty < 4
                })
            case 'modérée':
                return listToFilter.filter((champion) => {
                    return champion.info.difficulty >= 4 && champion.info.difficulty < 8
                })
            case 'élevée':
                return listToFilter.filter((champion) => {
                    return champion.info.difficulty >= 8
                })
            default:
                return listToFilter
        }
    }

    const filter = () => {
        let filteredList = champions
        if (nameFilter === '' && regionFilter === 'All' && roleFilter === 'All' && difficultyFilter === 'All') {
            filteredList = champions
            handleSearch(filteredList)
        }
        if (nameFilter !== '') {
            filteredList = filterByName(filteredList)
        }
        if (regionFilter !== 'All') {
            filteredList = filterByRegion(filteredList)
        }
        if (roleFilter !== 'All') {
            filteredList = filterByRole(filteredList)
        }
        if (difficultyFilter !== 'All') {
            filteredList = filterByDifficulty(filteredList)
        }
        handleSearch(filteredList)
    }


    useEffect(() => {
        filter()
    }, [nameFilter, regionFilter, roleFilter, difficultyFilter]);

    return (
        <div id="filterbar">
            <form className="flex flex-row flex-wrap justify-center items-center">
                <label className="form-control">
                    <input type="text" placeholder="Nom" className="input input-bordered w-full max-w-xs"
                           onChange={(e) => setNameFilter(e.target.value)}
                    />
                </label>

                <label className="form-control max-w-xs">
                    <select className="select select-bordered" defaultValue="Région"
                            onChange={(e) => setRegionFilter(e.target.value)}>
                        <option disabled value="Région">Région</option>
                        <option value="All">--ALL--</option>
                        {regions.sort((a, b) => a.localeCompare(b)).map((region) => {
                            return <option value={region} className="capitalize" key={region}>{region}</option>
                        })}
                    </select>
                </label>

                <label className="form-control max-w-xs">
                    <select className="select select-bordered" defaultValue="Rôle"
                            onChange={(e) => setRoleFilter(e.target.value)}>
                        <option disabled value="Rôle">Rôle</option>
                        <option value="All">--ALL--</option>
                        {roles.sort((a, b) => a.localeCompare(b)).map((role) => {
                            return <option value={role} className="capitalize" key={role}>{role}</option>
                        })}
                    </select>
                </label>

                <label className="form-control  max-w-xs">
                    <select className="select select-bordered" defaultValue="Difficulté"
                            onChange={(e) => setDifficultyFilter(e.target.value)}>
                        <option disabled value="Difficulté">Difficulté</option>
                        <option value="All">--ALL--</option>
                        <option value="faible">★☆☆</option>
                        <option value="modérée">★★☆</option>
                        <option value="élevée">★★★</option>
                    </select>
                </label>

            </form>
            {/*<div>Champions : {}</div>*/}
        </div>
    );
};

export default Filter;
