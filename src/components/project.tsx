import { Top } from "./top";
import { getProjectInfo } from "../functions/project";
import { getData } from "../functions/user";
import { useEffect, useState } from "react";
import type { Project } from '../misc/types';
import { useParams } from "react-router";
import { ProjectSmall } from "./projectsmall";

export function Project(){

    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);

    async function getInfo(){

        if (!id) return;
        const info = await getProjectInfo(id);
        if (!info) return;
    
        const { Id, UserId, Name, Summary, Tags, Downloads } = info;
        const { getName } = getData(UserId());

        const n: Project = {
            id: Id(),
            userid: UserId(),
            username: await getName() || "",
            name: Name(),
            summary: Summary(),
            tags: Tags(),
            downloads: Downloads()
        };
        setProject(n);

    }

    useEffect(() => {
        if (!id) return;
        getInfo();
        console.log(id);
    }, [id]);    

    return (
        <>
        <div className="container">
            <Top/>
            <div style={{marginTop: "40px"}}>
                <ProjectSmall type={"project"} projectid={project?.id ?? ""} name={project?.name ?? ""} author={project?.username ?? ""} downloads={project?.downloads ?? 0} platforms={project?.tags ?? []} summary={project?.summary ?? ""}/>
            </div>
            <hr className="hr20"/>

        </div>
        </>
    );

}