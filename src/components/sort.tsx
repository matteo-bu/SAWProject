import { useState } from "react";
import './sort.css';

export function Sort(){

    const [open, setOpen] = useState(false);
    const [word, setword] = useState("Name");

    return (
        <div className="menu-wrapper-sort">
            <div className="tt bc2 bc3h sort tc2 begin" onClick={() => setOpen(!open)}>
                <h3>Sort By: {word}</h3>
                <h4>{open ? '-' : '+'}</h4>
            </div>

            <div className={`bc2 dropdown ${open ? "open" : ""}`}>
                <p className="bc3h" onClick={() => { setword("Name"); setOpen(false); }}>Name</p>
                <p className="bc3h" onClick={() => { setword("Date Published"); setOpen(false); }}>Date Published</p>
                <p className="bc3h" onClick={() => { setword("Date Updated"); setOpen(false); }}>Date Updated</p>
            </div>
        </div>
    );
}