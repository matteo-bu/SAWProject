import { useNavigate, useParams } from "react-router";
import { Top } from "./top";
import "./projecteditgeneral.css";
import { useEffect, useState } from "react";
import { getProjectInfo } from "../functions/project";
import { ModPluginDPCategories } from "../lists/common";
import { ResourcepackCategories, ResourcepackFeatures, ResourcepackResolutions } from "../lists/resourcepacks";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase/config";

export function ProjectEditTags(){

    const { id } = useParams();
    const [tags, setTags] = useState<String[]>([]);
    const navigator = useNavigate();

    async function getInfo(){

        if (!id) return;
        const info = await getProjectInfo(id);
        if (!info) return;
    
        const { Tags } = info;
        setTags(Tags);

    }

    useEffect(() => {
        if (!id) return;
        getInfo();
    }, [id]);

    function addRemoveTag(tag: String){
        if (tags?.includes(tag)) setTags(tags.filter(old => old !== tag))
        else setTags(v => [...v, tag])
    }

    async function saveTags(){
        if (!id) return;

        try {
            await setDoc(doc(db, "projects", id), {
            tags: tags
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
                        <h3 className="tc1 pmt10">Mod Categories</h3>
                        {ModPluginDPCategories.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveTag(item)}>{item}</p>
                        ))}
                    </div>

                    <div className="vertical">
                        <h3 className="tc1 pmt10">Resourcepack Categories</h3>
                        {ResourcepackCategories.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveTag(item)}>{item}</p>
                        ))}
                    </div>

                    <div className="vertical">
                        <h3 className="tc1 pmt10">Resourcepack Features</h3>
                        {ResourcepackFeatures.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveTag(item)}>{item}</p>
                        ))}
                    </div>

                    <div className="vertical">
                        <h3 className="tc1 pmt10">Resourcepack Resolution</h3>
                        {ResourcepackResolutions.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveTag(item)}>{item}</p>
                        ))}
                    </div>

                </div>
                
                
            </div>
        </>
    )

}