import { useState } from "react";
import '../App.css';
import './discover.css';

export function Discover(){

    const [open, setOpen] = useState(false);

    return (
        <div className="menu-wrapper">
                <h3 className="tt bc2 bc3h" onClick={() => setOpen(!open)}>Discover Content</h3>

            <div className={`bc2 dropdown ${open ? "open" : ""}`}>
                <p className="bc3h">Mods</p>
                <p className="bc3h">Resource Packs</p>
                <p className="bc3h">Data Packs</p>
                <p className="bc3h">Shaders</p>
                <p className="bc3h">Plugins</p>
                <p className="bc3h">Servers</p>
            </div>
        </div>
    );
}