import { CommonRight } from "../components/commonright";
import { Filter } from "../components/filter";
import { ProjectSmall } from "../components/projectsmall";
import { Top } from "../components/top";
import { License, ModPluginDPCategories, Versions } from "../lists/common";
import { ModLoaders } from "../lists/mods";
import { Selection } from '../components/selection';
import { ProjectContext } from "../functions/project";
import { useContext } from "react";
import { CategorysContext, filtering, LicenseContext, LoadersContext, SearchContext, SortByContext, VersionsContext } from "../functions/filtering";

export function Mods(){

    const projectC = useContext(ProjectContext);
    if (!projectC) return;
    const { projects } = projectC;

    const versionC = useContext(VersionsContext);
    if (!versionC) return;
    const { versions } = versionC;

    const loaderC = useContext(LoadersContext);
    if (!loaderC) return;
    const { loaders} = loaderC;

    const categoryC = useContext(CategorysContext);
    if (!categoryC) return;
    const { categorys} = categoryC;

    const licenseC = useContext(LicenseContext);
    if (!licenseC) return;
    const { license} = licenseC;

    const searchC = useContext(SearchContext);
    if (!searchC) return;
    const { search} = searchC;

    const filter = filtering();
    if (!filter) return;
    const { sort } = filter;

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
    const p5 = p4.filter((p)=>{
        if (!license) return true;
        return ["Apache License 2.0",
                "MIT License"].includes(p.license);
    });
    const p6 = p5.filter((p)=>(
        p.name.includes(search)
    ))
    sort(p6);
    const filteredProjects = p6;

    return (
        <>
        <div className="container">
            <Top/>
            <Selection/>
            
            <div className="horizontal">
                <div className="left">
                    <Filter type="v" name="Game Version" list={Versions} bar={true}/>
                    <Filter type="l" name="Loader" list={ModLoaders} bar={true} />
                    <Filter type="c" name="Category" list={ModPluginDPCategories} bar={true} />
                    <Filter type="x" name="License" list={License} bar={false} />
                </div>

                <div className="vertical right">
                    <CommonRight/>
                    {filteredProjects.map((project, index) => (
                    <ProjectSmall key={index} type={"project"} projectid={project.id} name={project.name} author={project.username} downloads={project.downloads} platforms={project.tags} summary={project.summary}/>
                    ))}
                </div>
            </div>
            

        </div>
        </>
    );
}