import { useParams } from "react-router";
import { Top } from "./top";
import "./projecteditgeneral.css";
import { useEffect, useRef, useState } from "react";
import { getProjectInfo } from "../functions/project";
import { ShadersLoaders } from "../lists/shaders";
import { PluginLoaders } from "../lists/plugins";
import { ModLoaders } from "../lists/mods";
import { PackLoaders, Versions } from "../lists/common";

export function FileEdit(){

    const { id, fileid } = useParams();

    const [loaders, setLoaders] = useState<String[]>([]);
    const [versions, setVersions] = useState<String[]>([]);

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
        setLoaders(f!.platforms);
        setVersions(f!.versions);
        title.current!.value = f!.title;
        changelog.current!.value = f!.changelog;
        link.current!.value = f!.link;

    }

    function addRemoveLoader(loader: String){
        if (loaders?.includes(loader)) setLoaders(loaders.filter(old => old !== loader))
        else setLoaders(v => [...v, loader])
    }

    function addRemoveVersion(ver: String){
        if (versions?.includes(ver)) setVersions(versions.filter(old => old !== ver))
        else setVersions(v => [...v, ver])
    }

    useEffect(() => {
        if (!id) return;
        getInfo();
    }, [id,fileid]);

    return (
        <>
            <div className="container">
                <Top/>
                
                <div style={{marginTop: "30px"}}>
                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Title</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10">Save New Title</h3>
                    </div>
                    <textarea ref={title} className="bc3 tc1 projecteditarea" placeholder="Write New Title"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Changelog</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10">Save New Changelog</h3>
                    </div>
                    <textarea ref={changelog} className="bc3 tc1 projecteditarea" placeholder="Write New Changelog"/>

                    <div className="horizontal">
                        <h3 className="tc1 pmt10" >Download Link</h3>
                        <h3 className="tt tc1 bc2 bc3h pml10">Save New Download Link</h3>
                    </div>
                    <textarea ref={link} className="bc3 tc1 projecteditarea" placeholder="Write New Download Link"/>
                </div>

                <div className="horizontal begin" style={{marginRight: "10px"}}>
                    <div className="vertical">
                        <h3 className="tc1 pmt10">Selected Platforms List</h3>
                        {loaders? loaders.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveLoader(item)}>{item}</p>
                        )): null}
                    </div>

                    <div className="vertical">
                        <h3 className="tc1 pmt10">Pack</h3>
                        {PackLoaders.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveLoader(item)}>{item}</p>
                        ))}
                    </div>

                    <div className="vertical">
                        <h3 className="tc1 pmt10">Mod</h3>
                        {ModLoaders.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveLoader(item)}>{item}</p>
                        ))}
                    </div>

                    <div className="vertical">
                        <h3 className="tc1 pmt10">Plugin</h3>
                        {PluginLoaders.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveLoader(item)}>{item}</p>
                        ))}
                    </div>

                    <div className="vertical">
                        <h3 className="tc1 pmt10">Shaders</h3>
                        {ShadersLoaders.map((item) => (
                            <p className="tt bc2 bc3h pmt10" onClick={() => addRemoveLoader(item)}>{item}</p>
                        ))}
                    </div>

                    <h3 className="tt tc1 bc2 bc3h pml10" style={{height: "fit-content"}}>Save Platforms</h3>

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

                    <h3 className="tt tc1 bc2 bc3h pml10" style={{height: "fit-content"}}>Save Versions</h3>

                </div>

            </div>
        </>
    )

}