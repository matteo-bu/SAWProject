import { useNavigate, useParams } from "react-router";
import { Top } from "./top";
import "./projecteditgeneral.css";
import { useContext, useEffect, useState } from "react";
import { getProjectInfo } from "../functions/project";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase/config";
import type { File } from "../misc/types";
import { getData, UserContext } from "../functions/user";
import { FileSmall } from "./filesmall";

export function ProjectEditFiles(){

    const userC = useContext(UserContext);
    if (!userC) return;
    const {user} = userC;

    const { id } = useParams();
    const [files, setFiles] = useState<File[]>([]);
    const navigator = useNavigate();

    async function getInfo(){

        if (!id) return;
        const info = await getProjectInfo(id);
        if (!info) return;
    
        const { Files } = info;
        setFiles(Files);

    }

    useEffect(() => {
        if (!id) return;
        getInfo();
    }, [id]);

    async function addFile(){

        if (!user) return;
        const { getProgressionNumber } = getData(user.uid);
        const number = await getProgressionNumber();

        const n: File = {
            id: user.uid+number,
            title: "defaultTitle",
            versions: [],
            platforms: [],
            downloads: 0,
            link: "",
            changelog: ""
        }
        setFiles(p => [n, ...p])
    }

    async function saveFiles(){
        if (!id) return;

        try {
            await setDoc(doc(db, "projects", id), {
            files: files
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
                <div className="horizontal">
                    <div className="selection horizontal bc2 tc1">
                        <h4 className="tt tt2 bc3h" onClick={() => navigator("/project/"+id+"/edit/general")}>General</h4>
                        <h4 className="tt tt2 bc3h" onClick={() => navigator("/project/"+id+"/edit/tags")}>Tags</h4>
                        <h4 className="tt tt2 bc3h" onClick={() => navigator("/project/"+id+"/edit/files")}>Files</h4>
                    </div>

                    <div className="selection horizontal bc2 tc1" style={{marginLeft: "15px"}}>
                        <h4 className="tt tt2 bc3h" onClick={addFile}>New File</h4>
                    </div>
                    
                    <div className="selection horizontal bc2 tc1" style={{marginLeft: "15px"}}>
                        <h4 className="tt tt2 bc3h" onClick={saveFiles}>Save Changes</h4>
                    </div>
                </div>
                {files.map((f, index)=>(
                    <FileSmall key={index} fileid={f.id} title={f.title} versions={f.versions} platforms={f.platforms} downloads={f.downloads} />
                ))}
                
            </div>
        </>
    )

}