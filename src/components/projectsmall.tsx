import { useNavigate } from "react-router";
import "./projectsmall.css";

export function ProjectSmall({type, projectid, name, author, downloads, summary, platforms}:{type: string, projectid: string, name: string, author?: string, downloads?: number, summary: string, platforms: string[]}){

    const navigator = useNavigate();
    if (type != "project" && type != "server") type = "project";

    return (
        <>
            <div className="bc2 bc3h pjsmall" onClick={() => navigator("/" + type + "/" + projectid)}>
                <div className="begin">
                    <div className="horizontal">
                        <h4 className="tc1">{name}</h4>
                        {author && <h4 className="tc2" style={{ marginLeft: "-10px" }}>by {author}</h4>}
                    </div>
                    {downloads && <h4 className="tc2">Downloads: {downloads}</h4>}
                </div>
                <h4 className="tc2 pjsmalldesc">{summary}</h4>
                <div className="horizontal" style={{ marginLeft: "8px" }}>
                    {platforms.map((platform) => (
                        <h4 className="tc2 bc3 pjsmalltags" style={{ marginRight: "10px" }}>{platform}</h4>
                    ))}
                </div>
            </div>
        </>
    );
}