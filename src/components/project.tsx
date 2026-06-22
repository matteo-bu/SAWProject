import { Top } from "./top";
import { getProjectInfo } from "../functions/project";
import { getData } from "../functions/user";
import { useEffect, useState } from "react";
import type { Project, ProjectServerExtra } from '../misc/types';
import { useParams } from "react-router";
import { ProjectSmall } from "./projectsmall";

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

            <div className="selection horizontal bc2 tc1">
                <h4 className="tt tt2 bc3h" onClick={() => setSeeing("description")}>Description</h4>
                <h4 className="tt tt2 bc3h" onClick={() => setSeeing("versions")}>Versions</h4>   
            </div>

        </div>
        </>
    );

}