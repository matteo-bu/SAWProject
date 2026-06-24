import { useContext } from "react";
import { Sort } from "./sort";
import { CategorysContext, filtering, LicenseContext, LoadersContext, SearchContext, VersionsContext } from "../functions/filtering";
import "./commonright.css";

export function CommonRight(){

    const filter = filtering();
    if (!filter) return;
    const { handleClick } = filter;

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

    const searchC = useContext(SearchContext);
    if (!searchC) return;
    const { setSearch } = searchC;

    return (
        <>
            <div className="vertical">
                <input type="text" className="search" placeholder="Search..." onKeyUp={(e)=>setSearch(e.currentTarget.value)}/>
                <Sort/>
                {
                    versions.length > 0 ? 
                    <div className="horizontal" style={{flexWrap: "wrap"}}>
                    <h4 className="tc1 tt pmt10 pml10" onClick={()=>setVersions([])}>Versions</h4>
                    {versions.map((v)=>(
                        <p className="tt bc2 bc3h pmt10 pml10" style={{width:"fit-content"}} onClick={()=>handleClick("v",v)}>{v}</p>
                    ))}
                    </div> : null
                }
                {
                    loaders.length > 0 ? 
                    <div className="horizontal" style={{flexWrap: "wrap"}}>
                    <h4 className="tc1 tt pmt10 pml10" onClick={()=>setLoaders([])}>Loaders</h4>
                    {loaders.map((v)=>(
                        <p className="tt bc2 bc3h pmt10 pml10" style={{width:"fit-content"}} onClick={()=>handleClick("l",v)}>{v}</p>
                    ))}
                    </div> : null
                }
                {
                    categorys.length > 0 ? 
                    <div className="horizontal" style={{flexWrap: "wrap"}}>
                    <h4 className="tc1 tt pmt10 pml10" onClick={()=>setCategorys([])}>Misc</h4>
                    {categorys.map((v)=>(
                        <p className="tt bc2 bc3h pmt10 pml10" style={{width:"fit-content"}} onClick={()=>handleClick("c",v)}>{v}</p>
                    ))}
                    </div> : null
                }
                {
                    license ? 
                    <div className="horizontal" style={{flexWrap: "wrap"}}>
                    <h4 className="tc1 tt pmt10 pml10" onClick={()=>setLicense("")}>License</h4>
                    <p className="tt bc2 bc3h pmt10 pml10" style={{width:"fit-content"}} onClick={()=>handleClick("x","")}>Open Source</p>
                    </div> : null
                }
            </div>
        </>
    )
}