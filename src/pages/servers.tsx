import { Filter } from "../components/filter";
import { ProjectSmall } from "../components/projectsmall";
import { Top } from "../components/top";
import { Versions } from "../lists/common";
import { Selection } from '../components/selection';
import { useContext } from "react";
import { CategorysContext, filtering, SearchContext, VersionsContext } from "../functions/filtering";
import { ServerContext } from "../functions/server";
import { ServerCommunities, ServerFeatures, ServerGameplays, ServerLanguages, ServerMetas, ServerRegions, ServerTypes } from "../lists/servers";

export function ServersPage(){

    const serverC = useContext(ServerContext);
    if (!serverC) return;
    const { servers } = serverC;

    const versionC = useContext(VersionsContext);
    if (!versionC) return;
    const { versions, setVersions } = versionC;

    const categoryC = useContext(CategorysContext);
    if (!categoryC) return;
    const { categorys, setCategorys } = categoryC;

    const searchC = useContext(SearchContext);
    if (!searchC) return;
    const { search, setSearch } = searchC;

    const filter = filtering();
    if (!filter) return;
    const { handleClick } = filter;

    const p1 = servers.filter((p)=>{
        let copy = [...versions];
        const serVer = p.versions;
        serVer.forEach((v)=>{
            copy = copy.filter((old)=>old != v);
        })
        return copy.length == 0;
    });
    const p2 = p1.filter((p)=>{
            let copy = [...categorys];
            const tags = p.tags;
            tags.forEach((t)=>{
                copy = copy.filter((old)=>old != t);
            })
            return copy.length == 0;
        });
    const p3 = p2.filter((p)=>p.name.includes(search));
    p3.sort((a,b)=>{
        return a.name.localeCompare(b.name);
    });
    const filteredServers = p3;

    return (
        <>
        <div className="container">
            <Top/>
            <Selection/>
            
            <div className="horizontal">
                <div className="left">
                    <Filter type="v" name="Game Version" list={Versions} bar={true}/>
                    <Filter type="c" name="Type" list={ServerTypes} bar={false} />
                    <Filter type="c" name="Features" list={ServerFeatures} bar={true} />
                    <Filter type="c" name="Gameplay" list={ServerGameplays} bar={true} />
                    <Filter type="c" name="Meta" list={ServerMetas} bar={true} />
                    <Filter type="c" name="Community" list={ServerCommunities} bar={true} />
                    <Filter type="c" name="Region" list={ServerRegions} bar={true} />
                    <Filter type="c" name="Language" list={ServerLanguages} bar={true} />
                </div>

                <div className="vertical right">
                    <input type="text" className="search" placeholder="Search..." onKeyUp={(e)=>setSearch(e.currentTarget.value)}/>
                    {
                        versions.length > 0 ? 
                        <div className="horizontal fww">
                        <h4 className="tc1 tt pmt10 pml10" onClick={()=>setVersions([])}>Versions</h4>
                        {versions.map((v, i)=>(
                            <p key={i} className="tt bc2 bc3h pmt10 pml10 wfc" onClick={()=>handleClick("v",v)}>{v}</p>
                        ))}
                        </div> : null
                    }
                    {
                        categorys.length > 0 ? 
                        <div className="horizontal fww">
                        <h4 className="tc1 tt pmt10 pml10" onClick={()=>setCategorys([])}>Misc</h4>
                        {categorys.map((v, i)=>(
                            <p key={i} className="tt bc2 bc3h pmt10 pml10 wfc" onClick={()=>handleClick("c",v)}>{v}</p>
                        ))}
                        </div> : null
                    }
                    {filteredServers.map((server, index) => (
                    <ProjectSmall key={index} type={"server"} projectid={server.id} name={server.name} platforms={server.tags} summary={server.summary}/>
                    ))}
                </div>
            </div>
            

        </div>
        </>
    );
}