import { CommonRight } from "../components/commonright";
import { Filter } from "../components/filter";
import { ProjectSmall } from "../components/projectsmall";
import { Top } from "../components/top";
import { License, Versions } from "../lists/common";
import { Selection } from '../components/selection';
import { ProjectContext } from "../functions/project";
import { useContext } from "react";
import { filtering, VersionsContext } from "../functions/filtering";
import { ResourcepackCategories, ResourcepackFeatures, ResourcepackResolutions } from "../lists/resourcepacks";

export function ResourcePacksPage(){

    const projectC = useContext(ProjectContext);
    if (!projectC) return;
    const { projects } = projectC;

    const versionC = useContext(VersionsContext);
    if (!versionC) return;
    const { versions } = versionC;

    const filter = filtering();
    if (!filter) return;
    const { filterPlatform, filterCategory, filterLicense, filterName, sort } = filter;

    const p1 = projects.filter((p)=>{
        const files = p.files;
        return files.some((file)=>{
            const platforms = file.platforms;
            return platforms.some((platform)=>{
                return platform == "Resourcepack"
            })
        })
    });
    const p2 = p1.filter((p)=>{
        let copy = [...versions];
        const files = p.files;
        files.forEach((file)=>{
            const platforms = file.platforms;
            platforms.forEach((platform)=>{
                const pass = platform == "Resourcepack"
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
    const p3 = filterPlatform(p2);
    const p4 = filterCategory(p3);
    const p5 = filterLicense(p4);
    const p6 = filterName(p5);
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
                    <Filter type="c" name="Category" list={ResourcepackCategories} bar={true} />
                    <Filter type="c" name="Feature" list={ResourcepackFeatures} bar={true} />
                    <Filter type="c" name="Resolution" list={ResourcepackResolutions} bar={true} />
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