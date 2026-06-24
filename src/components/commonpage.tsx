import { License, ModPluginDPCategories, Versions } from '../lists/common';
import { ModLoaders } from '../lists/mods';
import './commonpage.css';
import { Top } from './top';
import { Selection } from './selection';
import { Sort } from './sort';
import { Filter } from './filter';
import { ProjectContext } from '../functions/project';
import { useContext, useState } from 'react';
import { ProjectSmall } from './projectsmall';
import { CategorysContext, LicenseContext, LoadersContext, SearchContext, VersionsContext } from '../functions/filtering';

export function Complete(){ //<>    

    const projectC = useContext(ProjectContext);
    if (!projectC) return;
    const { projects } = projectC;

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

    const p1 = projects.filter((p)=>{
        const files = p.files;
        return files.some((file)=>{
            const platforms = file.platforms;
            return platforms.some((platform)=>{
                return ModLoaders.includes(platform);
            })
        })
    });
    const p2 = p1.filter((p)=>{
        let copy = [...versions];
        const files = p.files;
        files.forEach((file)=>{
            const platforms = file.platforms;
            platforms.forEach((platform)=>{
                const pass = ModLoaders.includes(platform);
                if (pass) {
                    const vers = file.versions;
                    vers.forEach((v)=>{
                        copy = copy.filter((old)=>old != v);
                    })
                }
            })
        })
        return copy.length == 0;
    });
    const p3 = p2.filter((p)=>{
        let copy = [...loaders];
        const files = p.files;
        files.forEach((file)=>{
            const platforms = file.platforms;
            platforms.forEach((platform)=>{
                copy = copy.filter((old)=>old != platform);
            })
        })
        return copy.length == 0;
    });
    const p4 = p3.filter((p)=>{
        let copy = [...categorys];
        const files = p.tags;
        files.forEach((t)=>{
            copy = copy.filter((old)=>old != t);
        })
        return copy.length == 0;
    });

    const filteredProjects = p4;

    return (
        <>
        <div className="container">
            <Top/>
            <Selection/>
            
            <div className="horizontal">
                <div className="left">
                    <Filter name="Game Version" list={Versions} bar={true}/>
                    <Filter name="Loader" list={ModLoaders} bar={true} />
                    <Filter name="Category" list={ModPluginDPCategories} bar={true} />
                    <Filter name="License" list={License} bar={false} />
                </div>

                <div className="vertical right">
                    <input type="text" className="search" placeholder="Search..." onKeyUp={(e)=>setSearch(e.currentTarget.value)}/>
                    <Sort/>
                    {
                        versions.length > 0 ? 
                        <div className="horizontal" style={{flexWrap: "wrap"}}>
                        <h4 className="tc1 tt pmt10 pml10" onClick={()=>setVersions([])}>Versions</h4>
                        {versions.map((v)=>(
                            <p className="tt bc2 bc3h pmt10 pml10" style={{width:"fit-content"}}>{v}</p>
                        ))}
                        </div> : null
                    }

                    {
                        loaders.length > 0 ? 
                        <div className="horizontal" style={{flexWrap: "wrap"}}>
                        <h4 className="tc1 tt pmt10 pml10" onClick={()=>setLoaders([])}>Loaders</h4>
                        {loaders.map((v)=>(
                            <p className="tt bc2 bc3h pmt10 pml10" style={{width:"fit-content"}}>{v}</p>
                        ))}
                        </div> : null
                    }

                    {
                        categorys.length > 0 ? 
                        <div className="horizontal" style={{flexWrap: "wrap"}}>
                        <h4 className="tc1 tt pmt10 pml10" onClick={()=>setCategorys([])}>Misc</h4>
                        {categorys.map((v)=>(
                            <p className="tt bc2 bc3h pmt10 pml10" style={{width:"fit-content"}}>{v}</p>
                        ))}
                        </div> : null
                    }

                    {
                        license ? 
                        <div className="horizontal" style={{flexWrap: "wrap"}}>
                        <h4 className="tc1 tt pmt10 pml10" onClick={()=>setLicense("")}>License</h4>
                        <p className="tt bc2 bc3h pmt10 pml10" style={{width:"fit-content"}}>{license}</p>
                        </div> : null
                    }

                    {filteredProjects.map((project, index) => (
                        <ProjectSmall key={index} type={"project"} projectid={project.id} name={project.name} author={project.username} downloads={project.downloads} platforms={project.tags} summary={project.summary}/>
                    ))}
                </div>
            </div>
            

        </div>
        </>
    );
}