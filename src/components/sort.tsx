import { useContext, useState } from "react";
import './sort.css';
import { SortByContext } from "../functions/filtering";

export function Sort(){

    const [open, setOpen] = useState(false);

    const sortC = useContext(SortByContext);
    if (!sortC) return;
    const { sortBy, setSortBy } = sortC;
    
    return (
        <div className="menu-wrapper-sort">
            <div className="tt bc2 bc3h sort tc2 begin" onClick={() => setOpen(!open)}>
                <h3>Sort By: {sortBy}</h3>
                <h3>{open ? '-' : '+'}</h3>
            </div>

            <div className={`bc2 dropdown ${open ? "open" : ""}`}>
                <p className="bc3h" onClick={() => { setSortBy("Author"); setOpen(false); }}>Author</p>
                <p className="bc3h" onClick={() => { setSortBy("Downloads"); setOpen(false); }}>Downloads</p>
                <p className="bc3h" onClick={() => { setSortBy("Name"); setOpen(false); }}>Name</p>
            </div>
        </div>
    );
}