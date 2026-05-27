import { useNavigate } from "react-router";

export function Selection(){

    const navigator = useNavigate();

    return (
        <>
            <div className="selection horizontal bc2 tc1">
                            <h4 className="tt tt2 bc3h" onClick={() => navigator("/discover/mods")}>Mods</h4>
                            <h4 className="tt tt2 bc3h" onClick={() => navigator("/discover/resourcepacks")}>Resource Packs</h4>
                            <h4 className="tt tt2 bc3h" onClick={() => navigator("/discover/datapacks")}>Data Packs</h4>
                            <h4 className="tt tt2 bc3h" onClick={() => navigator("/discover/shaders")}>Shaders</h4>
                            <h4 className="tt tt2 bc3h" onClick={() => navigator("/discover/plugins")}>Plugins</h4>
                            <h4 className="tt tt2 bc3h" onClick={() => navigator("/discover/servers")}>Servers</h4>    
                        </div>
        </>
    );
}