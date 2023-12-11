import React from 'react';
import ChampionList from "../interfaces/ChampionList.ts";

interface FilterProps {
    champions: Array<ChampionList>
}
const Filter: React.FC<FilterProps> = ({champions}) => {
    return (
        <div>
            <form className="flex flex-row justify-center">
                <label className="form-control">
                    <input type="text" placeholder="Nom" className="input input-bordered w-full max-w-xs"/>
                </label>

                <label className="form-control max-w-xs">
                    <select className="select select-bordered">
                        <option disabled selected>Région</option>
                        <option>All</option>
                        <option>MAP REGIONS</option>
                    </select>
                </label>

                <label className="form-control max-w-xs">
                    <select className="select select-bordered">
                        <option disabled selected>Rôle</option>
                        <option>All</option>
                        <option>MAP ROLES</option>
                    </select>
                </label>

                <label className="form-control  max-w-xs">
                    <select className="select select-bordered">
                        <option disabled selected>Difficulté</option>
                        <option>All</option>
                        <option>MAP REGIONS</option>
                    </select>
                </label>

            </form>
        </div>
    );
};

export default Filter;
