import { useState } from "react";
import '../App.css';
import './discover.css';
import { useNavigate } from "react-router";

export function Discover(){

    const [open, setOpen] = useState(false);
    const navigator = useNavigate();

    return (
        <div className="menu-wrapper">
                <h3 className="tt bc2 bc3h" onClick={() => setOpen(!open)}>Discover Content</h3>

            <div className={`bc2 dropdown ${open ? "open" : ""}`}>
                <p className="bc3h" onClick={() => navigator("/discover/mods")}>Mods</p>
                <p className="bc3h" onClick={() => navigator("/discover/resourcepacks")}>Resource Packs</p>
                <p className="bc3h" onClick={() => navigator("/discover/datapacks")}>Data Packs</p>
                <p className="bc3h" onClick={() => navigator("/discover/shaders")}>Shaders</p>
                <p className="bc3h" onClick={() => navigator("/discover/plugins")}>Plugins</p>
                <p className="bc3h" onClick={() => navigator("/discover/servers")}>Servers</p>
            </div>
        </div>
    );
}