import { useNavigate, useParams } from "react-router";
import { Top } from "./top";
import "./projecteditgeneral.css";
import { useContext, useEffect, useRef, useState } from "react";
import { Licenses } from "../lists/common";
import { getProjectInfo, ProjectContext } from "../functions/project";
import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase/config";
import { UserError } from "./usererror";
import { checkUser } from "../functions/checkuser";
import { UserLoading } from "./userloading";

export function ProjectEditGeneral(){

    const { id } = useParams();
    const x = checkUser("project",id || "");
    const navigator = useNavigate();

    const projectC = useContext(ProjectContext);
    if (!projectC) return;
    const { projects, setProjects } = projectC;

    const name = useRef<HTMLTextAreaElement>(null);
    const summary = useRef<HTMLTextAreaElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);
    const issuetracker = useRef<HTMLTextAreaElement>(null);
    const sourcecode = useRef<HTMLTextAreaElement>(null);
    const wikipage = useRef<HTMLTextAreaElement>(null);
    const discord = useRef<HTMLTextAreaElement>(null);
    const donation = useRef<HTMLTextAreaElement>(null);

    const [open, setOpen] = useState(false);
    const [license, setLicense] = useState("All Rights Reserved");

    async function getInfo(){

        if (!id) return;
        const info = await getProjectInfo(id);
        if (!info) return;
    
        const { Name, Summary, License, Description, IssueTracker, SourceCode, WikiPage, Discord, Donation } = info;
        name.current!.value = Name();
        summary.current!.value = Summary();
        description.current!.value = Description();
        issuetracker.current!.value = IssueTracker();
        sourcecode.current!.value = SourceCode();
        wikipage.current!.value = WikiPage();
        discord.current!.value = Discord();
        donation.current!.value = Donation();
        setLicense(License());

    }

    useEffect(() => {
        if (!id) return;
        getInfo();
    }, [id,x]);

    async function save(field: string, ref: React.RefObject<HTMLTextAreaElement | null>){
        if (!id) return;

        try {
            await setDoc(doc(db, "projects", id), {
            [field]: ref.current!.value
            },
            { merge: true });
            
        } catch (err) {
            console.log(err);
        }        
    }

    async function saveLicense(){
        if (!id) return;

        try {
            await setDoc(doc(db, "projects", id), {
            license: license
            },
            { merge: true });
            
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteProject(){
        if(!id) return;
        await deleteDoc(doc(db, "projects", id));
        setProjects(projects.filter((p)=>p.id != id));
        navigator("/profile");
    }

    return (
        x == null ? <UserLoading/> : x ? 
        <>
            <div className="container">
                <Top/>
                <div className="horizontal">
                    <div className="selection horizontal bc2 tc1">
                        <h4 className="tt tt2 bc3h" onClick={() => navigator("/project/"+id+"/edit/general")}>General</h4>
                        <h4 className="tt tt2 bc3h" onClick={() => navigator("/project/"+id+"/edit/tags")}>Tags</h4>
                        <h4 className="tt tt2 bc3h" onClick={() => navigator("/project/"+id+"/edit/files")}>Files</h4>
                    </div>
                    <div className="selection horizontal bc2 tc1" style={{marginLeft:"30px",backgroundColor:"red"}}>
                        <h4 className="tt tt2 bc3h" onClick={() => {deleteProject();}}>Delete Project</h4>
                    </div>
                </div>

                <div style={{marginTop: "30px"}}>
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

                    <div className="horizontal">
                        <h3 className="tc1" style={{marginRight: "10px", marginTop: "15px"}}>License</h3>
                        <div className="menu-wrapper-sort">
                            <div className="tt bc2 bc3h sort tc2 begin" onClick={() => setOpen(!open)}>
                                <h3>{license}</h3>
                                <h3>{open ? '-' : '+'}</h3>
                            </div>

                            <div className={`bc2 dropdown ${open ? "open" : ""}`}>
                                {Licenses.map((item) => (
                                    <p key={item} className="bc3h" onClick={() => { setLicense(item); setOpen(false); }}>{item}</p>
                                ))}
                            </div>
                        </div>
                        <h3 className="tt tc1 bc2 bc3h pml10" style={{marginTop: "5px"}} onClick={saveLicense}>Save New License</h3>
                    </div>

                </div>
                
            </div>
        </> : <UserError/>
    )

}