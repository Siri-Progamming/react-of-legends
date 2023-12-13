import React, {useEffect, useState} from 'react';
import ChampionList from "../interfaces/ChampionList.ts";

interface FilterProps {
    champions: Array<ChampionList>
    handleSearch: Array<ChampionList>
    regions: Array<string>
    roles: Array<string>
    getDifficultyName: (difficulty: number) => string
}

const Filter: React.FC<FilterProps> = ({champions, handleSearch, regions, roles, getDifficultyName}) => {
    const [search, setSearch] = useState<string>('')
    const difficulties = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const filterByName = (name: string) => {
        setSearch(name)
        handleSearch(champions.filter((champion) => {
            return champion.name?.toLowerCase().startsWith(name.toLowerCase())
        }))
    }

    const filterByRegion = (region: string) => {
        console.log("Filter by region")
        if (region === 'All') return handleSearch(champions)
        handleSearch(champions.filter((champion) => {
            return champion.region?.includes(region)
        }))
    }

    const filterByRole = (role: string) => {
        console.log("Filter by role")
        if (role === 'All') return handleSearch(champions)
        handleSearch(champions.filter((champion) => {
            console.log("champion roles : ", champion.roles)
            console.log("role : ", role)
            return champion.roles?.map((role) => role.toLowerCase()).includes(role.toLowerCase())
        }))
    }

    const filterByDifficulty = (difficulty: number) => {

    }

    useEffect(() => {
        console.log(search)
    }, [search]);

    return (
        <div>
            <form className="flex flex-row flex-wrap justify-center">
                <label className="form-control">
                    <input type="text" placeholder="Nom" className="input input-bordered w-full max-w-xs"
                           onChange={(e) => filterByName(e.target.value)}
                    />
                </label>

                <label className="form-control max-w-xs">
                    <select className="select select-bordered" defaultValue="Région"
                            onChange={(e) => filterByRegion(e.target.value)}>
                        <option disabled value="Région">Région</option>
                        <option value="All">--ALL--</option>
                        {regions.sort((a, b) => a.localeCompare(b)).map((region) => {
                            return <option value={region} className="capitalize" key={region}>{region}</option>
                        })}
                    </select>
                </label>

                <label className="form-control max-w-xs">
                    <select className="select select-bordered" defaultValue="Rôle"
                            onChange={(e) => filterByRole(e.target.value)}>
                        <option disabled value="Rôle">Rôle</option>
                        <option value="All">--ALL--</option>
                        {roles.sort((a, b) => a.localeCompare(b)).map((role) => {
                            return <option value={role} className="capitalize" key={role}>{role}</option>
                        })}
                    </select>
                </label>

                <label className="form-control  max-w-xs">
                    <select className="select select-bordered" defaultValue="Difficulté">
                        <option disabled value="Difficulté">Difficulté</option>
                        <option value="All">--ALL--</option>

                    </select>
                </label>

            </form>
        </div>
    );
};

export default Filter;
