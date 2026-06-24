import { createContext, useContext } from "react";
import type { Project } from "../misc/types";

export const VersionsContext = createContext<{ versions: string[], setVersions: React.Dispatch<React.SetStateAction<string[]>> } | undefined>(undefined);
export const LoadersContext = createContext<{ loaders: string[], setLoaders: React.Dispatch<React.SetStateAction<string[]>> } | undefined>(undefined);
export const CategorysContext = createContext<{ categorys: string[], setCategorys: React.Dispatch<React.SetStateAction<string[]>> } | undefined>(undefined);
export const LicenseContext = createContext<{ license: string, setLicense: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined);
export const SortByContext = createContext<{ sortBy: string, setSortBy: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined);
export const SearchContext = createContext<{ search: string, setSearch: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined);

export function filtering(){
    
    const versionC = useContext(VersionsContext);
    if (!versionC) return;
    const { versions, setVersions } = versionC;

    const loaderC = useContext(LoadersContext);
    if (!loaderC) return;
    const { loaders, setLoaders } = loaderC;

    const categoryC = useContext(CategorysContext);
    if (!categoryC) return;
    const { categorys, setCategorys } = categoryC;

    const licenseC = useContext(LicenseContext);
    if (!licenseC) return;
    const { license, setLicense } = licenseC;

    const sortC = useContext(SortByContext);
    if (!sortC) return;
    const { sortBy } = sortC;

    function handleClick(type: string, s: string){
        switch (type){
            case "v": !versions.includes(s) ? setVersions((old)=>[...old,s]) : setVersions(versions.filter((old)=>old != s)); break;
            case "l": !loaders.includes(s) ? setLoaders((old)=>[...old,s]) : setLoaders(loaders.filter((old)=>old != s)); break;
            case "c": !categorys.includes(s) ? setCategorys((old)=>[...old,s]) : setCategorys(categorys.filter((old)=>old != s)); break;
            default: license == "" ? setLicense("x") : setLicense("");
        }
    }

    function sort(projects: Project[]){
        projects.sort((a,b)=>{
            switch(sortBy){
                case "Author": return a.userid.localeCompare(b.userid);
                case "Downloads": return b.downloads - a.downloads;
                default: return a.name.localeCompare(b.name);
            }
        })
    }

    return { handleClick, sort };

}