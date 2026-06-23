import { useNavigate } from "react-router";
import "./projectsmall.css";

export function FileSmall({projectid, fileid, title, versions, platforms, downloads}:{projectid: string, fileid: string, title: string, versions: string[], platforms: string[], downloads: number}){

    const navigator = useNavigate();

    return (
        <>
            <div className="horizontal">
                    <h3 className="tc2" style={{overflowWrap: "anywhere", width:"25%"}}>{title}</h3>
                    <div className="horizontal" style={{width:"25%", flexWrap: "wrap", height: "fit-content"}}>{versions.map((v, index)=>(
                        <h4 key={index} className="tc2 bc3" style={{marginLeft: "10px", width: "fit-content", height:"fit-content", cursor: "auto", marginBottom: "10px"}}>{v}</h4>
                    ))}</div>
                    <div className="horizontal" style={{width:"25%", flexWrap: "wrap", height: "fit-content"}}>{platforms.map((v, index)=>(
                        <h4 key={index} className="tc2 bc3" style={{marginLeft: "10px", width: "fit-content", height:"fit-content", cursor: "auto", marginBottom: "10px"}}>{v}</h4>
                    ))}</div>
                    <h3 className="tc2" style={{width:"20%", textAlign: "center"}}>{downloads}</h3>
                    <h4 className="tc2 bc3" style={{width:"fit-content", height: "fit-content"}} onClick={() => window.open("/project/" + projectid + "/" + fileid)}>+</h4>
                    
            </div>
            <hr className="hr20"/>
        </>
    );
}