import { useNavigate, useParams } from "react-router";
import { Top } from "./top";
import { useEffect, useRef} from "react";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase/config";
import { getServerInfo } from "../functions/server";

export function ServerEditGeneral(){

    const { id } = useParams();
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
    }, [id]);

    async function saveIp(){
        if (!id) return;

        try {
            await setDoc(doc(db, "servers", id), {
            ip: ip.current!.value
            },
            { merge: true });
            
        } catch (err) {
            console.log(err);
        }
    }

    async function saveName(){
        if (!id) return;

        try {
            await setDoc(doc(db, "servers", id), {
            name: name.current!.value
            },
            { merge: true });
            
        } catch (err) {
            console.log(err);
        }
    }

    async function saveSummary(){
        if (!id) return;

        try {
            await setDoc(doc(db, "servers", id), {
            summary: summary.current!.value
            },
            { merge: true });
            
        } catch (err) {
            console.log(err);
        }
    }

    async function saveDescription(){
        if (!id) return;

        try {
            await setDoc(doc(db, "servers", id), {
            description: description.current!.value
            },
            { merge: true });
            
        } catch (err) {
            console.log(err);
        }
    }

    async function saveIssueTracker(){
        if (!id) return;

        try {
            await setDoc(doc(db, "servers", id), {
            issuetracker: issuetracker.current!.value
            },
            { merge: true });
            
        } catch (err) {
            console.log(err);
        }
    }

    async function saveSourceCode(){
        if (!id) return;

        try {
            await setDoc(doc(db, "servers", id), {
            sourcecode: sourcecode.current!.value
            },
            { merge: true });
            
        } catch (err) {
            console.log(err);
        }
    }

    async function saveWikiPage(){
        if (!id) return;

        try {
            await setDoc(doc(db, "servers", id), {
            wikipage: wikipage.current!.value
            },
            { merge: true });
            
        } catch (err) {
            console.log(err);
        }
    }

    async function saveDiscord(){
        if (!id) return;

        try {
            await setDoc(doc(db, "servers", id), {
            discord: discord.current!.value
            },
            { merge: true });
            
        } catch (err) {
            console.log(err);
        }
    }

    async function saveDonation(){
        if (!id) return;

        try {
            await setDoc(doc(db, "servers", id), {
            donation: donation.current!.value
            },
            { merge: true });
            
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="container">
                <Top/>
                <div className="selection horizontal bc2 tc1">
                    <h4 className="tt tt2 bc3h" onClick={() => navigator("/server/"+id+"/edit/general")}>General</h4>
                    <h4 className="tt tt2 bc3h" onClick={() => navigator("/server/"+id+"/edit/tags")}>Tags And Versions</h4>
                </div>

                <div style={{marginTop: "30px"}}>
                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Ip</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={saveIp}>Save New Ip</h3>
                    </div>
                    <textarea ref={ip} className="bc3 tc1 projecteditarea" maxLength={50} placeholder="Write New Ip"/>
                    
                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Name</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={saveName}>Save New Name</h3>
                    </div>
                    <textarea ref={name} className="bc3 tc1 projecteditarea" maxLength={50} placeholder="Write New Name (50 characters max)"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Summary</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={saveSummary}>Save New Summary</h3>
                    </div>
                    <textarea ref={summary} className="bc3 tc1 projecteditarea" maxLength={150} placeholder="Write New Summary (150 characters max)"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Description</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={saveDescription}>Save New Description</h3>
                    </div>
                    <textarea ref={description} className="bc3 tc1 projecteditarea" placeholder="Write New Description"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10">IssueTracker Link</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={saveIssueTracker}>Save New IssueTracker Link</h3>
                    </div>
                    <textarea ref={issuetracker} className="bc3 tc1 projecteditarea" placeholder="Write New IssueTracker Link"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10">Sourcecode Link</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={saveSourceCode}>Save New Sourcecode Link</h3>
                    </div>
                    <textarea ref={sourcecode} className="bc3 tc1 projecteditarea" placeholder="Write New Sourcecode Link"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10">Wikipage Link</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={saveWikiPage}>Save New Wikipage Link</h3>
                    </div>
                    <textarea ref={wikipage} className="bc3 tc1 projecteditarea" placeholder="Write New Wikipage Link"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Discord Link</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={saveDiscord}>Save New Discord Link</h3>
                    </div>
                    <textarea ref={discord} className="bc3 tc1 projecteditarea" placeholder="Write New Discord Link"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Donation Link</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={saveDonation}>Save New Donation Link</h3>
                    </div>
                    <textarea ref={donation} className="bc3 tc1 projecteditarea" placeholder="Write New Donation Link"/>

                </div>
                
            </div>
        </>
    )

}