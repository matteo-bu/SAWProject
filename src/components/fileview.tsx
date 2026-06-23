import { useParams } from "react-router";
import { Top } from "./top";
import "./projecteditgeneral.css";
import { getProjectInfo } from "../functions/project";
import { useEffect, useState } from "react";
import type { File } from "../misc/types";
import { FileSmall } from "./filesmall";

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

    return (
        <>
            <div className="container">
                <Top/>
                <div style={{marginTop: "20px"}}></div>
                <FileSmall projectid={id || ""} fileid={file?.id || ""} title={file?.title || ""} versions={file?.versions || []} platforms={file?.platforms || []} downloads={file?.downloads || 0}/>
                
                <div className="horizontal">
                    <div style={{width: "50%"}}>
                        <h3 className="tc1" style={{marginBottom: "10px"}}>Changelog</h3>
                        <h4 className="tc2 bc2" style={{overflowWrap: "break-word", cursor: "auto", width: "fit-content"}}>{file?.changelog}</h4>
                    </div>
                    <h4 className="tc1 bc2 bc3h" style={{width: "fit-content", height:"fit-content", marginLeft: "20px"}} onClick={() => window.open(file?.link)}>Download</h4>
                </div>
            </div>
        </>
    )

}