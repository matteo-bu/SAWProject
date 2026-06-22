import { Top } from "./top";
import { getProjectInfo } from "../functions/project";
import { getData } from "../functions/user";
import { useEffect, useState } from "react";
import type { Project, ProjectServerExtra } from '../misc/types';
import { useParams } from "react-router";
import { ProjectSmall } from "./projectsmall";
import "./project.css";

export function Project(){

    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [extra, setExtra] = useState<ProjectServerExtra | null>(null);
    const [seeing, setSeeing] = useState("description");

    async function getInfo(){

        if (!id) return;
        const info = await getProjectInfo(id);
        if (!info) return;
    
        const { Id, UserId, Name, Summary, Tags, Downloads, Files, License, Description, IssueTracker, SourceCode, WikiPage, Discord, Donation } = info;
        const { getName } = getData(UserId());

        const a: Project = {
            id: Id(),
            userid: UserId(),
            username: await getName() || "",
            name: Name(),
            summary: Summary(),
            tags: Tags(),
            downloads: Downloads(),
            files: Files(),
            license: License()
        };
        const b: ProjectServerExtra = {
            description: Description(),
            issuetracker: IssueTracker(),
            sourcecode: SourceCode(),
            wikipage: WikiPage(),
            discord: Discord(),
            donation: Donation()
        }

        setProject(a);
        setExtra(b);

    }

    useEffect(() => {
        if (!id) return;
        getInfo();
    }, [id]);    

    return (
        <>
        <div className="container">
            <Top/>
            <div style={{marginTop: "40px"}}>
                <ProjectSmall type={"project"} projectid={project?.id ?? ""} name={project?.name ?? ""} author={project?.username ?? ""} downloads={project?.downloads ?? 0} platforms={project?.tags ?? []} summary={project?.summary ?? ""}/>
            </div>
            <hr className="hr20"/>

            <div className="horizontal">
                <div className="vertical" style={{width: "70%"}}>

                    <div className="selection horizontal bc2 tc1" style={{marginTop: "0px"}}>
                        <h4 className="tt tt2 bc3h" onClick={() => setSeeing("description")}>Description</h4>
                        <h4 className="tt tt2 bc3h" onClick={() => setSeeing("versions")}>Versions</h4>   
                    </div>
                    
                    <div className="projectdesc bc2 tc2">
                        {
                            seeing === "description" ? 
                            <h3>{extra?.description}</h3>
                            :
                            <div className="top tc1" style={{justifyContent: "space-around"}}>
                                <h3>Name</h3>
                                <h3>Game Versions</h3>
                                <h3>Platforms</h3>
                                <h3>Downloads</h3>
                            </div>
                        }
                    </div>

                </div>

                <div className="vertical" style={{width: "28%", marginLeft: "20px", marginTop: "-15px"}}>
                    
                    <div className="projectdesc bc2 tc2">
                        <h3 className="tc1 projecttitle">Versions</h3>
                    </div>

                    <div className="projectdesc bc2 tc2">
                        <h3 className="tc1 projecttitle">Platforms</h3>
                    </div>

                    <div className="projectdesc bc2 tc2">
                        <h3 className="tc1 projecttitle">Links</h3>
                        <h3 className="tt tt2 bc3h" onClick={() => window.open(extra?.issuetracker)}>Report Issue</h3>
                        <h3 className="tt tt2 bc3h" onClick={() => window.open(extra?.sourcecode)}>View Source</h3>
                        <h3 className="tt tt2 bc3h" onClick={() => window.open(extra?.wikipage)}>Visit Wiki</h3>
                        <h3 className="tt tt2 bc3h" onClick={() => window.open(extra?.discord)}>Join Discord Server</h3>
                        <h3 className="tt tt2 bc3h" onClick={() => window.open(extra?.donation)}>Donate</h3>
                    </div>

                    <div className="projectdesc bc2 tc2">
                        <h3 className="tc1">Tags</h3>
                        <div className="horizontal" style={{flexWrap: "wrap"}}>
                        {project?.tags.map((tag, index)=> (
                            <h4 key={index} className="tc2 bc3" style={{marginLeft: "10px", width: "fit-content", cursor: "auto", marginTop: "10px"}}>{tag}</h4>
                        ))}
                        </div>
                    </div>

                    {<div className="projectdesc bc2 tc2">
                        <h3 className="tc1 projecttitle">License</h3>
                        <h3 className="tc2">{project?.license}</h3>
                    </div>}

                </div>
            </div>

            

        </div>
        </>
    );

}