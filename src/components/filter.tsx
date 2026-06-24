import { useState } from "react";
import './filter.css';
import { filtering } from "../functions/filtering";

export function Filter({ type, name, bar, list }: { type: string, name: string, bar?: boolean, list: string[] }) { //<>
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState('');

    const { handleClick } = filtering();

    return (
        <div className="bc2 box">
            <div className="tc1 begin" onClick={() => setOpen(!open)}>
                <h4>{name}</h4>
                <h4>{open ? '-' : '+'}</h4>
            </div>

            {open?(<>
            
            {bar ? <input type="text" className="bc3 tc1 input" placeholder="Search..." value={filter} onChange={(e) => setFilter(e.target.value)} />
            : <p></p>}
            
            <div className="">
                {filter === '' ? list.map((version) => {
                        return <h4 className="bc3h tc2" key={version} onClick={()=>handleClick(type, version)}>{version}</h4>
                    }) : list.filter((version) => version.toLowerCase().includes(filter.toLowerCase())).map((version) => {
                        return <h4 className="bc3h tc2" key={version} onClick={()=>handleClick(type, version)}>{version}</h4>
                    })
                
                }
            </div>
            </>):null}
            
        </div>
    );
}