import { useNavigate, useParams } from "react-router";
import { Top } from "./top";
import { useEffect, useState } from "react";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase/config";
import { getServerInfo } from "../functions/server";
import { ServerCommunities, ServerFeatures, ServerGameplays, ServerLanguages, ServerMetas, ServerRegions, ServerTypes } from "../lists/servers";
import { Versions } from "../lists/common";

export function ServerEditTags(){

    const { id } = useParams();
    const [tags, setTags] = useState<String[]>([]);
    const [versions, setVersions] = useState<String[]>([]);
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

    function addRemoveTag(tag: String){
        if (tags?.includes(tag)) setTags(tags.filter(old => old !== tag))
        else setTags(v => [...v, tag])
    }

    function addRemoveVersion(v: String){
        if (versions?.includes(v)) setVersions(versions.filter(old => old !== v))
        else setVersions(old => [...old, v])
    }

    async function saveTags(){
        if (!id) return;

        try {
            await setDoc(doc(db, "servers", id), {
            tags: tags
            },
            { merge: true });
            
        } catch (err) {
            console.log(err);
        }
    }

    async function saveVersions(){
        if (!id) return;

        try {
            await setDoc(doc(db, "servers", id), {
            versions: versions
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
                        <h4 className="tt tt2 bc3h" onClick={() => navigator("/server/"+id+"/edit/general")}>General</h4>
                        <h4 className="tt tt2 bc3h" onClick={() => navigator("/server/"+id+"/edit/tags")}>Tags And Versions</h4>
                    </div>

                    <div className="selection horizontal bc2 tc1" style={{marginLeft: "15px"}}>
                        <h4 className="tt tt2 bc3h" onClick={saveTags}>Save Selected Tags</h4>
                    </div>
                </div>

                <div className="horizontal begin">
                    <div className="vertical">
                        <h3 className="tc1 pmt10">Selected Tags List</h3>
                        {tags? tags.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveTag(item)}>{item}</p>
                        )): null}
                    </div>

                    <div className="vertical">
                        <h3 className="tc1 pmt10">Types</h3>
                        {ServerTypes.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveTag(item)}>{item}</p>
                        ))}
                    </div>

                    <div className="vertical">
                        <h3 className="tc1 pmt10">Features</h3>
                        {ServerFeatures.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveTag(item)}>{item}</p>
                        ))}
                    </div>

                    <div className="vertical">
                        <h3 className="tc1 pmt10">Gameplay</h3>
                        {ServerGameplays.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveTag(item)}>{item}</p>
                        ))}
                    </div>

                    <div className="vertical">
                        <h3 className="tc1 pmt10">Meta</h3>
                        {ServerMetas.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveTag(item)}>{item}</p>
                        ))}
                    </div>

                    <div className="vertical">
                        <h3 className="tc1 pmt10">Community</h3>
                        {ServerCommunities.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveTag(item)}>{item}</p>
                        ))}
                    </div>

                    <div className="vertical">
                        <h3 className="tc1 pmt10">Region</h3>
                        {ServerRegions.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveTag(item)}>{item}</p>
                        ))}
                    </div>

                    <div className="vertical">
                        <h3 className="tc1 pmt10">Language</h3>
                        {ServerLanguages.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveTag(item)}>{item}</p>
                        ))}
                    </div>

                </div>

                <div className="horizontal begin pmt10" style={{marginRight: "10px"}}>
                    <div className="vertical">
                        <h3 className="tc1 pmt10">Selected Versions</h3>
                        {versions? versions.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveVersion(item)}>{item}</p>
                        )): null}
                    </div>

                    <div className="vertical">
                        <h3 className="tc1 pmt10">Pack</h3>
                        {Versions.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveVersion(item)}>{item}</p>
                        ))}
                    </div>

                    <h3 className="tt tc1 bc2 bc3h pml10" style={{height: "fit-content"}} onClick={saveVersions}>Save Versions</h3>

                </div>
                
                
            </div>
        </>
    )

}