import { Top } from "./top";

export function UserError(){

    return(
        <>
            <div className="container">
                <Top/>
                <div className="tc1" style={{textAlign: "center"}}>
                    <h1>Permission Denied</h1>
                </div>
            </div>
        </>
    )

}