import { useParams } from "react-router";
import { Top } from "./top";
import "./projecteditgeneral.css";
import { useEffect, useRef, useState } from "react";
import { getProjectInfo } from "../functions/project";
import { ShadersLoaders } from "../lists/shaders";
import { PluginLoaders } from "../lists/plugins";
import { ModLoaders } from "../lists/mods";
import { PackLoaders, Versions } from "../lists/common";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase/config";
import type { File } from "../misc/types";
import { FileColumn } from "./filecolumn";

export function FileEdit(){

    const { id, fileid } = useParams();
    const [status, setStatus] = useState("");

    const [loaders, setLoaders] = useState<string[]>([]);
    const [versions, setVersions] = useState<string[]>([]);

    const title = useRef<HTMLTextAreaElement>(null);
    const changelog = useRef<HTMLTextAreaElement>(null);
    const link = useRef<HTMLTextAreaElement>(null);

    async function getInfo(){

        if (!id || !fileid) return;
        const info = await getProjectInfo(id);
        if (!info) return;
    
        const { Files } = info;
        const fs = Files();
        const f = fs.find(x => x.id == fileid);
        if (!f) setStatus("nf");
        setLoaders(f!.platforms);
        setVersions(f!.versions);
        title.current!.value = f!.title;
        changelog.current!.value = f!.changelog;
        link.current!.value = f!.link;

    }

    function addRemoveLoader(loader: string){
        if (loaders?.includes(loader)) setLoaders(loaders.filter(old => old !== loader))
        else setLoaders(v => [...v, loader])
    }

    function addRemoveVersion(ver: string){
        if (versions?.includes(ver)) setVersions(versions.filter(old => old !== ver))
        else setVersions(v => [...v, ver])
    }

    useEffect(() => {
        if (!id) return;
        getInfo();
    }, [id,fileid]);

    async function saveTitle(){

        if (!id) return;
        const info = await getProjectInfo(id);
        if (!info) return;
    
        const { Files } = info;
        const fs = Files();
        const updatedFiles = fs.map((f)=>(
            f.id == fileid ? {...f, title: title.current!.value} : f
        ))

        finishSave(updatedFiles);
    }

    async function saveChangelog(){

        if (!id) return;
        const info = await getProjectInfo(id);
        if (!info) return;
    
        const { Files } = info;
        const fs = Files();
        const updatedFiles = fs.map((f)=>(
            f.id == fileid ? {...f, changelog: changelog.current!.value} : f
        ))

        finishSave(updatedFiles);
    }

    async function saveLink(){

        if (!id) return;
        const info = await getProjectInfo(id);
        if (!info) return;
    
        const { Files } = info;
        const fs = Files();
        const updatedFiles = fs.map((f)=>(
            f.id == fileid ? {...f, link: link.current!.value} : f
        ))

        finishSave(updatedFiles);
    }

    async function savePlatforms(){

        if (!id) return;
        const info = await getProjectInfo(id);
        if (!info) return;
    
        const { Files } = info;
        const fs = Files();
        const updatedFiles = fs.map((f)=>(
            f.id == fileid ? {...f, platforms: loaders} : f
        ))

        finishSave(updatedFiles);
    }

    async function saveVersions(){

        if (!id) return;
        const info = await getProjectInfo(id);
        if (!info) return;
    
        const { Files } = info;
        const fs = Files();
        const updatedFiles = fs.map((f)=>(
            f.id == fileid ? {...f, versions: versions} : f
        ))

        finishSave(updatedFiles);
    }

    async function finishSave(up: File[]){
        if (!id) return;
        try {
            await setDoc(doc(db, "projects", id), {
            files: up
            },
            { merge: true });
            
        } catch (err) {
            console.log(err);
        }
    }

    return ( status == "nf" ? 
        <>  
            <div className="container">
                <Top/>
                <div className="tc1" style={{textAlign: "center"}}>
                <h1>File Not Found</h1>
                <h1>Remember To Save A File Before Editing</h1>
                </div>
            </div>
        </> :
        <>
            <div className="container">
                <Top/>
                
                <div style={{marginTop: "30px"}}>
                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Title</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={saveTitle}>Save New Title</h3>
                    </div>
                    <textarea ref={title} className="bc3 tc1 projecteditarea" placeholder="Write New Title"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Changelog</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={saveChangelog}>Save New Changelog</h3>
                    </div>
                    <textarea ref={changelog} className="bc3 tc1 projecteditarea" placeholder="Write New Changelog"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Download Link</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10" onClick={saveLink}>Save New Download Link</h3>
                    </div>
                    <textarea ref={link} className="bc3 tc1 projecteditarea" placeholder="Write New Download Link"/>
                </div>

                <div className="horizontal begin" style={{marginRight: "10px"}}>

                    <FileColumn title={"Selected Platforms List"} items={loaders} fun={addRemoveLoader}/>
                    <FileColumn title={"Pack"} items={PackLoaders} fun={addRemoveLoader}/>
                    <FileColumn title={"Mod"} items={ModLoaders} fun={addRemoveLoader}/>
                    <FileColumn title={"Plugin"} items={PluginLoaders} fun={addRemoveLoader}/>
                    <FileColumn title={"Shaders"} items={ShadersLoaders} fun={addRemoveLoader}/>

                    <h3 className="tt tc1 bc2 bc3h pml10" style={{height: "fit-content"}} onClick={savePlatforms}>Save Platforms</h3>

                </div>

                <div className="horizontal begin pmt10" style={{marginRight: "10px"}}>
   
                    <FileColumn title={"Selected Versions"} items={versions} fun={addRemoveVersion}/>
                    <FileColumn title={"Versions"} items={Versions} fun={addRemoveVersion}/>

                    <h3 className="tt tc1 bc2 bc3h pml10" style={{height: "fit-content"}} onClick={saveVersions}>Save Versions</h3>

                </div>

            </div>
        </>
    )

}