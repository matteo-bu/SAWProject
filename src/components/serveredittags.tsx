import { useNavigate, useParams } from "react-router";
import { Top } from "./top";
import { useEffect, useState } from "react";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase/config";
import { getServerInfo } from "../functions/server";
import { ServerCommunities, ServerFeatures, ServerGameplays, ServerLanguages, ServerMetas, ServerRegions, ServerTypes } from "../lists/servers";
import { Versions } from "../lists/common";
import { FileColumn } from "./filecolumn";
import { UserError } from "./usererror";
import { checkUser } from "../functions/checkuser";
import { UserLoading } from "./userloading";

export function ServerEditTags(){

    const { id } = useParams();
    const x = checkUser("server",id || "");
    const [tags, setTags] = useState<string[]>([]);
    const [versions, setVersions] = useState<string[]>([]);
    const navigator = useNavigate();

    async function getInfo(){

        if (!id) return;
        const info = await getServerInfo(id);
        if (!info) return;
    
        const { Tags, Versions } = info;
        setTags(Tags);
        setVersions(Versions);

    }

    useEffect(() => {
        if (!id) return;
        getInfo();
    }, [id]);

    function addRemoveTag(tag: string){
        if (tags?.includes(tag)) setTags(tags.filter(old => old !== tag))
        else setTags(v => [...v, tag])
    }

    function addRemoveVersion(v: string){
        if (versions?.includes(v)) setVersions(versions.filter(old => old !== v))
        else setVersions(old => [...old, v])
    }

    async function save(field: string, items: string[]){
        if (!id) return;

        try {
            await setDoc(doc(db, "servers", id), {
            [field]: items
            },
            { merge: true });
            
        } catch (err) {
            console.log(err);
        }
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

                    <div className="selection horizontal bc2 tc1" style={{marginLeft: "15px"}}>
                        <h4 className="tt tt2 bc3h" onClick={()=>save("tags",tags)}>Save Selected Tags</h4>
                    </div>
                </div>

                <div className="horizontal begin">
                    
                    <FileColumn title={"Selected Tags List"} items={tags} fun={addRemoveTag}/>
                    <FileColumn title={"Types"} items={ServerTypes} fun={addRemoveTag}/>
                    <FileColumn title={"Features"} items={ServerFeatures} fun={addRemoveTag}/>
                    <FileColumn title={"Gameplay"} items={ServerGameplays} fun={addRemoveTag}/>
                    <FileColumn title={"Meta"} items={ServerMetas} fun={addRemoveTag}/>
                    <FileColumn title={"Community"} items={ServerCommunities} fun={addRemoveTag}/>
                    <FileColumn title={"Region"} items={ServerRegions} fun={addRemoveTag}/>
                    <FileColumn title={"Language"} items={ServerLanguages} fun={addRemoveTag}/>

                </div>

                <div className="horizontal begin pmt10" style={{marginRight: "10px"}}>

                    <FileColumn title={"Selected Versions"} items={versions} fun={addRemoveVersion}/>
                    <FileColumn title={"Versions"} items={Versions} fun={addRemoveVersion}/>

                    <h3 className="tt tc1 bc2 bc3h pml10" style={{height: "fit-content"}} onClick={()=>save("versions",versions)}>Save Versions</h3>

                </div>
                
                
            </div>
        </> : <UserError/>
    )

}