import { useParams } from "react-router";
import { Top } from "./top";
import "./projecteditgeneral.css";
import { getProjectInfo } from "../functions/project";
import { useEffect, useState } from "react";
import type { File } from "../misc/types";
import { FileSmall } from "./filesmall";
import { doc, increment, runTransaction, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export function FileView(){

    const { id, fileid } = useParams();
    const [file, setFile] = useState<File | null>(null);
    
    async function getInfo(){

        if (!id) return;
        const info = await getProjectInfo(id);
        if (!info) return;
    
        const { Files } = info;
        const fs = Files();
        const f = fs.find(x => x.id == fileid);
        setFile(f!);

    }

    useEffect(() => {
        if (!id) return;
        getInfo();
    }, [id, fileid]);

    async function handleDownload(){
        if(!id) return;
        try {
            await updateDoc(
            doc(db, "projects", id),
            {
                downloads: increment(1)
            }
            );
        } catch (err) {
            console.error(err);
        }

        await runTransaction(db, async (transaction) => {
            const snap = await transaction.get(doc(db, "projects", id));
        
            if (!snap.exists()) {
                console.log("Project document does not exist");
                return;
            }
        
            const files = [...snap.data().files];
            const f = files.findIndex(x=>x.id == fileid);
            files[f].downloads+=1;
            transaction.update(doc(db, "projects", id), {files: files});
        });
    }

    return (
        <>
            <div className="container">
                <Top/>
                <div style={{marginTop: "20px"}}></div>
                <FileSmall projectid={id || ""} fileid={file?.id || ""} title={file?.title || ""} versions={file?.versions || []} platforms={file?.platforms || []} downloads={file?.downloads || 0}/>
                
                <div className="horizontal">
                    <div style={{width: "50%"}}>
                        <h3 className="tc1" style={{marginBottom: "10px"}}>Changelog</h3>
                        <h4 className="tc2 bc2 wfc" style={{overflowWrap: "break-word", cursor: "auto"}}>{file?.changelog || "No Changelog"}</h4>
                    </div>
                    <h4 className="tc1 bc2 bc3h wfc" style={{height:"fit-content", marginLeft: "20px"}} onClick={() => {handleDownload(); window.open(file?.link)}}>Download</h4>
                </div>
            </div>
        </>
    )

}