import { createContext } from "react";
import type { Project, File } from "../misc/types";
import { db } from "../firebase/config";
import { doc, getDoc } from "@firebase/firestore";

export const ProjectContext = createContext<{ projects: Project[] | [], setProjects: React.Dispatch<React.SetStateAction<Project[] | []>> } | undefined>(undefined);

export async function getProjectInfo(uid: string){

    const projectRef = doc(db, "projects", uid);
    const snap = await getDoc(projectRef);
    if (!snap.exists()) {
        console.log("Project document does not exist");
        return;
    }
    const data = snap.data();

    function Id(): string{
        return uid;
    }

    function UserId(): string{
        return data.userid || "";
    }

    function Name(): string{
        return data.name || "";
    }

    function Summary(): string{
        return data.summary || "";
    }

    function Description(): string{
        return data.description || "";
    }

    function Tags(): string[]{
        return data.tags || [];
    }

    function Downloads(): number{
        return data.downloads || 0;
    }

    function Files(): File[]{
        return data.files || [];
    }

    function License(): string{
        return data.license || "";
    }

    function IssueTracker(): string{
        return data.issuetracker || "";
    }

    function SourceCode(): string{
        return data.sourcecode || "";
    }

    function WikiPage(): string{
        return data.wikipage || "";
    }

    function Discord(): string{
        return data.discord || "";
    }

    function Donation(): string{
        return data.donation || "";
    }

    return { Id, UserId, Name, Summary, Description, Tags, Downloads, Files, License, IssueTracker, SourceCode, WikiPage, Discord, Donation };

}