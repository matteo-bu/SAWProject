export function FileColumn({title, items, fun}:{title: string, items: string[], fun:(x: string)=>void}){
    return(
        <>
            <div className="vertical">
                <h3 className="tc1 pmt10">{title}</h3>
                {items.map((item, i) => (
                    <p key={i} className="tt bc2 bc3h pmt10" onClick={() => fun(item)}>{item}</p>
                ))}
            </div>
        </>
    )
}