import { createContext } from "react";

export const VersionsContext = createContext<{ versions: string[], setVersions: React.Dispatch<React.SetStateAction<string[]>> } | undefined>(undefined);
export const LoadersContext = createContext<{ loaders: string[], setLoaders: React.Dispatch<React.SetStateAction<string[]>> } | undefined>(undefined);
export const CategorysContext = createContext<{ categorys: string[], setCategorys: React.Dispatch<React.SetStateAction<string[]>> } | undefined>(undefined);
export const LicenseContext = createContext<{ license: string, setLicense: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined);
export const SortByContext = createContext<{ sortBy: string, setSortBy: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined);
export const SearchContext = createContext<{ search: string, setSearch: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined);