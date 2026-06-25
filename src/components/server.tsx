import { useNavigate, useParams } from "react-router";
import { getServerInfo } from "../functions/server";
import { Top } from "./top";
import type { ProjectServerExtra, Server } from "../misc/types";
import { useContext, useEffect, useState } from "react";
import { ProjectSmall } from "./projectsmall";
import { UserContext } from "../functions/user";

export function Server(){

    const navigator = useNavigate();

    const { id } = useParams();
    const [server, setServer] = useState<Server | null>(null);
    const [extra, setExtra] = useState<ProjectServerExtra | null>(null);
    const [ip, setIp] = useState("");

    const userC = useContext(UserContext);
    if (!userC) return;
    const {user} = userC;

    async function getInfo(){

        if (!id) return;
        const info = await getServerInfo(id);
        if (!info) return;
    
        const { Id, UserId, Name, Versions, Ip, Summary, Tags, Description, IssueTracker, SourceCode, WikiPage, Discord, Donation } = info;

        const a: Server = {
            id: Id(),
            userid: UserId(),
            name: Name(),
            versions: Versions(),
            summary: Summary(),
            tags: Tags()
        };
        const b: ProjectServerExtra = {
            description: Description(),
            issuetracker: IssueTracker(),
            sourcecode: SourceCode(),
            wikipage: WikiPage(),
            discord: Discord(),
            donation: Donation()
        }

        setServer(a);
        setExtra(b);
        setIp(Ip());

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
                <ProjectSmall type={"server"} projectid={server?.id ?? ""} name={server?.name ?? ""} platforms={server?.tags ?? []} summary={server?.summary ?? ""}/>
            </div>
            <hr className="hr20"/>

            <div className="horizontal">
                <div className="vertical" style={{width: "70%"}}>
                        
                    { user?.uid == server?.userid ? 
                    <div className="selection horizontal bc2 tc1" style={{marginTop: "0px", marginLeft: "15px"}}>
                        <h4 className="tt tt2 bc3h" onClick={() => navigator("/server/"+id+"/edit/general")}>Edit</h4>
                    </div> : null
                    }   
                    
                    <div className="projectdesc bc2 tc2">
                        <h3>{extra?.description}</h3>
                    </div>

                </div>

                <div className="vertical" style={{width: "28%", marginLeft: "20px", marginTop: "-15px"}}>

                    {   ip ? 
                    <div className="projectdesc bc2 tc2">
                        <h3 className="tc1 projecttitle">Server IP</h3>
                        <h4 className="tc2 bc3 wfc pmt10" style={{cursor: "auto"}}>{ip}</h4>
                    </div>: null}
                    
                    {   server?.versions.length || 0 > 0 ?
                    <div className="projectdesc bc2 tc2">
                        <h3 className="tc1 projecttitle">Versions</h3>
                        <div className="horizontal" style={{flexWrap: "wrap"}}>
                        {server?.versions.map((v, index)=> (
                            <h4 key={index} className="tc2 bc3 pml10 wfc pmt10" style={{cursor: "auto"}}>{v}</h4>
                        ))}
                        </div>
                    </div>: null}

                    {   extra?.issuetracker || extra?.sourcecode || extra?.wikipage || extra?.discord || extra?.donation ?
                    <div className="projectdesc bc2 tc2">
                        <h3 className="tc1 projecttitle">Links</h3>
                        {extra.issuetracker? <h3 className="tt tt2 bc3h" onClick={() => window.open(extra?.issuetracker)}>Report Issue</h3> : null}
                        {extra.sourcecode?<h3 className="tt tt2 bc3h" onClick={() => window.open(extra?.sourcecode)}>View Source</h3> : null}
                        {extra.wikipage?<h3 className="tt tt2 bc3h" onClick={() => window.open(extra?.wikipage)}>Visit Wiki</h3> : null}
                        {extra.discord?<h3 className="tt tt2 bc3h" onClick={() => window.open(extra?.discord)}>Join Discord Server</h3> : null}
                        {extra.donation?<h3 className="tt tt2 bc3h" onClick={() => window.open(extra?.donation)}>Donate</h3> : null}
                    </div> : null}

                    {   server?.tags.length || 0 > 0 ?
                    <div className="projectdesc bc2 tc2">
                        <h3 className="tc1">Tags</h3>
                        <div className="horizontal fww">
                        {server?.tags.map((tag, index)=> (
                            <h4 key={index} className="tc2 bc3 pml10 pmt10 wfc" style={{cursor: "auto"}}>{tag}</h4>
                        ))}
                        </div>
                    </div> : null}

                </div>
            </div>

        </div>
        </>
    );

}