import { createContext } from "react";
import type { Server } from "../misc/types";
import { db } from "../firebase/config";
import { doc, getDoc } from "@firebase/firestore";

export const ServerContext = createContext<{ servers: Server[], setServers: React.Dispatch<React.SetStateAction<Server[]>> } | undefined>(undefined);

export async function getServerInfo(uid: string){

    const projectRef = doc(db, "servers", uid);
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

    function Ip(): string{
        return data.ip || "";
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

    function Versions(): string[]{
        return data.versions || [];
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

    return { Id, UserId, Name, Ip, Summary, Description, Tags, Versions, IssueTracker, SourceCode, WikiPage, Discord, Donation };

}