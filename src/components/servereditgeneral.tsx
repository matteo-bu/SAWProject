import { useNavigate, useParams } from "react-router";
import { Top } from "./top";
import { useEffect, useRef} from "react";
import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase/config";
import { getServerInfo } from "../functions/server";
import { UserError } from "./usererror";
import { checkUser } from "../functions/checkuser";
import { UserLoading } from "./userloading";

export function ServerEditGeneral(){

    const { id } = useParams();
    const x = checkUser("server",id || "");
    const navigator = useNavigate();

    const ip = useRef<HTMLTextAreaElement>(null);
    const name = useRef<HTMLTextAreaElement>(null);
    const summary = useRef<HTMLTextAreaElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);
    const issuetracker = useRef<HTMLTextAreaElement>(null);
    const sourcecode = useRef<HTMLTextAreaElement>(null);
    const wikipage = useRef<HTMLTextAreaElement>(null);
    const discord = useRef<HTMLTextAreaElement>(null);
    const donation = useRef<HTMLTextAreaElement>(null);

    async function getInfo(){

        if (!id) return;
        const info = await getServerInfo(id);
        if (!info) return;
    
        const { Name, Summary, Ip, Description, IssueTracker, SourceCode, WikiPage, Discord, Donation } = info;
        ip.current!.value = Ip();
        name.current!.value = Name();
        summary.current!.value = Summary();
        description.current!.value = Description();
        issuetracker.current!.value = IssueTracker();
        sourcecode.current!.value = SourceCode();
        wikipage.current!.value = WikiPage();
        discord.current!.value = Discord();
        donation.current!.value = Donation();

    }

    useEffect(() => {
        if (!id) return;
        getInfo();
    }, [id,x]);

    async function save(field: string, ref: React.RefObject<HTMLTextAreaElement | null>){
        if (!id) return;

        try {
            await setDoc(doc(db, "servers", id), {
            [field]: ref.current!.value
            },
            { merge: true });
            
        } catch (err) {
            console.log(err);
        }        
    }

    async function deleteServer(){
        if(!id) return;
        await deleteDoc(doc(db, "servers", id));
        navigator("/profile");
    }

    return (
        x == null ? <UserLoading/> : x ?
        <>
            <div className="container">
                <Top/>
                <div className="horizontal">
                    <div className="selection horizontal bc2 tc1">
                        <h4 className="tt tt2 bc3h" onClick={() => navigator("/server/"+id+"/edit/general")}>General</h4>
                        <h4 className="tt tt2 bc3h" onClick={() => navigator("/server/"+id+"/edit/tags")}>Tags And Versions</h4>
                    </div>
                    <div className="selection horizontal bc2 tc1" style={{marginLeft:"30px",backgroundColor:"red"}}>
                        <h4 className="tt tt2 bc3h" onClick={() => {deleteServer();}}>Delete Server</h4>
                    </div>
                </div>

                <div style={{marginTop: "30px"}}>
                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Ip</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={()=>save("ip",ip)}>Save New Ip</h3>
                    </div>
                    <textarea ref={ip} className="bc3 tc1 projecteditarea" maxLength={50} placeholder="Write New Ip"/>
                    
                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Name</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={()=>save("name",name)}>Save New Name</h3>
                    </div>
                    <textarea ref={name} className="bc3 tc1 projecteditarea" maxLength={50} placeholder="Write New Name (50 characters max)"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Summary</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={()=>save("summary",summary)}>Save New Summary</h3>
                    </div>
                    <textarea ref={summary} className="bc3 tc1 projecteditarea" maxLength={150} placeholder="Write New Summary (150 characters max)"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Description</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={()=>save("description",description)}>Save New Description</h3>
                    </div>
                    <textarea ref={description} className="bc3 tc1 projecteditarea" placeholder="Write New Description"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10">IssueTracker Link</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={()=>save("issuetracker",issuetracker)}>Save New IssueTracker Link</h3>
                    </div>
                    <textarea ref={issuetracker} className="bc3 tc1 projecteditarea" placeholder="Write New IssueTracker Link"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10">Sourcecode Link</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={()=>save("sourcecode",sourcecode)}>Save New Sourcecode Link</h3>
                    </div>
                    <textarea ref={sourcecode} className="bc3 tc1 projecteditarea" placeholder="Write New Sourcecode Link"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10">Wikipage Link</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={()=>save("wikipage",wikipage)}>Save New Wikipage Link</h3>
                    </div>
                    <textarea ref={wikipage} className="bc3 tc1 projecteditarea" placeholder="Write New Wikipage Link"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Discord Link</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={()=>save("discord",discord)}>Save New Discord Link</h3>
                    </div>
                    <textarea ref={discord} className="bc3 tc1 projecteditarea" placeholder="Write New Discord Link"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Donation Link</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={()=>save("donation",donation)}>Save New Donation Link</h3>
                    </div>
                    <textarea ref={donation} className="bc3 tc1 projecteditarea" placeholder="Write New Donation Link"/>

                </div>
                
            </div>
        </> : <UserError/>
    )

}